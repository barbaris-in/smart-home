import GenericDevice from "./generic-device";

export default class GenericMqttDevice extends GenericDevice {
    public readonly type: string = 'generic-mqtt-device';
}
