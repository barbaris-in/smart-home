import GenericMqttDevice from "./generic-mqtt-device";

const logger = require('../core/logger').logger('devices-motion-sensor');

export default class MotionSensor extends GenericMqttDevice {
    public readonly type: string = 'motion-sensor';
    // todo: what default value should be here? possibly null? better to initialize it in constructor from cached value
    protected occupancy: boolean | null = null;
    protected illuminance: number | null = null;
    protected battery: number | null = null;
    // protected deviceTemperature: number | null = null;
    // protected power_outage_count: number | null = null;
    // protected voltage: number | null = null;

    constructor(protected readonly id: string, protected name: string) {
        super(id, name);

        /**
         * Detect any device changes. Example:
         * ```json
         * {
         *     "battery":100,
         *     "device_temperature":24,
         *     "illuminance":8,
         *     "illuminance_lux":8,
         *     "linkquality":255,
         *     "occupancy":true,
         *     "power_outage_count":93,
         *     "voltage":3025
         * }
         * ```
         */
        this.on('status_changed', (params: any) => {
            if (undefined === params.occupancy) {
                logger.error('No occupancy in motion sensor status', {name: this.getName(), params});
            } else {
                this.setOccupancy(params.occupancy);
            }

            if (undefined === params.illuminance) {
                logger.error('No illuminance in motion sensor status', {name: this.getName(), params});
            } else {
                this.setIlluminance(params.illuminance);
            }

            if (undefined === params.battery) {
                logger.error('No battery in motion sensor status', {name: this.getName(), params});
            } else {
                this.setBattery(params.battery);
            }

            // this.setDeviceTemperature(params.device_temperature);
            // this.setIlluminanceLux(params.illuminance_lux);
            // this.setLinkQuality(params.linkquality);
            // this.setPowerOutageCount(params.power_outage_count);
            // this.setVoltage(params.voltage);
        });
    }

    public setOccupancy(occupancy: boolean): void {
        const changed = this.occupancy !== occupancy;
        this.occupancy = occupancy;

        if (changed) {
            if (occupancy) {
                logger.debug('Motion detected', {deviceName: this.getName()});
                this.emit('motion_detected')
            } else {
                logger.debug('Motion stopped', {deviceName: this.getName()});
                this.emit('motion_stopped');
            }
        }

        return;
    }

    protected setBattery(newValue: number): void {
        const oldValue = this.battery;
        const changed = oldValue !== newValue;
        this.battery = newValue;

        if (oldValue !== null && changed) {
            logger.debug('Battery level changed', {deviceName: this.getName(), oldValue, newValue});
            this.emit('battery_level_changed', {oldValue, newValue});
        }
    }

    protected setIlluminance(newValue: number): void {
        const oldValue = this.battery;
        const changed = oldValue !== newValue;
        this.illuminance = newValue;

        if (oldValue !== null && changed) {
            logger.debug('Illuminance changed', {deviceName: this.getName(), oldValue, newValue});
            this.emit('illuminance_changed', {oldValue, newValue});
        }
    }

    // protected setLinkQuality(linkquality: any) {
    //
    // }
    //
    // protected setPowerOutageCount(power_outage_count: any) {
    //
    // }
    //
    // protected setVoltage(voltage: any) {
    //
    // }

    /**
     * @internal
     */
    // protected onStatusChanged(callback: Function): void {
    //     this.on('status_changed', callback);
    // }

    public onMotionDetected(callback: Function): void {
        this.on('motion_detected', callback);
    }

    public onMotionStopped(callback: Function): void {
        this.on('motion_stopped', callback);
    }

    public onIlluminanceChanged(callback: Function): void {
        this.on('illuminance_changed', callback);
    }

    public onBatteryLevelChanged(callback: Function): void {
        this.on('battery_level_changed', callback);
    }
}
