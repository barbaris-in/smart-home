import GenericMqttDevice from "./generic-mqtt-device";
const logger = require('../core/logger').logger('devices-motion-sensor');

export default class MotionSensor extends GenericMqttDevice {
    public readonly type: string = 'motion-sensor';
    // todo: what default value should be here? possibly null? better to initialize it in constructor from cached value
    private occupancy: boolean | null = null;

    constructor(protected readonly id: string, protected name: string, protected object: any) {
        super(id, name, object);

        this.on('status_changed', (params: any) => {
            if (undefined === params.occupancy) {
                logger.error('Invalid motion sensor status', {name: this.getName(), params});
                return;
            }
            this.setOccupancy(params.occupancy);
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
}
