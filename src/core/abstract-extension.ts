import {DeviceClassRegistry} from "./device-class-registry";

export default abstract class Extension {
    abstract getName(): string;

    abstract init(): void;

    public registerDeviceClasses(deviceClassRegistry: DeviceClassRegistry): void {
    }

    public dependsOn(): string[] {
        return [];
    }
}
