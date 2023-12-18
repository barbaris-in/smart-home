import Extension from "../../core/abstract-extension";
import deviceManager from "../../core/device-manager";
import {WebSQLConnector} from "./database/websql-connector";
import AbstractDatabaseConnector from "./database/abstract-connector";

const logger = require('../../core/logger').logger('monitoring');
// todo: add buffer here
class Monitoring extends Extension {
    protected readonly apiUrl: string;
    protected readonly database: string;
    protected readonly token: string;

    constructor() {
        super();
        this.apiUrl = process.env.MONITORING_DATABASE_API_URL || '';
        if (!this.apiUrl) {
            throw new Error('DATABASE_API_URL not set');
        }
        this.database = process.env.MONITORING_DATABASE || 'monitoring';
        this.token = process.env.MONITORING_DATABASE_TOKEN || '';
        if (!this.token) {
            throw new Error('DATABASE_TOKEN not set');
        }
    }

    getName(): string {
        return "monitoring";
    }

    init(): void {
        const db = new WebSQLConnector(this.apiUrl, this.database, this.token);
        db.exec('CREATE TABLE IF NOT EXISTS monitoring(\n' +
            '    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n' +
            '    device TEXT,\n' +
            '    metric TEXT,\n' +
            '    value TEXT\n' +
            ')')
            .then(() => {
                logger.debug('Monitoring table created');
            })
            .catch(err => {
                logger.error('Could not create monitoring table', {err});
            });

        for (const deviceId in deviceManager.getDevices()) {
            const device = deviceManager.getDevice(deviceId);
            device.on('property_changed', (args: any) => {
                db.insert('INSERT INTO monitoring (device, metric, value) VALUES (?, ?, ?)', [device.name, args.name, args.newValue])
                    .catch(err => {
                        logger.error('Could not insert monitoring data', {err});
                    });
            });
        }
    }
}

export default new Monitoring();
