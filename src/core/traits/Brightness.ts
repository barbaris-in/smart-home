import Trait from "../trait";
import {Properties} from "../properties";
import {Device} from "../device";

const logger = require("../logger").logger('brightness');

export class BrightnessTrait extends Trait {
    protected brightness: number | null = null;
    protected defaultBrightness: number = 50;

    constructor(
        public readonly minBrightness: number,
        public readonly maxBrightness: number,
        protected readonly commandCallback: (brightness: number) => void,
        protected readonly initializeCallback: (properties: Properties) => Promise<number>
    ) {
        super();
    }

    initialize() {
        this.initializeCallback(this.getDevice().properties)
            .then((result: number) => {
                this.brightness = result;
            })
            .catch((err: any) => {
                console.error('Error refreshing BrightnessTrait', err);
            });
    }

    getBrightness(): number {
        if (null === this.brightness) {
            logger.error('Brightness value not set yet. Using default value');
            return Math.round((this.maxBrightness + this.minBrightness) / 2);
        }
        return this.brightness;
    }

    setBrightness(brightness: number): void {
        this.brightness = Math.max(this.minBrightness, Math.min(this.maxBrightness, brightness));
        this.commandCallback(this.brightness);
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
