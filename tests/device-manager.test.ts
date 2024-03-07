import deviceManager from "../src/core/device-manager";
import * as yaml from 'js-yaml';
import * as fs from "fs";
import mqtt from "../src/extensions/mqtt/mqtt";

describe('Serialize all devices', () => {
    const getRawData = (filename: string): any => {
        const dataString: string = fs.readFileSync(filename, 'utf8');
        return yaml.load(dataString);
    }

    test('Get devices', () => {
        const rawData = getRawData('tests/fixtures/mqtt/bulb.yaml');
        const bulb = mqtt.deviceFromInfo(rawData);
        deviceManager.registerDevice(bulb, 'fixtures');
        const allDevices = deviceManager.getDevices();
        expect(allDevices.toJSON()).toEqual({
            "0x00158d00041138dd": {
                "name": "Office Desk Light",
                "traits": [],
            },
        });
    });
});
