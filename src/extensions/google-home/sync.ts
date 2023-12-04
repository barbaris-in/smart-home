import deviceManager from "../../core/device-manager";
import {Device} from "../../core/abscract-device";
import GoogleDeviceType from "./GoogleDeviceType";
import {OnOff} from "../../core/traits/OnOff";
import {Brightness} from "../../core/traits/Brightness";
import {ColorTemperature} from "../../core/traits/ColorTemperature";

const logger = require('../../core/logger').logger('google-home-sync');

export default class Sync {
    static sync(requestId: string, userId: string): any {
        const responseDevices: any[] = [];
        const devices = deviceManager.getDevices();
        for (const deviceId in devices) {
            const device: Device = devices[deviceId].device;
            const deviceType: string = GoogleDeviceType.getDeviceType(device);
            if (deviceType === 'unknown') continue;
            const traits: string[] = [];
            const attributes: any = {};
            if (device.supports(OnOff)) {
                traits.push('action.devices.traits.OnOff');
            }
            if (device.supports(Brightness)) {
                traits.push('action.devices.traits.Brightness');
            }
            if (device.supports(ColorTemperature)) {
                traits.push('action.devices.traits.ColorSetting');
                // todo: is the light color temperature adjustable?
                attributes.colorTemperatureRange = {
                    "temperatureMinK": ColorTemperature(device).minColorTemperatureKelvin,
                    "temperatureMaxK": ColorTemperature(device).maxColorTemperatureKelvin,
                }
            }
            responseDevices.push({
                id: deviceId,
                type: deviceType,
                traits: traits,
                name: {
                    defaultNames: [device.name],
                    name: device.name,
                    nicknames: [device.name],
                },
                deviceInfo: {
                    manufacturer: 'Acme Co', // todo: get manufacturer
                    model: 'acme-washer', // todo: get model
                    hwVersion: '1.0', // todo: get hardware version
                    swVersion: '1.0.1', // todo: get software version
                },
                willReportState: true,
                attributes: attributes,
            });
        }

        logger.info('Synchronizing', {devices: responseDevices});
        return {
            requestId: requestId,
            payload: {
                agentUserId: userId,
                devices: responseDevices,
            }
        }
    }
}
