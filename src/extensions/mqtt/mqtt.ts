import Extension from "../../core/abstract-extension";
import * as mqtt from "mqtt";
import {MqttClient} from "mqtt";
import deviceManager from "../../core/device-manager";
import {Device} from "../../core/device";
import Trait from "../../core/trait";
import {OnOffTrait} from "../../core/traits/OnOff";
import {Properties} from "../../core/properties";
import {BrightnessTrait} from "../../core/traits/Brightness";
import {ColorTemperatureTrait} from "../../core/traits/ColorTemperature";

const logger = require("../../core/logger").logger('mqtt');
const mqttHost: string | undefined = process.env.MQTT_HOST;
const mqttPort: string = process.env.MQTT_PORT || '1883';

class MqttExtension extends Extension {
    protected client: MqttClient | null = null;

    public getTraitsFor(info: any): { [key: string]: Trait } {
        const traits: { [key: string]: Trait } = {};
        if (info.definition && info.definition.exposes && info.definition.exposes) {
            for (const expose of info.definition.exposes) {
                switch (true) {
                    case (expose.type && expose.features && true):
                        for (const feature of expose.features) {
                            if (feature.property === 'state') {
                                traits['OnOff'] = new OnOffTrait((state: boolean): Promise<void> => {
                                    return new Promise((resolve, reject) => {
                                        this.sendCommand(info.friendly_name, {state: state ? feature.value_on : feature.value_off});
                                        // todo: check if command was successful
                                        resolve();
                                    });
                                }, (properties: Properties): Promise<boolean> => {
                                    return new Promise((resolve, reject): void => {
                                        resolve(properties.get('state') === 'ON');
                                    });
                                });
                            }
                            if (feature.property === 'brightness') {
                                traits['Brightness'] = new BrightnessTrait(
                                    feature.value_min, feature.value_max,
                                    (brightness: number): void => {
                                        this.sendCommand(info.friendly_name, {brightness: brightness});
                                    }, (properties: Properties): Promise<number> => {
                                        return new Promise((resolve, reject): void => {
                                            if (!properties.has('brightness')) {
                                                logger.error('Brightness is not set', {properties});
                                                // reject(new Error('Brightness is not set'));
                                                resolve(Math.round((feature.value_max + feature.value_min) / 2));
                                            }
                                            resolve(<number>properties.get('brightness'));
                                        });
                                    });
                            }
                            if (feature.property === 'color_temp') {
                                traits['ColorTemperature'] = new ColorTemperatureTrait(
                                    feature.value_min, feature.value_max,
                                    (colorTemperature: number): void => {
                                        this.sendCommand(info.friendly_name, {color_temp: colorTemperature});
                                    },
                                    (properties: Properties): Promise<number> => {
                                        return new Promise((resolve, reject): void => {
                                            if (!properties.has('color_temp')) {
                                                logger.error('Color temperature is not set', {properties});
                                                // reject(new Error('Color temperature is not set'));
                                                resolve(Math.round((feature.value_max + feature.value_min) / 2));
                                            }
                                            resolve(<number>properties.get('color_temp'));
                                        });
                                    });
                            }
                        }
                        break;
                    case expose.property && true:
                        // if (expose.property === 'temperature') {
                        //     traits['TemperatureSensor'] = new TemperatureSensorTrait();
                        // }
                        // if (expose.property === 'humidity') {
                        //     traits['HumiditySensor'] = new TemperatureSensorTrait();
                        // }
                        // properties[expose.property] = new Property(expose.property, expose.type);
                        // todo: register property
                        // if (result['Action']) {
                        //     logger.error('Action already set for device', info);
                        //     throw new Error('Action already set for device');
                        // }
                        // result['Action'] = new ActionTrait(expose.values);
                        break;
                }
            }
        }
        return traits;
    }

    public deviceFromInfo(info: any): Device {
        const device: Device = new Device(info.ieee_address, info.friendly_name, this.getTraitsFor(info));
        device.setInfo(info);
        return device;
    }

    protected sendCommand(deviceName: string, command: {}): void {
        const commandString = JSON.stringify(command);
        this.getMqttClient().publish(`zigbee2mqtt/${deviceName}/set`, commandString);
    }

    // static loadingCallback: (datum: any) => void = (datum: any) => {
    //     const device = MqttExtension.deviceFromInfo(datum.info);
    //     for (const property in datum.properties) {
    //         device.setProperty(property, datum.properties[property]);
    //     }
    //     for (const trait in device.traits) {
    //         device.traits[trait].initialize();
    //     }
    //     deviceManager.addDevice(device, 'mqtt');
    // }
    //
    public getMqttClient(): MqttClient {
        if (null === this.client) {
            throw new Error('MQTT client is not available for some reason');
        }
        return this.client;
    }

    // public loadDevices() {
    //     super.loadDevices();
    //     deviceManager.loadDevices(this.getName(), MqttExtension.loadingCallback);
    // }
    //
    updateDevices(mqttDevices: { ieee_address: string, friendly_name: string }[]): void {
        for (const mqttDevice of mqttDevices) {
            logger.debug('Registering device', mqttDevice);
            deviceManager.registerDevice(this.deviceFromInfo(mqttDevice), 'mqtt');
        }
        deviceManager.saveDevices('mqtt');
    }

    constructor() {
        super('mqtt');
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
                case 'response':
                    switch (topics[2]) {
                        case 'device':
                            switch (topics[3]) {
                                case 'rename':
                                    // {
                                    //   "data": {
                                    //     "from": "Tree Plug",
                                    //     "homeassistant_rename": false,
                                    //     "to": "Shelf Light"
                                    //   },
                                    //   "status": "ok",
                                    //   "transaction": "a1qf8-1"
                                    // }
                                    logger.debug('Renaming device', eventParams);
                                    try {
                                        const device: Device = deviceManager.getDeviceByName(eventParams.data.from);
                                        device.setName(eventParams.data.to);
                                    } catch (e) {
                                        logger.error('Could not rename device. Device not found', {params: eventParams.data.from, err: e});
                                    }
                                    break;
                            }
                            break;
                    }
                    break;
                default:
                    const deviceName: string = topics[1];
                    try {
                        const device: Device = deviceManager.getDeviceByName(deviceName);
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
                    } catch (e) {
                        logger.error('Could not find device', {name: deviceName});
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
    }

    //
    // public unload(): void {
    //     if (this.client !== null) {
    //         logger.debug('Closing MQTT connection');
    //         this.client.end(true, () => logger.debug('MQTT connection closed'));
    //     }
    // }
}

export default new MqttExtension();
