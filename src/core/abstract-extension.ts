import {DeviceClassRegistry} from "./device-class-registry";

export default abstract class Extension {
    abstract getName(): string;
    abstract run(): void;
    public registerDeviceClasses(deviceClassRegistry: DeviceClassRegistry): void {
    }
}
