import deviceManager from "../../core/device-manager";
import Device from "../../core/abscract-device";
import Bulb from "../../devices/bulb";

const logger = require('../../core/logger').logger('google-home-sync');

export default class Sync {
    static sync(requestId: string, userId: string): any {
        const responseDevices: any[] = [];
        const devices = deviceManager.getDevices();
        for (const deviceId in devices) {
            const device: Device = devices[deviceId].device;
            switch (true) {
                case device instanceof Bulb:
                    responseDevices.push({
                        id: deviceId,
                        type: 'action.devices.types.LIGHT',
                        traits: [
                            'action.devices.traits.OnOff',
                            'action.devices.traits.ColorSetting',
                            'action.devices.traits.Brightness',
                        ],
                        name: {
                            defaultNames: [device.getName()],
                            name: device.getName(),
                            nicknames: [device.getName()],
                        },
                        deviceInfo: {
                            manufacturer: 'Acme Co',
                            model: 'acme-washer',
                            hwVersion: '1.0',
                            swVersion: '1.0.1',
                        },
                        willReportState: true,
                        attributes: {
                            // todo: is the light color temperature adjustable?
                            colorTemperatureRange: {
                                // todo: get max and min color temperature from device
                                "temperatureMinK": 2000,
                                "temperatureMaxK": 9000
                            },
                        },
                    });
                    break;
                default:
                    logger.warn('Unsupported device type', {device: device});
            }
        }
        // logger.info('Synchronizing', {devices: responseDevices});
        return {
            requestId: requestId,
            payload: {
                agentUserId: userId,
                devices: responseDevices,
            },
        }
    }
}
