import Extension from "../../core/abstract-extension";
import deviceManager from "../../core/device-manager";
import {SqliteConnector} from "./database/sqlite-connector";
import DatabaseConnector from "./database/abstract-connector";

const logger = require('../../core/logger').logger('monitoring');

export class MonitoringBuffer {
    protected readonly buffer: { timestamp: string, device: string, metric: string, value: any }[] = [];
    public intervalHandler: NodeJS.Timeout | null = null;

    constructor(
        protected readonly flushCallback: Function,
        protected readonly size: number,
        protected readonly timeout?: number
    ) {
        if (timeout) {
            this.intervalHandler = setInterval(() => {
                this.flush();
            }, timeout);
        }
    }

    add(timestamp: string, device: string, metric: string, value: any): void {
        this.buffer.push({timestamp, device, metric, value});
        if (this.buffer.length >= this.size) {
            this.flush();
        }
    }

    flush(): void {
        logger.debug('Flushing buffer');
        if (this.buffer.length < 1) {
            logger.debug('Buffer is empty');
            return;
        }
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
    private readonly db: DatabaseConnector;
    private readonly buffer: MonitoringBuffer;

    constructor() {
        super('monitoring');
        this.apiUrl = process.env.MONITORING_DATABASE_API_URL || '';
        if (!this.apiUrl) {
            throw new Error('DATABASE_API_URL not set');
        }
        this.database = process.env.MONITORING_DATABASE || 'monitoring';
        this.token = process.env.MONITORING_DATABASE_TOKEN || '';
        if (!this.token) {
            throw new Error('DATABASE_TOKEN not set');
        }

        this.db = new SqliteConnector('./data/monitoring.sqlite');
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
        this.buffer = new MonitoringBuffer((bufferData: { timestamp: number, device: string, metric: string, value: any }[]): void => {
            const sql = 'INSERT INTO monitoring (timestamp, device, metric, value) VALUES ' +
                bufferData.map(() => '(?, ?, ?, ?)').join(', ');
            const flatValues = bufferData.flatMap(row => [row.timestamp, row.device, row.metric, row.value]);
            this.db.insert(sql, flatValues)
                .then(() => {
                    logger.debug('Inserted', {cnt: bufferData.length})
                })
                .catch(err => {
                    logger.error('Could not insert monitoring data', {err});
                });
        }, 10, 60000);

        deviceManager.waitDevices(['Hallway Motion Sensor'], () => {
            deviceManager.getDevices().forEach(device => {
                device.on('property_changed', (args: any) => {
                    if (args.name === 'update')
                        return;
                    this.buffer.add((new Date()).toISOString().slice(0, 19).replace('T', ' '), device.name, args.name, args.newValue);
                });
            });
        });
    }

    destructor() {
        if (this.buffer.getSize() > 0) {
            this.buffer.flush();
        }

        if (this.buffer.intervalHandler) {
            clearInterval(this.buffer.intervalHandler);
        }
    }
}

export default new Monitoring();
