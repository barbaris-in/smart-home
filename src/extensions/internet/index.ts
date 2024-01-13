import Extension from "../../core/abstract-extension";
import deviceManager from "../../core/device-manager";
import {Device} from "../../core/device";

const logger = require("../../core/logger").logger('internet-access');

export class InternetDevice extends Device {
    public readonly type: string = 'internet-device';
    private status: boolean | null = null;

    setStatus(status: boolean): void {
        if (this.status === null) {
            this.status = status;
        } else {
            const changed = this.status !== status;
            this.status = status;
            if (changed) {
                this.emit('status_changed', {status});
                if (status) {
                    this.emit('connected');
                } else {
                    this.emit('disconnected');
                }
            }
        }
    }

    public onConnected(callback: Function): void {
        this.on('connected', callback);
    }

    public onDisconnected(callback: Function): void {
        this.on('disconnected', callback);
    }
}

class InternetAccessExtension extends Extension {
    protected interval: NodeJS.Timeout | null = null;

    getName(): string {
        return "internet";
    }

    init(): void {
        const internetDevice = new InternetDevice('internet', 'Internet');
        deviceManager.addDevice(internetDevice, 'internet');
        const ping = require('ping');
        const host = 'google.com';
        // this.interval = setInterval(() => {
        //     ping.sys.probe(host, (isAlive: boolean) => {
        //         internetDevice.setStatus(isAlive);
        //         logger.debug(`${host} is ${isAlive ? 'alive' : 'dead'}`);
        //     });
        // }, 60 * 1000);
    }

    unload(): void {
        // if (this.interval !== null) {
        //     clearInterval(this.interval);
        // }
    }
}

export default new InternetAccessExtension();
