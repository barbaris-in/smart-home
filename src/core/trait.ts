import {Device} from "./device";

export default abstract class Trait {
    protected device?: Device;

    initialize(): void {
    }

    refresh(): void {
    }

    public setDevice(device: Device) {
        this.device = device;
    }

    public getDevice(): Device {
        if (!this.device) {
            throw new Error('Parent device is not set');
        }
        return this.device;
    }
}
