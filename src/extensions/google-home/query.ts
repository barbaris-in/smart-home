import {Device} from "../../core/device";
import deviceManager from "../../core/device-manager";
import {OnOff} from "../../core/traits/OnOff";
import {Brightness} from "../../core/traits/Brightness";
import {ColorTemperature} from "../../core/traits/ColorTemperature";
import {SecuritySystem} from "../security-system/SecuritySystem";

const logger = require('../../core/logger').logger('google-home-query');

export default class Query {
    static query(requestId: string, intent: any): any {
        const responseDevices: { [key: string]: any } = {};

        for (const requestDevice of intent.payload.devices) {
            const deviceId = requestDevice.id;
            const responseDevice: any = {};
            try {
                const device: Device = deviceManager.getDevice(deviceId);
                if (device.supports(OnOff)) {
                    responseDevice.on = OnOff(device).getOnOff();
                }
                if (device.supports(Brightness)) {
                    responseDevice.brightness = Brightness(device).getBrightnessPercentage();
                }
                if (device.supports(ColorTemperature)) {
                    responseDevice.color = {temperatureK: ColorTemperature(device).getColorTemperatureKelvin()};
                }
                if (device.supports(SecuritySystem)) {
                    responseDevice.isArmed = SecuritySystem(device).isArmed();
                    responseDevice.currentArmLevel = SecuritySystem(device).getCurrentArmLevel();
                    responseDevice.currentStatusReport = [];
                    // responseDevices.currentStatusReport = [
                    //     {
                    //         "blocking": false,
                    //         "deviceTarget": "alarm_1",
                    //         "priority": 0,
                    //         "statusCode": "lowBattery"
                    //     },
                    //     {
                    //         "blocking": false,
                    //         "deviceTarget": "front_window_1",
                    //         "priority": 1,
                    //         "statusCode": "deviceOpen"
                    //     },
                    //     {
                    //         "blocking": false,
                    //         "deviceTarget": "back_window_2",
                    //         "priority": 1,
                    //         "statusCode": "deviceOpen"
                    //     },
                    //     {
                    //         "blocking": true,
                    //         "deviceTarget": "alarm_2",
                    //         "priority": 0,
                    //         "statusCode": "needsSoftwareUpdate"
                    //     }
                    // ];
                }
                responseDevice.online = true; // todo: check if device is online
                responseDevices[deviceId] = responseDevice;
            } catch (e: any) {
                responseDevice.online = false;
                responseDevice.status = 'ERROR';
                console.log(e);
                responseDevice.errorCode = e.message;
                logger.error('Device not found', {deviceId});
            }
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
