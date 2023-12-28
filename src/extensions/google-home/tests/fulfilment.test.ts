import deviceManager, {Devices} from "../../../core/device-manager";
import {MqttExtension} from "../../mqtt";
import Sync from "../sync";

describe('Sync devices', () => {
    beforeEach(() => {
        deviceManager.devicesById.clear();
        deviceManager.devicesByName.clear();
    });

    test('Sync devices', () => {
        deviceManager.loadDevices('mqtt', MqttExtension.loadingCallback, 'tests/data/mqtt.yaml');
        expect((<Devices>deviceManager.deviceSources.get('mqtt')).size).toEqual(22);
        const syncResponse = Sync.sync('test', 'test');
        expect(syncResponse.payload.devices.length).toEqual(7);
    });

    test('Sync plug 1', () => {
        deviceManager.loadDevices('mqtt', MqttExtension.loadingCallback, 'tests/data/plug.yaml');
        expect(deviceManager.devicesById.size).toEqual(1);
        const syncResponse = Sync.sync('test', 'test');
        expect(syncResponse.payload.devices.length).toEqual(1);
        expect(syncResponse.payload.devices[0].type).toEqual('action.devices.types.OUTLET');
        expect(syncResponse.payload.devices[0].traits.length).toEqual(1);
        expect(syncResponse.payload.devices[0].traits[0]).toEqual('action.devices.traits.OnOff');
        expect(syncResponse.payload.devices[0].name.name).toEqual('Plug');
    });

    test('Sync plug 2', () => {
        deviceManager.loadDevices('mqtt', MqttExtension.loadingCallback, 'tests/data/plug2.yaml');
        expect(deviceManager.devicesById.size).toEqual(1);
        const syncResponse = Sync.sync('test', 'test');
        expect(syncResponse.payload.devices.length).toEqual(1);
        expect(syncResponse.payload.devices[0].type).toEqual('action.devices.types.OUTLET');
        expect(syncResponse.payload.devices[0].traits.length).toEqual(1);
        expect(syncResponse.payload.devices[0].traits[0]).toEqual('action.devices.traits.OnOff');
        expect(syncResponse.payload.devices[0].name.name).toEqual('Plug 2');
    });

    test('Bulb', () => {
        deviceManager.loadDevices('mqtt', MqttExtension.loadingCallback, 'tests/data/bulb.yaml');
        expect(deviceManager.devicesById.size).toEqual(1);
        const syncResponse = Sync.sync('test', 'test');
        expect(syncResponse.payload.devices.length).toEqual(1);
        expect(syncResponse.payload.devices[0].type).toEqual('action.devices.types.LIGHT');
        expect(syncResponse.payload.devices[0].traits.length).toEqual(3);
        expect(syncResponse.payload.devices[0].traits[0]).toEqual('action.devices.traits.OnOff');
        expect(syncResponse.payload.devices[0].traits[1]).toEqual('action.devices.traits.Brightness');
        expect(syncResponse.payload.devices[0].traits[2]).toEqual('action.devices.traits.ColorSetting');
    });
});
