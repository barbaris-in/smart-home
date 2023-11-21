import Extension from "../../core/abstract-extension";
import deviceManager from "../../core/device-manager";
import DeviceClassDecider from "../../core/device-class-decider";
import deviceClassRegistry from "../../core/device-class-registry";

const logger = require("../../core/logger").logger('mqtt-device-discovery');

class MqttDeviceLocator extends Extension {
    getName(): string {
        return 'mqtt-device-discovery';
    }

    dependsOn(): string[] {
        return ['mqtt'];
    }

    run(): void {
        const mqttDevice = deviceManager.getDeviceByName('MQTT');
        if (!mqttDevice) {
            logger.error('MQTT device not found');
            return;
        }
        mqttDevice.on('zigbee2mqtt/bridge/devices', (mqttDevices: any): void => {
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

export default new MqttDeviceLocator();
