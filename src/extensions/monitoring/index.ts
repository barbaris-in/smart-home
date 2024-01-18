import Extension from "../../core/abstract-extension";
import deviceManager from "../../core/device-manager";
import {WebSQLConnector} from "./database/websql-connector";
import AbstractDatabaseConnector from "./database/abstract-connector";

const logger = require('../../core/logger').logger('monitoring');

// todo: use this buffer
export class MonitoringBuffer {
    protected readonly buffer: { timestamp: number, device: string, metric: string, value: any }[] = [];

    constructor(
        protected readonly flushCallback: Function,
        protected readonly size: number,
        protected readonly timeout?: number
    ) {
        if (timeout) {
            setInterval(() => {
                this.flush();
            }, timeout);
        }
    }

    add(timestamp: number, device: string, metric: string, value: any): void {
        this.buffer.push({timestamp, device, metric, value});
        if (this.buffer.length >= this.size) {
            this.flush();
        }
    }

    flush(): void {
        logger.debug('Flushing buffer');
        this.flushCallback(this.buffer);
        this.buffer.splice(0, this.buffer.length);
    }

    getSize(): number {
        return this.buffer.length;
    }
}

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

        deviceManager.getDevices().forEach(device => {
            device.on('property_changed', (args: any) => {
                db.insert('INSERT INTO monitoring (device, metric, value) VALUES (?, ?, ?)', [device.name, args.name, args.newValue])
                    .catch(err => {
                        logger.error('Could not insert monitoring data', {err});
                    });
            });
        });
    }
}

export default new Monitoring();
