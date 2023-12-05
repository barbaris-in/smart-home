import {Trait, Device} from "../abscract-device";

export class BrightnessTrait extends Trait {
    protected brightness: number | null = null;
    protected defaultBrightness: number = 50;

    constructor(protected minBrightness: number, protected maxBrightness: number, protected callback: (brightness: number) => void) {
        super();
    }

    initBrightness(newValue: number) {
        this.brightness = newValue;
    }

    getBrightness(): number {
        if (null === this.brightness) {
            return 50;
            throw new Error('Brightness value not set yet');
        }
        return this.brightness;
    }

    setBrightness(brightness: number): void {
        this.brightness = Math.max(this.minBrightness, Math.min(this.maxBrightness, brightness));
        this.callback(this.brightness);
    }

    getBrightnessPercentage(): number {
        return Math.round((this.getBrightness() || this.defaultBrightness) / this.maxBrightness * 100);
    }

    setBrightnessPercentage(brightness: number): void {
        this.setBrightness(Math.round(brightness / 100 * this.maxBrightness));
    }
}

export function Brightness(device: Device): BrightnessTrait {
    if (!device.traits['Brightness']) {
        throw new Error('Brightness trait in not supported');
    }
    return device.traits['Brightness'] as BrightnessTrait;
}
