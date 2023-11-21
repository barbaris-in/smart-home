import Device from "../core/abscract-device";

export default class GenericDevice extends Device {
    public readonly type: string = 'generic-device';
    protected raw: any;

    public updateState(mqttDevice: any): void {
        this.raw = mqttDevice;
        this.name = mqttDevice.friendly_name;
    }
}
