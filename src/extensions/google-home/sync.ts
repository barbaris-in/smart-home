import deviceManager from "../../core/device-manager";
import {Device} from "../../core/device";
import GoogleDeviceType from "./GoogleDeviceType";

const logger = require('../../core/logger').logger('google-home-sync');

export default class Sync {
    /**
     * https://developers.home.google.com/cloud-to-cloud/traits
     */
    static sync(requestId: string, userId: string): any {
        const responseDevices: any[] = [];
        const devices = deviceManager.getDevices();
        devices.forEach((device: Device, deviceId: string) => {
            logger.debug('Synchronizing device', {deviceId: deviceId});
            const googleDevice = GoogleDeviceType.deviceToGoogleDevice(device);
            if (null === googleDevice) {
                logger.debug('Device not supported', {deviceId: deviceId});
                return;
            }
            responseDevices.push(googleDevice);
        });

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
