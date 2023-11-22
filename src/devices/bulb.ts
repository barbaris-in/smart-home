import GenericDevice from "./generic-device";
import timers from "../core/timers";
import GenericMqttDevice from "./generic-mqtt-device";

export default class Bulb extends GenericMqttDevice {
    public readonly type: string = 'bulb';
    protected state: string | null = null;
    protected brightness: number | null = null;
    protected color_temp: number | null = null;

    constructor(protected readonly id: string, protected name: string) {
        super(id, name);

        /**
         * Detect any device changes. Example:
         * ```
         * {
         *   "brightness": 254,
         *   "color_mode": "color_temp",
         *   "color_temp": 187,
         *   "linkquality": 156,
         *   "state": "ON",
         *   "update": {
         *     "installed_version": 34,
         *     "latest_version": 34,
         *     "state": "idle"
         *   },
         *   "update_available": false
         * }
         * ```
         * __Note:__ Only some of the properties can be received, depending on the last command. Example:
         * ```
         * {
         *   "brightness": 254
         * }
         * ```
         */
        this.on('status_changed', (params: any) => {
            if (undefined !== params.state) {
                this.state = params.state;
            }

            if (undefined !== params.brightness) {
                this.brightness = params.brightness;
            }

            if (undefined !== params.color_temp) {
                this.color_temp = params.color_temp;
            }
        });
    }

    public getBrightness(): number | null {
        return this.brightness;
    }

    public getColorTemperature(): number | null {
        return this.color_temp;
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

    public toggle(): void {
        // todo: implement bulb toggle
        throw new Error('Method not implemented.');
    }

    /**
     * value_max: 254
     * value_min: 0
     * @param brightness
     */
    public setBrightness(brightness: number): void {
        this.brightness = Math.max(0, Math.min(254, brightness));
        this.sendCommand({brightness: this.brightness});
    }

    /**
     * value_max: 370
     * value_min: 153
     * @param colorTemperature
     */
    public setColorTemperature(colorTemperature: number): void {
        this.color_temp = Math.max(153, Math.min(370, colorTemperature))
        this.sendCommand({color_temp: this.color_temp});
    }
}
