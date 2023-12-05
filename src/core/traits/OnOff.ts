import {Trait, Device} from "../abscract-device";
import timers from "../timers";

export class OnOffTrait extends Trait {
    protected onOff: boolean | null = null;
    constructor(protected callback: (state: boolean) => void) {
        super();
    }

    initOnOff(state: boolean): void {
        this.onOff = state;
    }

    turnOn(): void {
        this.onOff = true;
        this.callback(this.onOff);
        timers.clearTimer(this.getParentDevice().name);
    }

    turnOff(): void {
        this.onOff = false;
        this.callback(this.onOff);
        timers.clearTimer(this.getParentDevice().name);
    }

    public turnOffAfter(timeout: number): void {
        const timer = setTimeout(() => {
            this.turnOff();
        }, timeout * 1000);
        timers.refreshTimer(this.getParentDevice().name, timer);
    }

    toggle(): void {
        this.onOff = !this.onOff;
        this.callback(this.onOff);
    }

    getOnOff(): boolean {
        if (null === this.onOff) {
            throw new Error('OnOff value not set yet');
        }
        return this.onOff;
    }
}

export function OnOff(device: Device): OnOffTrait {
    if (!device.traits['OnOff']) {
        throw new Error('OnOff trait in not supported');
    }
    return device.traits['OnOff'] as OnOffTrait;
}
