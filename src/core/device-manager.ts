import Device from "./abscract-device";
import * as yaml from 'js-yaml';
import * as fs from 'fs';
import deviceClassRegistry from "./device-class-registry";

const logger = require("./logger").logger('devices');

interface ListOfDevices {
    [key: string]: HomeDevice;
}

class HomeDevice {
    constructor(protected source: string, public readonly device: Device) {
    }
}

class DeviceManager {
    protected devicesById: ListOfDevices = {};
    protected devicesByName: ListOfDevices = {};

    addDevice(device: Device, source: string): void {
        const deviceId: string = device.getId();
        if (this.hasDevice(deviceId)) {
            // todo: updated device.
            // todo: optionally check if device changed
        } else {
            const homeDevice: HomeDevice = new HomeDevice(source, device);
            this.devicesById[device.getId()] = homeDevice;
            this.devicesByName[device.getName()] = homeDevice;
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

    saveDevices(): void {
        if (!fs.existsSync('data')) {
            fs.mkdirSync('data');
        }
        // todo: add comment to file not to edit it manually
        fs.writeFile('data/devices.yaml', yaml.dump(this.devicesById), (err) => {
            if (err) {
                logger.error('Error saving devices cache file', err);
            }
        });
    }

    loadDevices(): void {
        const fileExists: boolean = fs.existsSync('data/devices.yaml');
        if (!fileExists) {
            logger.warn('Devices cache file does not exist. Skipping loading devices.');
            return;
        }

        logger.debug('Loading devices from cache file');
        const data: string = fs.readFileSync('data/devices.yaml', 'utf8');
        const parsedData: any = yaml.load(data);
        for (const deviceId in parsedData) {
            const deviceName: string = parsedData[deviceId].device.name;
            const deviceClass = deviceClassRegistry.get(parsedData[deviceId].device.type);
            const device: Device = new deviceClass(deviceId, deviceName, parsedData[deviceId].device);
            const homeDevice: HomeDevice = new HomeDevice(parsedData[deviceId].source, device);
            this.devicesById[deviceId] = homeDevice;
            this.devicesByName[deviceName] = homeDevice;
        }
    }
}

export default new DeviceManager();
