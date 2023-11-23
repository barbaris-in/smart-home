import GenericMqttDevice from "./generic-mqtt-device";
import timers from "../core/timers";

export default class Plug extends GenericMqttDevice {
    public readonly type: string = 'plug';

    /**
     *
     * @param id
     * @param name
     */
    constructor(protected readonly id: string, protected name: string) {
        super(id, name);

        /**
         * {
         *   "consumption":5.56,
         *   "device_temperature":31,
         *   "energy":5.56,
         *   "linkquality":192,
         *   "power":0,
         *   "power_outage_count":128,"
         *   state":"OFF"
         * }
         */
        this.on('status_changed', (params: any) => {
        });
    }

    public toggle(): void {
        // todo: implement toggle
        throw new Error('Method not implemented.');
    }

    public turnOn(): void {
        this.sendCommand({state: 'ON'});
        timers.clearTimer(this.getName());
    }

    public turnOff(): void {
        this.sendCommand({state: 'OFF'});
        timers.clearTimer(this.getName());
    }

    public turnOffAfter(timeout: number): void {
        const timer = setTimeout(() => {
            this.turnOff();
        }, timeout * 1000);
        timers.refreshTimer(this.getName(), timer);
    }
}
