import GenericMqttDevice from "./generic-mqtt-device";

export default class WallSwitch extends GenericMqttDevice {
    public readonly type: string = 'switch';
}
