import {Device} from "../../core/device";
import deviceManager from "../../core/device-manager";
import {OnOff} from "../../core/traits/OnOff";
import {Brightness} from "../../core/traits/Brightness";
import {ColorTemperature} from "../../core/traits/ColorTemperature";

const logger = require('../../core/logger').logger('google-home-query');

export default class Query {
    static query(requestId: string, intent: any): any {
        const responseDevices: { [key: string]: any } = {};

        for (const requestDevice of intent.payload.devices) {
            const deviceId = requestDevice.id;
            const device: Device = deviceManager.getDevice(deviceId);

            const responseDevice: any = {};
            if (device.supports(OnOff)) {
                responseDevice.on = OnOff(device).getOnOff();
            }
            if (device.supports(Brightness)) {
                responseDevice.brightness = Brightness(device).getBrightnessPercentage();
            }
            if (device.supports(ColorTemperature)) {
                responseDevice.color = {temperatureK: ColorTemperature(device).getColorTemperatureKelvin()};
            }
            responseDevice.online = true; // todo: check if device is online
            responseDevices[deviceId] = responseDevice;
        }
        return {
            requestId: requestId,
            payload: {
                devices: responseDevices,
            },
        };
    }
}
