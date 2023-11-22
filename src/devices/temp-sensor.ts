import GenericMqttDevice from "./generic-mqtt-device";

const logger = require('../core/logger').logger('devices-temp-sensor');

export default class TempSensor extends GenericMqttDevice {
    public readonly type: string = 'temp-sensor';
    protected humidity: number | null = null;
    protected pressure: number | null = null;
    protected temperature: number | null = null;

    constructor(protected readonly id: string, protected name: string) {
        super(id, name);

        /**
         * {
         *   "battery":100,
         *   "humidity":49.82,
         *   "linkquality":188,
         *   "power_outage_count":10,
         *   "pressure":965.7,
         *   "temperature":18.08,
         *   "voltage":3035
         * }
         */
        this.on('status_changed', (params: any) => {
            if (undefined !== params.humidity) {
                this.setHumidity(params.humidity);
            }
            if (undefined !== params.pressure) {
                this.setPressure(params.pressure);
            }
            if (undefined !== params.temperature) {
                this.setTemperature(params.temperature);
            }
        });
    }

    protected setHumidity(newValue: number) {
        const oldValue = this.humidity;
        const changed = newValue !== oldValue;
        if (changed) {
            logger.debug('', {deviceName: this.name, oldValue, newValue});
            this.emit('humidity_changed', {oldValue, newValue});
        }
    }

    protected setPressure(newValue: number) {
        const oldValue = this.pressure;
        const changed = newValue !== oldValue;
        if (changed) {
            logger.debug('', {deviceName: this.name, oldValue, newValue});
            this.emit('pressure_changed', {oldValue, newValue});
        }
    }

    protected setTemperature(newValue: number) {
        const oldValue = this.temperature;
        const changed = newValue !== oldValue;
        if (changed) {
            logger.debug('', {deviceName: this.name, oldValue, newValue});
            this.emit('temperature_changed', {oldValue, newValue});
        }
    }

    public onHumidityChange(callback: Function): void {
        this.on('humidity_change', callback);
    }

    public onPressureChange(callback: Function): void {
        this.on('pressure_change', callback);
    }

    public onTemperatureChange(callback: Function): void {
        this.on('temperature_change', callback);
    }
}
