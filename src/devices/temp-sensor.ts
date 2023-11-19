import GenericMqttDevice from "./generic-mqtt-device";

export default class TempSensor extends GenericMqttDevice {
    public readonly type: string = 'temp-sensor';

    public onTemperatureChange(callback: Function): void {
        this.on('temperature_change', callback);
    }
}
