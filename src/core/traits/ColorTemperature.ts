import {Trait, Device} from "../abscract-device";

export class ColorTemperatureTrait extends Trait {
    protected colorTemperature: number | null = null;

    constructor(
        public readonly minColorTemperature: number, // 153
        public readonly maxColorTemperature: number, // 370
        protected callback: (colorTemperature: number) => void
    ) {
        super();
    }

    public get minColorTemperatureKelvin(): number {
        return ColorTemperatureTrait.miradToKelvin(this.maxColorTemperature);
    }

    public get maxColorTemperatureKelvin(): number {
        return ColorTemperatureTrait.miradToKelvin(this.minColorTemperature);
    }

    initColorTemperature(newValue: number) {
        this.colorTemperature = newValue;
    }

    initColorTemperatureKelvin(newValue: number) {
        this.colorTemperature = ColorTemperatureTrait.miradToKelvin(newValue);
    }

    public setColorTemperature(colorTemperature: number): void {
        this.colorTemperature = Math.max(this.minColorTemperature, Math.min(this.maxColorTemperature, colorTemperature))
        this.callback(this.colorTemperature);
    }

    public setColorTemperatureKelvin(colorTemperatureKelvin: number): void {
        this.setColorTemperature(ColorTemperatureTrait.kelvinToMirad(colorTemperatureKelvin));
    }

    public getColorTemperature(): number {
        if (null === this.colorTemperature) {
            return 270;
            // todo: throw new Error('Color temperature value not set yet');
        }
        return this.colorTemperature;
    }

    public getColorTemperatureKelvin(): number {
        if (null === this.colorTemperature) {
            return ColorTemperatureTrait.miradToKelvin(270);
            // todo: throw new Error('Color temperature is not set');
        }
        return ColorTemperatureTrait.miradToKelvin(this.colorTemperature);
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
