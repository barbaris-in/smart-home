import Extension from "../../core/abstract-extension";
import * as dgram from "dgram";
import {Device} from "../../core/abscract-device";
import {OnOffTrait} from "../../core/traits/OnOff";
import deviceManager from "../../core/device-manager";

const logger = require('../../core/logger').logger('yeelight-device-locator');
import * as net from 'net';


class YeelightDeviceLocator extends Extension {
    getName(): string {
        return "yeelight-device-locator";
    }

    loadDevices() {
        super.loadDevices();
        const data = deviceManager.loadDevices('yeelight');
        for (const deviceId in data) {
            const device: Device = YeelightDeviceLocator.deviceFromInfo(data[deviceId].info);
            deviceManager.addDevice(device, 'yeelight');
        }
    }

    protected static deviceFromInfo(info: string): Device {
        const {id, name, ip, port, model} = YeelightDeviceLocator.parseNotifyMessage(info);

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

                        client.connect(port, ip, () => {
                            const commandString = JSON.stringify({"id": 1, "method": "set_power", "params": [state ? "on" : "off", "smooth", 500]}) + '\r\n';
                            const timeout = setTimeout(() => {
                                client.end();
                                reject('Timeout');
                            }, 1000);
                            client.write(commandString, (err) => {
                                if (err) {
                                    logger.error('Error sending command', {commandString, err});
                                    clearTimeout(timeout);
                                    reject(err);
                                }
                                console.log('Command sent', {commandString, err});
                            });
                            client.on('data', (data) => {
                                clearTimeout(timeout);
                                const dataString = data.toString();
                                const dataJson = JSON.parse(dataString);
                                logger.debug('Received response from yeelight device:', {data: dataJson});
                                if (dataJson.error) {
                                    logger.error('Error received from server', {dataJson});
                                    reject(dataJson.error);
                                }
                                if (dataJson.result[0] === 'ok') {
                                    resolve();
                                } else {
                                    logger.error('Response from device is not ok', {dataJson});
                                    reject(dataJson.result);
                                }
                                resolve();
                                client.end();
                            });
                        });
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
        const server = dgram.createSocket({type: 'udp4', reuseAddr: true});

        // Set up an event listener for incoming messages
        server.on('message', (msg, rinfo) => {
            // logger.debug('Received multicast message', {rinfo, msg: msg.toString()});
            const notifyMessage: string = msg.toString();
            const messageType = YeelightDeviceLocator.parseMessageType(notifyMessage);
            switch (messageType) {
                case 'NOTIFY':
                    logger.debug('Advertising', {rinfo, msg: notifyMessage});
                    const deviceId = YeelightDeviceLocator.parseNotifyMessage(notifyMessage).id;
                    if (!deviceManager.hasDevice(deviceId)) {
                        deviceManager.addDevice(YeelightDeviceLocator.deviceFromInfo(notifyMessage), 'yeelight')
                        deviceManager.saveDevices('yeelight');
                    }
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
        process.on('SIGINT', () => {
            logger.debug('Closing multicast server', {ip: multicastAddress, port: multicastPort});
            server.close((): void => {
                logger.debug('Closed multicast server', {ip: multicastAddress, port: multicastPort});
            });
        });
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

export default new YeelightDeviceLocator();
