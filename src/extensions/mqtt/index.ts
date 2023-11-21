import Extension from "../../core/abstract-extension";
import * as mqtt from "mqtt";
import {MqttClient} from "mqtt";
import deviceManager from "../../core/device-manager";
import Device from "../../core/abscract-device";
import {DeviceClassRegistry} from "../../core/device-class-registry";
import GenericDevice from "../../devices/generic-device";

const logger = require("../../core/logger").logger('mqtt');
const mqttHost: string | undefined = process.env.MQTT_HOST;
const mqttPort: string = process.env.MQTT_PORT || '1883';

class MqttDevice extends GenericDevice {
    public readonly type: string = 'mqtt-device';
}

class MqttExtension extends Extension {
    public client: MqttClient | null = null;

    constructor() {
        super();
    }

    getName(): string {
        return 'mqtt';
    }

    registerDeviceClasses(deviceClassRegistry: DeviceClassRegistry) {
        super.registerDeviceClasses(deviceClassRegistry);
        deviceClassRegistry.register('mqtt-device', MqttDevice);
    }

    init(): void {
        const device = new MqttDevice('mqtt', 'MQTT');
        deviceManager.addDevice(device, 'mqtt');
        const brokerAddress: string = `mqtt://${mqttHost}:${mqttPort}`;
        logger.debug('Connecting to MQTT', {brokerAddress});
        this.client = mqtt.connect(brokerAddress);
        const mqttDevice = deviceManager.getDeviceByName('MQTT');
        if (!(mqttDevice instanceof MqttDevice)) {
            logger.error('Could not find mqtt');
            return;
        }

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
                            mqttDevice.emit(topic, eventParams);
                            break;
                    }
                    break;
                default:
                    const device: Device | null = deviceManager.getDeviceByName(topics[1]);
                    if (device) {
                        device.emit(eventParams.action ?? 'status_changed', eventParams);
                    }
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
