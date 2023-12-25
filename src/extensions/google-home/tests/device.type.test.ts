import GoogleDeviceType from "../GoogleDeviceType";
import deviceManager from "../../../core/device-manager";
import {MqttExtension} from "../../mqtt";
import {OnOff} from "../../../core/traits/OnOff";
import {Device} from "../../../core/device";

describe('Outlets', () => {
    test('Get outlet device type', () => {
        deviceManager.loadDevices('mqtt', MqttExtension.loadingCallback, 'tests/data/mqtt.yaml');
        const plug: Device = deviceManager.getDeviceByName('Plug');
        const googleDeviceType: string = GoogleDeviceType.getDeviceType(plug);
        expect(googleDeviceType).toEqual('action.devices.types.OUTLET');
        const googleDevice = GoogleDeviceType.deviceToGoogleDevice(plug);
        expect(googleDevice.traits.length).toEqual(1);
        expect(googleDevice.traits[0]).toEqual('action.devices.traits.OnOff');
    });
});
