import deviceManager from "../../src/core/device-manager";
import {MqttExtension} from "../../src/extensions/mqtt";
import {OnOff} from "../../src/core/traits/OnOff";
import {Device} from "../../src/core/device";

describe('OnOff', () => {
    function t(deviceName: string): void {
        deviceManager.loadDevices('mqtt', MqttExtension.loadingCallback, 'tests/data/mqtt.yaml');
        const device: Device = deviceManager.getDeviceByName(deviceName);
        expect(device.supports(OnOff)).toBeTruthy();
    }

    test('Bulb', () => {
        t('Office Desk Light');
    });

    test('Plug', () => {
        t('Plug');
    });

    test('Tree Plug', () => {
        t('Tree Plug');
    });
});
