import GenericDevice from "./generic-device";

const logger = require("../core/logger").logger('yeelight-wifi-strip');
import * as net from 'net';
import timers from "../core/timers";

export default class YeelightWifiStrip extends GenericDevice {
    public readonly type: string = 'yeelight-wifi-strip';
    private readonly ip: string | null = null;
    private readonly port: number | null = null;

    constructor(
        id: string,
        name: string,
        params: any,
    ) {
        super(id, name, params);
        if (params.ip) {
            this.ip = params.ip;
        }
        if (params.port) {
            this.port = params.port;
        }
    }

    private sendCommand(command: {}): boolean {
        const client = new net.Socket();
        if (!this.ip || !this.port) {
            logger.error('No IP or port', this);
            return false;
        }

        client.connect(this.port, this.ip, () => {
            const commandString = JSON.stringify(command) + '\r\n';
            client.write(commandString);
            client.destroy();
        });
        return true;
    }

    getId(): string {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    toggle(): boolean {
        timers.clearTimer(this.getName());
        return this.sendCommand({"id": 1, "method": "toggle", "params": []});
    }

    turnOn(): boolean {
        timers.clearTimer(this.getName());
        return this.sendCommand({"id": 1, "method": "set_power", "params": ["on", "smooth", 500]});
    }

    turnOff(): boolean {
        timers.clearTimer(this.getName());
        return this.sendCommand({"id": 1, "method": "set_power", "params": ["off", "smooth", 500]});
    }

    public turnOffAfter(timeout: number): void {
        const timer = setTimeout(() => {
            this.turnOff();
        }, timeout * 1000);
        timers.refreshTimer(this.getName(), timer);
    }

    public setTemperature(temperature: number): boolean {
        if (temperature < 1700) {
            temperature = 1700;
            logger.warn('Temperature is too low, setting to 1700');
        }
        if (temperature > 6500) {
            temperature = 6500;
            logger.warn('Temperature is too high, setting to 6500');
        }
        return this.sendCommand({"id": 1, "method": "set_ct_abx", "params": [temperature, "smooth", 500]});
    }
}
