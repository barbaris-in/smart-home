import {Device} from "../device";
import Trait from "../trait";
import {Properties} from "../properties";

const logger = require("../logger").logger('color-temp');

export class ColorTemperatureTrait extends Trait {
    protected colorTemperature: number | null = null;

    constructor(
        public readonly minColorTemperature: number, // 153
        public readonly maxColorTemperature: number, // 370
        protected readonly commandCallback: (colorTemperature: number) => void,
        protected readonly initializeCallback: (properties: Properties) => Promise<number>
    ) {
        super();
    }

    public initialize(): void {
        this.initializeCallback(this.getDevice().properties)
            .then((result: number) => {
                this.colorTemperature = result;
            })
            .catch((err: any) => {
                console.error('Error refreshing BrightnessTrait', err);
            });
    }

    public get minColorTemperatureKelvin(): number {
        return ColorTemperatureTrait.miradToKelvin(this.maxColorTemperature);
    }

    public get maxColorTemperatureKelvin(): number {
        return ColorTemperatureTrait.miradToKelvin(this.minColorTemperature);
    }

    public setColorTemperature(colorTemperature: number): void {
        this.colorTemperature = Math.max(this.minColorTemperature, Math.min(this.maxColorTemperature, colorTemperature))
        this.commandCallback(this.colorTemperature);
    }

    public setColorTemperatureKelvin(colorTemperatureKelvin: number): void {
        this.setColorTemperature(ColorTemperatureTrait.kelvinToMirad(colorTemperatureKelvin));
    }

    public getColorTemperature(): number {
        if (null === this.colorTemperature) {
            logger('Color temperature is not set. Using average value as default');
            return Math.round((this.maxColorTemperature + this.minColorTemperature) / 2);
        }
        return this.colorTemperature;
    }

    public getColorTemperatureKelvin(): number {
        return ColorTemperatureTrait.miradToKelvin(this.getColorTemperature());
    }

    public static kelvinToMirad(colorTemperatureKelvin: number): number {
        return Math.round(1_000_000 / colorTemperatureKelvin);
    }

    public static miradToKelvin(colorTemperature: number): number {
        return Math.round(1_000_000 / colorTemperature);
    }
}

export function ColorTemperature(device: Device): ColorTemperatureTrait {
    if (!device.traits['ColorTemperature']) {
        throw new Error('ColorTemperature trait in not supported');
    }
    return device.traits['ColorTemperature'] as ColorTemperatureTrait;
}
