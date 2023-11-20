import Extension from "../../core/abstract-extension";
import GenericDevice from "../../devices/generic-device";
import deviceManager from "../../core/device-manager";
const logger = require("../../core/logger").logger('internet-access');

class InternetDevice extends GenericDevice {
    public readonly type: string = 'internet-device';
    private status: boolean | null = null;

    setStatus(status: boolean): void {
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

    onConnected(callback: Function): void {
        this.on('connected', callback);
    }

    onDisconnected(callback: Function): void {
        this.on('disconnected', callback);
    }
}

class InternetAccessExtension extends Extension {
    getName(): string {
        return "internet-access";
    }

    run(): void {
        const internetDevice = new InternetDevice('internet', 'Internet');
        deviceManager.addDevice(internetDevice, 'internet');
        const ping = require('ping');
        const host = 'google.com';
        setInterval(() => {
            ping.sys.probe(host, (isAlive: boolean) => {
                internetDevice.setStatus(isAlive);
                logger.debug(`${host} is ${isAlive ? 'alive' : 'dead'}`);
            });
        }, 5000);
    }
}

// export default new InternetAccessExtension();
