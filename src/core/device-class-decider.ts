export default class DeviceClassDecider {
    public static getDeviceClass(deviceInfo: any): string {
        switch (deviceInfo.definition.description) {
            case 'Aqara smart LED bulb':
                return 'bulb';
            case 'Mi/Aqara smart home cube':
                return 'cube';
            case 'MiJia door & window contact sensor':
                return 'door-window-sensor';
            case 'Aqara water leak sensor':
                return 'water-leak-sensor';
            case 'Aqara double key wireless wall switch (2018 model)':
                return 'wall-switch';
            case 'MiJia wireless switch':
                return 'switch';
            case 'Aqara temperature, humidity and pressure sensor':
                return 'temp-sensor';
            case 'Aqara human body movement and illuminance sensor':
            case 'MiJia human body movement sensor':
                return 'motion-sensor';
            default:
                return 'generic-mqtt-device';
        }
    }
}
