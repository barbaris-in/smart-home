import deviceManager, {Devices} from "../../core/device-manager";
import {MqttExtension} from "../mqtt";
import Sync from "./sync";

describe('Sync devices', () => {
    test('Sync devices', () => {
        deviceManager.loadDevices('mqtt', MqttExtension.loadingCallback, 'tests/data/mqtt.yaml');
        expect((<Devices>deviceManager.deviceSources.get('mqtt')).size).toEqual(22);
        const syncResponse = Sync.sync('test', 'test');
        expect(syncResponse.payload.devices.length).toEqual(7);
    });
});
