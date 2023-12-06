import Extension from "../../core/abstract-extension";
import deviceManager from "../../core/device-manager";
import {WebSQLConnector} from "./database/websql-connector";
import AbstractDatabaseConnector from "./database/abstract-connector";

const logger = require('../../core/logger').logger('monitoring');

class Monitoring extends Extension {
    private db: AbstractDatabaseConnector;

    constructor() {
        super();
        const apiUrl = process.env.MONITORING_DATABASE_API_URL;
        if (!apiUrl) {
            throw new Error('DATABASE_API_URL not set');
        }
        const database = process.env.MONITORING_DATABASE || 'monitoring';
        const token = process.env.MONITORING_DATABASE_TOKEN;
        if (!token) {
            throw new Error('DATABASE_TOKEN not set');
        }
        this.db = new WebSQLConnector(apiUrl, database, token);
    }

    getName(): string {
        return "monitoring";
    }

    init(): void {
        this.db.exec('CREATE TABLE IF NOT EXISTS monitoring(\n' +
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
                this.db.insert('INSERT INTO monitoring (device, metric, value) VALUES (?, ?, ?)', [device.name, args.name, args.newValue])
                    .catch(err => {
                        logger.error('Could not insert monitoring data', {err});
                    });
            });
        }
    }
}

export default new Monitoring();
