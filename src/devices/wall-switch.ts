import GenericMqttDevice from "./generic-mqtt-device";

export default class WallSwitch extends GenericMqttDevice {
    public readonly type: string = 'wall-switch';

    constructor(protected readonly id: string, protected name: string) {
        super(id, name);

        /**
         * {
         *   "action":"single_right",
         *   "battery":100,
         *   "click":"right",
         *   "device_temperature":24,
         *   "linkquality":128,
         *   "power_outage_count":24,
         *   "voltage":3015
         * }
         */
        this.on('status_changed', (params: any) => {
        });
    }

    public onSingleLeft(callback: Function): void {
        this.on('single_left', callback);
    }

    public onSingleRight(callback: Function): void {
        this.on('single_right', callback);
    }

    public onSingleBoth(callback: Function): void {
        this.on('single_both', callback);
    }

    public onDoubleLeft(callback: Function): void {
        this.on('double_left', callback);
    }

    public onDoubleRight(callback: Function): void {
        this.on('double_right', callback);
    }

    public onDoubleBoth(callback: Function): void {
        this.on('double_both', callback);
    }

    public onHoldLeft(callback: Function): void {
        this.on('hold_left', callback);
    }

    public onHoldRight(callback: Function): void {
        this.on('hold_right', callback);
    }

    public onHoldBoth(callback: Function): void {
        this.on('hold_both', callback);
    }
}
