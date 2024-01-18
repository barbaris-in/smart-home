process.env.MONITORING_DATABASE_API_URL = 'test';
process.env.MONITORING_DATABASE_TOKEN = 'test';

import {MonitoringBuffer} from "./index";

describe('Monitoring buffer', () => {
    test('Overflow', () => {
        const buffer = new MonitoringBuffer((data: { timestamp: number, device: string, metric: string, value: any }[]): void => {
            const sql = 'INSERT INTO monitoring (timestamp, device, metric, value) VALUES ' +
                data.map(() => '(?, ?, ?, ?)').join(', ');
            const flatValues = data.flatMap(row => [row.timestamp, row.device, row.metric, row.value]);
        }, 10);

        for (let i = 0; i < 20; i++) {
            buffer.add((new Date()).toISOString().slice(0, 19).replace('T', ' '), 'device', 'metric', i);
        }
        expect(buffer.getSize()).toEqual(0);
    });
});
