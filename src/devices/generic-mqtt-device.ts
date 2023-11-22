import GenericDevice from "./generic-device";

export default class GenericMqttDevice extends GenericDevice {
    public readonly type: string = 'generic-mqtt-device';

    protected sendCommand(command: {}): void {
        const commandString = JSON.stringify(command);
        const mqtt = require("../extensions/mqtt").default;
        mqtt.client.publish(`zigbee2mqtt/${this.name}/set`, commandString);
    }
}
