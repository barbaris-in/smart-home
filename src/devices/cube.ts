import GenericMqttDevice from "./generic-mqtt-device";

export default class Cube extends GenericMqttDevice {
    public readonly type: string = 'cube';

    public onSlide(callback: Function): void {
        this.on('slide', callback);
    }

    public onTap(callback: Function): void {
        this.on('tap', callback);
    }

    public onRotateLeft(callback: Function): void {
        this.on('rotate_left', callback);
    }

    public onRotateRight(callback: Function): void {
        this.on('rotate_right', callback);
    }

    public onFlip90(callback: Function): void {
        this.on('flip90', callback);
    }

    public onFlip180(callback: Function): void {
        this.on('flip180', callback);
    }

    public onShake(callback: Function): void {
        this.on('shake', callback);
    }

    public onFall(callback: Function): void {
        this.on('fall', callback);
    }
}
