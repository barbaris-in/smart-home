import Extension from "../../core/abstract-extension";
import deviceManager from "../../core/device-manager";
import * as sqlite from "sqlite3";

class Monitoring extends Extension {
    getName(): string {
        return "monitoring";
    }

    init(): void {
        const db = new sqlite.Database('./data/monitoring.sqlite');
        db.run('CREATE TABLE IF NOT EXISTS monitoring(\n' +
            '    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n' +
            '    device TEXT,\n' +
            '    metric TEXT,\n' +
            '    value TEXT\n' +
            ')');
        for (const deviceId in deviceManager.getDevices()) {
            const device = deviceManager.getDevice(deviceId);
            device.on('property_changed', (args: any) => {
                db.run('INSERT INTO monitoring (device, metric, value) VALUES (?, ?, ?)', [device.name, args.name, args.newValue]);
            });
        }
    }
}

export default new Monitoring();
