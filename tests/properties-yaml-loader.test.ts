import deviceManager, {Devices} from "../src/core/device-manager";
import {MqttExtension} from "../src/extensions/mqtt";
import {Yeelight} from "../src/extensions/yeelight";
import {Device} from "../src/core/device";

describe('Save and load devices', () => {
    xtest('Load devices', () => {
        deviceManager.loadDevices('mqtt', MqttExtension.loadingCallback, 'tests/data/mqtt.yaml');
        expect((<Devices>deviceManager.deviceSources.get('mqtt')).size).toEqual(21);
        expect(deviceManager.devicesById.size).toEqual(21);
        deviceManager.loadDevices('yeelight', Yeelight.loadingCallback, 'tests/data/yeelight.yaml');
        expect((<Devices>deviceManager.deviceSources.get('yeelight')).size).toEqual(1);
        expect(deviceManager.devicesById.size).toEqual(22);

        const doorSensor: Device = deviceManager.getDeviceByName('Door Sensor');

        doorSensor.on('contact_changed', (d: boolean) => {
            console.log(d ? 'closed' : 'open');
        })
        doorSensor.setProperty('contact', false);

        deviceManager.saveDevices('mqtt', 'tests/data/mqtt2.yaml');
    });
});
