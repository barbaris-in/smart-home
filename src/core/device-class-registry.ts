import * as fs from "fs";
import * as path from "path";
import Device from "./abscract-device";

const logger = require('./logger').logger('device-class-registry');

export class DeviceClassRegistry {
    private classes: { [alias: string]: any } = {};

    public registerDefaultDeviceClasses(): void {
        fs.readdirSync(path.join(__dirname, '../devices')).forEach((filename: string): void => {
            if (filename.endsWith('.js')) {
                try {
                    const deviceClassName = filename.slice(0, -3);
                    const deviceClass = require('../devices/' + deviceClassName).default;
                    if (deviceClass.prototype instanceof Device) {
                        logger.debug('Loading device class', {deviceClassName});
                        this.register(deviceClassName, deviceClass);
                    }
                } catch (e) {
                    logger.warn(`Error loading device class ${filename}`, e);
                }
            }
        });
    }

    public register(alias: string, className: any): boolean {
        if (this.has(alias)) {
            throw new Error(`Device class with alias ${alias} already registered`);
        }

        this.classes[alias] = className;

        return true;
    }

    public has(alias: string): boolean {
        return this.classes.hasOwnProperty(alias);
    }

    public get(alias: string): any | null {
        return this.classes[alias] ?? null;
    }
}

export default new DeviceClassRegistry();
