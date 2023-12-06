import * as yaml from 'js-yaml';
import * as fs from 'fs';
import {Device} from "./abscract-device";

const logger = require("./logger").logger('devices');

interface ListOfDevices {
    [key: string]: HomeDevice;
}

class HomeDevice {
    constructor(public readonly source: string, public readonly device: Device) {
    }
}

export class DeviceManager {
    protected devicesById: ListOfDevices = {};
    protected devicesByName: ListOfDevices = {};
    private autoSaveIntervals: { [key: string]: NodeJS.Timeout } = {};

    addDevice(device: Device, source: string): void {
        if (this.hasDevice(device.id)) {
            // todo: updated device.
            // todo: optionally check if device changed
        } else {
            const homeDevice: HomeDevice = new HomeDevice(source, device);
            this.devicesById[device.id] = homeDevice;
            this.devicesByName[device.name] = homeDevice;
        }
    }

    hasDevice(id: string): boolean {
        return this.devicesById.hasOwnProperty(id);
    }

    getDevice(id: string): Device {
        return this.devicesById[id].device;
    }

    getDeviceByName(name: string): Device | null {
        return this.devicesByName[name] ? this.devicesByName[name].device : null;
    }

    getDevices(): ListOfDevices {
        return this.devicesById;
    }

    saveDevices(source: string): void {
        if (!fs.existsSync('data')) {
            fs.mkdirSync('data');
        }
        // todo: add comment to file not to edit it manually
        fs.writeFile(`data/${source}.yaml`, yaml.dump(YamlFileLoader.encode(source, this.devicesById)), (err) => {
            if (err) {
                logger.error('Error saving devices cache file', err);
            }
        });
        this.enableAutoSave(source);
    }

    protected enableAutoSave(source: string): void {
        if (this.autoSaveIntervals[source]) {
            return;
        }
        this.autoSaveIntervals[source] = setInterval(() => {
            logger.debug('Saving devices', {source});
            this.saveDevices(source);
        }, 20 * 60 * 1000);
    }

    loadDevices(source: string): any {
        const fileName = `data/${source}.yaml`;
        const fileExists: boolean = fs.existsSync(fileName);
        if (!fileExists) {
            logger.warn('Devices cache file does not exist. Skipping loading devices.', {fileName});
            return;
        }

        logger.debug('Loading devices from cache file', {fileName});
        const data: string = fs.readFileSync(fileName, 'utf8');
        return yaml.load(data);
    }
}

export default new DeviceManager();

export class YamlFileLoader {
    static encode(source: string, homeDevices: any): {} {
        const result: { [key: string]: {}; } = {};
        for (const homeDeviceId in homeDevices) {
            if (homeDevices[homeDeviceId].source !== source) continue;
            const homeDevice: HomeDevice = homeDevices[homeDeviceId];
            // const traits: string[] = [];
            // for (const traitName in homeDevice.device.traits) {
            //     const trait = homeDevice.device.traits[traitName];
            //     traits.push(traitName);
            // }
            result[homeDeviceId] = {
                name: homeDevice.device.name,
                properties: homeDevice.device.properties,
                info: homeDevice.device.getInfo(),
            };
        }

        return result;
    }
}
