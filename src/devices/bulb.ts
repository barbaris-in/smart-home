import GenericDevice from "./generic-device";
import timers from "../core/timers";

export default class Bulb extends GenericDevice {
    public readonly type: string = 'bulb';

    public turnOn(): void {
        const mqtt = require("../extensions/mqtt").default;
        mqtt.client.publish(`zigbee2mqtt/${this.name}/set`, '{"state":"ON"}');
        timers.clearTimer(this.getName());
    }

    public turnOff(): void {
        const mqtt = require("../extensions/mqtt").default;
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
        // todo: implement bulb toggle
        throw new Error('Method not implemented.');
    }
}
