import deviceManager from "./device-manager";

export default abstract class Extension {
    abstract getName(): string;

    loadDevices(): void {
    }

    abstract init(): void;

    public dependsOn(): string[] {
        return [];
    }
}
