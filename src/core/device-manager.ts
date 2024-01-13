import * as yaml from 'js-yaml';
import * as fs from 'fs';
import {Device} from "./device";

const logger = require("./logger").logger('devices');

export class Devices extends Map<string, Device> {
}

class DeviceSources extends Map<string, Devices> {
}

export class DeviceManager {
    public readonly devicesById: Devices = new Devices();
    public readonly devicesByName: Devices = new Devices();
    public readonly deviceSources: DeviceSources = new DeviceSources();
    private autoSaveIntervals: { [key: string]: NodeJS.Timeout } = {};

    addDevice(device: Device, source: string): void {
        if (this.devicesById.has(device.id)) {
            // todo: updated device.
            // todo: optionally check if device changed
        } else {
            this.devicesById.set(device.id, device);
            this.devicesByName.set(device.name, device);
            if (!this.deviceSources.has(source)) {
                this.deviceSources.set(source, new Devices());
            }
            (<Devices>this.deviceSources.get(source)).set(device.id, device);
        }
    }

    getDevice(id: string): Device {
        if (!this.devicesById.has(id)) {
            throw new Error(`Device ${id} is not registered`);
        }

        return <Device>this.devicesById.get(id);
    }

    getDeviceByName(name: string): Device {
        if (!this.devicesByName.has(name)) {
            throw new Error(`Device ${name} is not registered`);
        }

        return <Device>this.devicesByName.get(name);
    }

    getDevices(): Devices {
        return this.devicesById;
    }

    saveDevices(source: string, filename?: string): void {
        if (!fs.existsSync('data')) {
            fs.mkdirSync('data');
        }
        if (!filename) {
            filename = `data/${source}.yaml`;
        }

        const devicesListPlain: any = {};
        (<Devices>this.deviceSources.get(source)).forEach((device, key) => {
            devicesListPlain[key] = {
                name: device.name,
                properties: Object.fromEntries(device.properties),
                info: device.getInfo()
            };
        });

        fs.writeFile(filename, '# DO NOT MODIFY THIS FILE MANUALLY\r\n' + yaml.dump(devicesListPlain), (err) => {
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

        process.on('SIGINT', () => {
            logger.debug('Stopping auto save');
            clearInterval(this.autoSaveIntervals[source]);
        });
    }

    loadDevices(source: string, callback: Function, filename?: string): void {
        if (!filename) {
            filename = `data/${source}.yaml`;
        }

        const fileExists: boolean = fs.existsSync(filename);
        if (!fileExists) {
            logger.warn('Devices cache file does not exist. Skipping loading devices.', {filename});
            return;
        }

        logger.debug('Loading devices from file', {filename});
        const dataString: string = fs.readFileSync(filename, 'utf8');
        const data: any = yaml.load(dataString);
        for (const deviceId in data) {
            callback(data[deviceId]);
        }
    }
}

export default new DeviceManager();
