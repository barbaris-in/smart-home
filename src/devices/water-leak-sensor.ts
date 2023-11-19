import GenericMqttDevice from "./generic-mqtt-device";

export default class WaterLeakSensor extends GenericMqttDevice {
    public readonly type: string = 'water-leak-sensor';
}
