import {Device} from "../../core/abscract-device";

export default class GoogleDeviceType {
    public static getDeviceType(device: Device): string {
        if (device.name.toLowerCase().includes('light')) {
            return 'action.devices.types.LIGHT';
        }
        return 'unknown';
    }
}