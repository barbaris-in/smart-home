import Device from "../../core/abscract-device";
import deviceManager from "../../core/device-manager";
import Bulb from "../../devices/bulb";

const logger = require('../../core/logger').logger('google-home-query');

export default class Query {
    static query(requestId: string, intent: any): any {
        const responseDevices = {};

        for (const requestDevice of intent.payload.devices) {
            const deviceId = requestDevice.id;
            const device: Device = deviceManager.getDevice(deviceId);

            switch (true) {
                case device instanceof Bulb:
                    // @ts-ignore
                    responseDevices[deviceId] = {
                        on: (device as Bulb).isTurnedOn(),
                        online: true,
                        brightness: (device as Bulb).getBrightnessPercentage(),
                        color: {
                            temperatureK: (device as Bulb).getColorTemperatureKelvin(),
                        },
                    }
                    break;
                default:
            }
        }
        return {
            requestId: requestId,
            payload: {
                devices: responseDevices,
            },
        };
    }
}
