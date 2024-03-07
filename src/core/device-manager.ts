import * as yaml from 'js-yaml';
import * as fs from 'fs';
import {Device} from "./device";

const logger = require("./logger").logger('device-manager');

export class Devices extends Map<string, Device> {
    toJSON(): any {
        const plain: any = {};
        this.forEach((device, key) => {
            plain[key] = device.toJSON();
        });
        return plain;
    }
}

class DeviceSources extends Map<string, Devices> {
}

export class DeviceManager {
    private readonly waitingTimers: NodeJS.Timeout[] = [];
    public readonly devicesById: Devices = new Devices();
    public readonly devicesByName: Devices = new Devices();
    public readonly deviceSources: DeviceSources = new DeviceSources();
    private autoSaveIntervals: { [key: string]: NodeJS.Timeout } = {};

    constructor() {
        process.on('SIGINT', () => {
            logger.debug('Stopping waiting timers');
            for (const waitingTimer of this.waitingTimers) {
                clearInterval(waitingTimer);
            }
            logger.debug('Stopping auto save');
            for (const source in this.autoSaveIntervals) {
                clearInterval(this.autoSaveIntervals[source]);
            }
        });
    }

    registerDevice(device: Device, source: string): void {
        if (this.devicesById.has(device.id)) {
            // const existingDevice: Device = <Device>this.devicesById.get(device.id);
            // if (existingDevice.name !== device.name) {
            //     this.devicesByName.delete(existingDevice.name);
            //     existingDevice.name = device.name;
            //     this.devicesByName.set(device.name, device);
            //     logger.info('Device name changed', {id: device.id, oldName: existingDevice.name, newName: device.name});
            // }
        } else {
            this.devicesById.set(device.id, device);
            this.devicesByName.set(device.name, device);
            if (!this.deviceSources.has(source)) {
                this.deviceSources.set(source, new Devices());
            }
            (<Devices>this.deviceSources.get(source)).set(device.id, device);
            logger.debug('Device has been registered', {source, device: device.name})
        }
    }

    waitDevices(deviceNames: string[], callback: Function, timeoutCallback?: Function): void {
        const getMissing = (): string[] => {
            const missingDevices: string[] = [];
            for (const deviceName of deviceNames) {
                if (!this.devicesByName.has(deviceName)) {
                    logger.debug('Waiting for device', {deviceName});
                    missingDevices.push(deviceName);
                }
            }
            return missingDevices;

        }
        let tick = 0;
        const interval = setInterval(() => {
            const missingDevices = getMissing();
            if (!missingDevices.length) {
                callback();
                clearInterval(interval);
            } else {
                tick++;
                if (tick > 3600) {
                    if (timeoutCallback) {
                        timeoutCallback();
                    } else {
                        logger.error('Waiting for devices timeout', {missingDevices});
                    }
                    clearInterval(interval);
                }
            }
        }, 1000);
        this.waitingTimers.push(interval);
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
