import GenericMqttDevice from "./generic-mqtt-device";

export default class DoorWindowSensor extends GenericMqttDevice {
    public readonly type: string = 'door-window-sensor';
}
