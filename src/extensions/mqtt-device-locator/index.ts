import Extension from "../../core/abstract-extension";
import {eventsEmitter} from "../../core/events-emitter";
import deviceManager from "../../core/device-manager";
import DeviceClassDecider from "../../core/device-class-decider";
import deviceClassRegistry from "../../core/device-class-registry";

const logger = require("../../core/logger").logger('mqtt-device-discovery');

class MqttExtension extends Extension {
    getName(): string {
        return 'mqtt-device-discovery';
    }

    run(): void {
        eventsEmitter.on('zigbee2mqtt/bridge/devices', (mqttDevices): void => {
            for (const mqttDevice of mqttDevices) {
                logger.debug('Registering device', mqttDevice);
                if (mqttDevice.definition && mqttDevice.definition.description) {
                    console.log(mqttDevice.definition);
                    if (!deviceManager.hasDevice(mqttDevice.ieee_address)) {
                        const classFile: string = DeviceClassDecider.getDeviceClass(mqttDevice);
                        const deviceClass = deviceClassRegistry.get(classFile);
                        const device = new deviceClass(mqttDevice.ieee_address, mqttDevice.friendly_name, mqttDevice);
                        deviceManager.addDevice(device, 'mqtt');
                    }
                }
            }
            deviceManager.saveDevices();
        });
    }
}

export default new MqttExtension();
