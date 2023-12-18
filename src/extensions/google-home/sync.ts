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
        for (const deviceId in devices) {
            const googleDevice = GoogleDeviceType.deviceToGoogleDevice(<Device>devices.get(deviceId));
            if (null === googleDevice) {
                continue;
            }
            responseDevices.push();
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
