import Extension from "../../core/abstract-extension";
import * as dgram from "dgram";
import {Device} from "../../core/device";
import {OnOffTrait} from "../../core/traits/OnOff";
import deviceManager from "../../core/device-manager";

const logger = require('../../core/logger').logger('yeelight');
import * as net from 'net';
import {Socket} from "dgram";


export class Yeelight extends Extension {
    private server: Socket | null = null;

    getName(): string {
        return "yeelight";
    }

    public static loadingCallback: (datum: any) => void = (datum: any): void => {
        const device: Device = Yeelight.deviceFromInfo(datum.info);
        deviceManager.addDevice(device, 'yeelight');
    }

    loadDevices() {
        super.loadDevices();
        deviceManager.loadDevices('yeelight', Yeelight.loadingCallback);
    }

    protected static deviceFromInfo(info: string): Device {
        const {id, name, ip, port, model} = Yeelight.parseNotifyMessage(info);

        // todo: add Brightness support
        // todo: add Color support
        // todo: initialize status, brightness, color on startup
        const device = new Device(id, name ? name : id, {
            'OnOff': new OnOffTrait((state: boolean): Promise<void> => {
                return new Promise((resolve, reject) => {
                    {
                        const client = new net.Socket();
                        if (!ip || !port) {
                            logger.error('No IP or port', this);
                            reject('No IP or port');
                        }

                        try {
                            client.connect(port, ip, () => {
                                const requestId = Math.round(Math.random() * 1000000);
                                const command = {
                                    "id": requestId,
                                    "method": "set_power",
                                    "params": [
                                        state ? "on" : "off",
                                        "smooth",
                                        500
                                    ]
                                };
                                const commandString = JSON.stringify(command) + '\r\n';
                                const timeout = setTimeout(() => {
                                    client.end();
                                    logger.error('Timeout sending command to yeelight device', command);
                                    reject('Timeout');
                                }, 1000);
                                logger.debug('Sending command to yeelight device', command);
                                try {
                                    client.write(commandString, (err) => {
                                        if (err) {
                                            logger.error('Error sending command', {commandString, err});
                                            clearTimeout(timeout);
                                            reject(err);
                                        }
                                        logger.debug('Command sent', {commandString});
                                    });
                                } catch (e) {
                                    logger.error('Error sending command', {commandString, e});
                                    clearTimeout(timeout);
                                    reject(e);
                                }
                                client.on('data', (data) => {
                                    clearTimeout(timeout);
                                    const dataString = data.toString();
                                    let dataJson;
                                    try {
                                        const dataStrings = dataString.split('\r\n');
                                        for (const dataString of dataStrings) {
                                            if (dataString.length > 0) {
                                                dataJson = JSON.parse(dataString);
                                                if (dataJson.id === requestId) {
                                                    if (dataJson.result[0] === 'ok') {
                                                        resolve();
                                                    } else {
                                                        logger.error('Response from device is not ok', dataJson);
                                                        reject(dataJson);
                                                    }
                                                    break;
                                                }
                                                // logger.debug('Received response from yeelight device:', {data: dataJson});
                                                // if (dataJson.error) {
                                                //     logger.error('Error received from server', {dataJson});
                                                //     reject(dataJson.error);
                                                // }
                                            }
                                        }
                                    } catch (e) {
                                        logger.error('Error parsing JSON', {dataString, e});
                                        reject(e);
                                    }
                                    // if (dataJson.error) {
                                    //     logger.error('Error received from server', {dataJson});
                                    //     reject(dataJson.error);
                                    // }
                                    // if (dataJson.result[0] === 'ok') {
                                    //     resolve();
                                    // } else {
                                    //     logger.error('Response from device is not ok', {dataJson});
                                    //     reject(dataJson.result);
                                    // }
                                    resolve();
                                    client.end();
                                });
                            });
                        } catch (e) {
                            logger.error('Error connecting to device', {ip, port, e});
                            reject(e);
                        }
                    }
                });
            }, (): Promise<boolean> => {
                return new Promise((resolve, reject) => {
                    // todo: implement init callback
                    resolve(false);
                });
            })
        });
        device.setInfo(info);
        return device;
    }

    init(): void {
        // Multicast address and port
        const multicastAddress = '239.255.255.250';
        const multicastPort = 1982;

        // Create a UDP socket for receiving
        this.server = dgram.createSocket({type: 'udp4', reuseAddr: true});
        const server = this.server;
        // Set up an event listener for incoming messages
        server.on('message', (msg, rinfo) => {
            // logger.debug('Received multicast message', {rinfo, msg: msg.toString()});
            const notifyMessage: string = msg.toString();
            const messageType = Yeelight.parseMessageType(notifyMessage);
            switch (messageType) {
                case 'NOTIFY':
                    logger.debug('Advertising', {rinfo, msg: notifyMessage});
                    deviceManager.addDevice(Yeelight.deviceFromInfo(notifyMessage), 'yeelight')
                    deviceManager.saveDevices('yeelight');
                    break;
                case 'M-SEARCH':
                    logger.debug('Someone is searching for yeelight devices', {rinfo, msg: notifyMessage});
                    break;
                default:
                    logger.warn('UDP 1982 discovery: Unknown message type:', {rinfo, messageType, msg: notifyMessage});
            }
        });

        // Bind the server to the multicast port and address
        server.bind(multicastPort, (): void => {
            // Add the server to the multicast group
            server.addMembership(multicastAddress);
            logger.debug(`Server listening for advertisements on ${multicastAddress}:${multicastPort}`);
        });

        // Set up an event listener for errors
        server.on('error', (err) => {
            logger.error('Multicast listener error', err);
        });

        // Set up an event listener for the server close event
        server.on('close', () => {
            logger.debug('Multicast listener closed');
        });

        // Handle SIGINT (Ctrl+C) to close the server gracefully
        // todo: why is this called twice?
    }

    unload(): void {
        logger.debug('Closing multicast server');
        if (this.server) {
            this.server.close((): void => {
                logger.debug('Multicast server closed');
            });
        }
    }

    /**
     * Parse message from Yeelight Wifi Strip. Example:
     * ```
     * NOTIFY * HTTP/1.1
     * Host:
     * Cache-Control: max-age=3600
     * Location: yeelight://192.168.1.41:55443
     * NTS: ssdp:alive
     * Server: POSIX, UPnP/1.0 YGLC/1
     * id: 0x0000000008016701
     * model: stripe
     * fw_ver: 73
     * support: get_prop set_default set_power toggle set_bright start_cf stop_cf set_scene cron_add cron_get cron_del set_ct_abx set_rgb set_hsv set_adjust adjust_bright adjust_ct adjust_color set_music set_name
     * power: off
     * bright: 100
     * color_mode: 1
     * ct: 4000
     * rgb: 16777164
     * hue: 60
     * sat: 20
     * name:
     * ```
     * @param message
     */
    protected static parseNotifyMessage(message: string): any {
        const matchId = message.toString().match(/id: (.+)/);
        const id: string | null = (matchId !== null) ? matchId[1] : null;

        const matchName = message.toString().match(/name: (.+)/);
        const name: string | null = (matchName !== null) ? matchName[1] : null;

        const location = message.toString().match(/Location: yeelight:\/\/(.+):(\d+)/);
        const ip: string | null = (location !== null) ? location[1] : null;
        const port: number | null = (location !== null) ? parseInt(location[2]) : null;

        const modelMatch = message.toString().match(/model: (.+)/);
        const model: string | null = (modelMatch !== null) ? modelMatch[1] : null;

        return {id, name, ip, port, model};
    }

    static parseMessageType(message: string): string {
        return message.split(" ")[0];
    }
}

export default new Yeelight();
