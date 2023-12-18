import Extension from "../../core/abstract-extension";
import * as mqtt from "mqtt";
import {MqttClient} from "mqtt";
import deviceManager from "../../core/device-manager";
import {Device} from "../../core/device";
import {MqttTraitsDecider} from "./mqtt-traits-decider";

const logger = require("../../core/logger").logger('mqtt');
const mqttHost: string | undefined = process.env.MQTT_HOST;
const mqttPort: string = process.env.MQTT_PORT || '1883';

export class MqttExtension extends Extension {
    protected client: MqttClient | null = null;

    constructor() {
        super();
    }

    getName(): string {
        return 'mqtt';
    }

    public static deviceFromInfo(info: any): Device {
        const device: Device = new Device(info.ieee_address, info.friendly_name, MqttTraitsDecider.getTraitsFor(info));
        device.setInfo(info);
        return device;
    }

    static loadingCallback: (datum: any) => void = (datum: any) => {
        const device = MqttExtension.deviceFromInfo(datum.info);
        for (const property in datum.properties) {
            device.setProperty(property, datum.properties[property]);
        }
        for (const trait in device.traits) {
            device.traits[trait].initialize();
        }
        deviceManager.addDevice(device, 'mqtt');
    }

    public getMqttClient(): MqttClient {
        if (null === this.client) {
            throw new Error('MQTT client is not available for some reason');
        }
        return this.client;
    }

    public loadDevices() {
        super.loadDevices();
        deviceManager.loadDevices(this.getName(), MqttExtension.loadingCallback);
    }

    updateDevices(mqttDevices: { ieee_address: string, friendly_name: string }[]): void {
        for (const mqttDevice of mqttDevices) {
            logger.debug('Registering device', mqttDevice);
            deviceManager.addDevice(MqttExtension.deviceFromInfo(mqttDevice), 'mqtt');
        }
        deviceManager.saveDevices('mqtt');
    }

    init(): void {
        const brokerAddress: string = `mqtt://${mqttHost}:${mqttPort}`;
        logger.debug('Connecting to MQTT', {brokerAddress});
        this.client = mqtt.connect(brokerAddress);

        // Subscribe to all messages by using the '#' wildcard
        this.client.subscribe('zigbee2mqtt/#', (err) => {
            if (err) {
                logger.error('Error subscribing to all topics', err);
            } else {
                logger.debug('Subscribed to all topics');
            }
        });

        // Handle incoming messages
        this.client.on('message', (topic, message) => {
            let eventParams;
            try {
                eventParams = JSON.parse(message.toString());
            } catch (e) {
                eventParams = message.toString();
            }
            logger.debug(topic, eventParams);
            const topics: string[] = topic.split('/');
            switch (topics[1]) {
                case 'bridge':
                    switch (topics[2]) {
                        case 'devices':
                            this.updateDevices(eventParams);
                            break;
                    }
                    break;
                default:
                    const device: Device | null = deviceManager.getDeviceByName(topics[1]);
                    if (device) {
                        if (eventParams.action) {
                            device.emit(eventParams.action, eventParams)
                        } else {
                            for (const eventParam in eventParams) {
                                device.setProperty(eventParam, eventParams[eventParam]);
                            }
                        }
                        // device.emit(eventParams.action ?? 'status_changed', eventParams);
                    }
                    break;
            }
        });

        // Handle errors
        this.client.on('error', (err) => {
            logger.error('MQTT client error', err);
        });

        // Handle disconnect
        this.client.on('close', () => {
            logger.debug('Disconnected from MQTT broker');
        });

        // Handle reconnect
        this.client.on('reconnect', () => {
            logger.debug('Reconnecting to MQTT broker');
        });

        // Gracefully close the MQTT connection on process exit
        process.on('SIGINT', () => {
            if (this.client !== null) {
                logger.debug('Closing MQTT connection');
                this.client.end(() => logger.debug('Closed MQTT connection'));
            }
        });
    }
}

export default new MqttExtension();
