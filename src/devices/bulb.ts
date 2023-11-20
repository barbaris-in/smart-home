import GenericDevice from "./generic-device";
import timers from "../core/timers";
import mqtt from "../extensions/mqtt";

export default class Bulb extends GenericDevice {
    public readonly type: string = 'bulb';

    public turnOn(): void {
        mqtt.client.publish(`zigbee2mqtt/${this.name}/set`, '{"state":"ON"}');
        timers.clearTimer(this.getName());
    }

    public turnOff(): void {
        mqtt.client.publish(`zigbee2mqtt/${this.name}/set`, '{"state":"OFF"}');
        timers.clearTimer(this.getName());
    }

    public turnOffAfter(timeout: number): void {
        const timer = setTimeout(() => {
            this.turnOff();
        }, timeout * 1000);
        timers.refreshTimer(this.getName(), timer);
    }

    public toggle(): void {
        throw new Error('Method not implemented.');
    }
}
