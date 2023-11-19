import GenericMqttDevice from "./generic-mqtt-device";
const logger = require('../core/logger').logger('devices-motion-sensor');

export default class MotionSensor extends GenericMqttDevice {
    public readonly type: string = 'motion-sensor';
    // todo: what default value should be here? possibly null?
    private occupancy: boolean = true;

    public setOccupancy(occupancy: boolean): boolean {
        const result = this.occupancy !== occupancy;
        this.occupancy = occupancy;
        return result;
    }

    public onStatusChanged(callback: Function): void {
        this.on('status_changed', callback);
    }

    // public onMotionDetected(callback: Function): void {
    //     this.on('motion_detected', callback);
    // }
    //
    // public onMotionStopped(callback: Function): void {
    //     this.on('motion_stopped', callback);
    // }
}
