import GenericDevice from "./generic-device";
import mqtt from "../extensions/mqtt";

export default class Bulb extends GenericDevice {
    public readonly type: string = 'bulb';

    public turnOn(): void {
        mqtt.client.publish(`zigbee2mqtt/${this.name}/set`, '{"state":"ON"}');
    }

    public turnOff(): void {
        mqtt.client.publish(`zigbee2mqtt/${this.name}/set`, '{"state":"OFF"}');
    }

    public toggle(): void {
        throw new Error('Method not implemented.');
    }
}
