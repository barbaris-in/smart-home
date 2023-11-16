import {Extension} from "../../core/extension-interface";
import * as mqtt from "mqtt";
import {MqttClient} from "mqtt";
import {eventsEmitter} from "../../core/events-emitter";

const mqttHost: string | undefined = process.env.MQTT_HOST;
const mqttPort: string = process.env.MQTT_PORT || '1883';

class MqttExtension extends Extension {
    public readonly client: MqttClient;
    // getClient(): MqttClient {
    //     return this.client;
    // }
    constructor() {
        super();
        const brokerAddress: string = `mqtt://${mqttHost}:${mqttPort}`;
        console.log('Connecting to MQTT: ', brokerAddress);
        this.client = mqtt.connect(brokerAddress);
    }
    // private client: MqttClient;
    getName(): string {
        return 'mqtt';
    }

    run(): void {
        // Subscribe to all messages by using the '#' wildcard
        this.client.subscribe('#', (err) => {
            if (err) {
                console.error('Error subscribing to all topics:', err);
            } else {
                console.log('Subscribed to all topics');
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
            console.log(topic);
            eventsEmitter.emit(topic, eventParams);
        });

        // Handle errors
        this.client.on('error', (err) => {
            console.error('MQTT client error:', err);
        });

        // Handle disconnect
        this.client.on('close', () => {
            console.log('Disconnected from MQTT broker');
        });

        // Handle reconnect
        this.client.on('reconnect', () => {
            console.log('Reconnecting to MQTT broker');
        });

        // Gracefully close the MQTT connection on process exit
        process.on('SIGINT', () => {
            console.log('Closing MQTT connection');
            this.client.end();
            console.log('Closed MQTT connection');
        });
        // let state = false;
        // setInterval(() => {
        //     state = !state;
        //     this.client.publish('zigbee2mqtt/Hallway Light/set', `{"state":"${state ? "ON" : "OFF"}"}`);
        // }, 2000);
    }
}

export const extension: MqttExtension = new MqttExtension();
export const mqttClient = extension.client;
// let state = false;
// setInterval(() => {
//     state = !state;
//     this.client.publish('zigbee2mqtt/Office Desk Light/set', `{"state":"${state ? "ON" : "OFF"}"}`);
// }, 2000);
//
//
// allLightsOff = () => {
//     client.publish('zigbee2mqtt/Office Desk Light/set', `{"state":"ON"}`);
//     client.publish('zigbee2mqtt/Bedroom Desk Light/set', `{"state":"OFF"}`);
//     client.publish('zigbee2mqtt/Bathroom Mirror Light/set', `{"state":"OFF"}`);
//     client.publish('zigbee2mqtt/Hallway Light/set', `{"state":"OFF"}`);
// }
//
// allLightsOff();
