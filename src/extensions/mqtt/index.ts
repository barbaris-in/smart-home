import Extension from "../../core/abstract-extension";
import * as mqtt from "mqtt";
import {MqttClient} from "mqtt";
import {eventsEmitter} from "../../core/events-emitter";
import deviceManager from "../../core/device-manager";
import Device from "../../core/abscract-device";

const logger = require("../../core/logger").logger('mqtt');
const mqttHost: string | undefined = process.env.MQTT_HOST;
const mqttPort: string = process.env.MQTT_PORT || '1883';

class MqttExtension extends Extension {
    public readonly client: MqttClient;

    constructor() {
        super();
        const brokerAddress: string = `mqtt://${mqttHost}:${mqttPort}`;
        logger.debug('Connecting to MQTT', {brokerAddress});
        this.client = mqtt.connect(brokerAddress);
    }

    getName(): string {
        return 'mqtt';
    }

    run(): void {
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
                            //todo: emit device events instead of eventsEmitter
                            eventsEmitter.emit(topic, eventParams);
                            break;
                    }
                    break;
                default:
                    const device: Device | null = deviceManager.getDeviceByName(topics[1]);
                    if (device) {
                        if (device) {
                            device.emit(eventParams.action ?? 'status_changed', eventParams);
                        }
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
            logger.debug('Closing MQTT connection');
            this.client.end(() => logger.debug('Closed MQTT connection'));
        });
    }
}

export default new MqttExtension();
// export const mqttClient = extension.client;
