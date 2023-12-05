import {Trait, Device} from "../abscract-device";
import timers from "../timers";

export class OnOffTrait extends Trait {
    protected onOff: boolean | null = null;

    constructor(protected callback: (state: boolean) => Promise<void>) {
        super();
    }

    initOnOff(state: boolean): void {
        this.onOff = state;
    }

    turnOn(): Promise<void> {
        this.onOff = true;
        timers.clearTimer(this.getParentDevice().name);
        return this.callback(this.onOff)
    }

    turnOff(): Promise<void> {
        this.onOff = false;
        timers.clearTimer(this.getParentDevice().name);
        return this.callback(this.onOff)
    }

    public turnOffAfter(timeout: number): Promise<void> {
        return new Promise((resolve, reject) => {
            const timer = setTimeout(() => {
                this.turnOff()
                    .then(() => {
                        resolve()
                    })
                    .catch((err: any) => {
                        reject(err)
                    });
            }, timeout * 1000);
            timers.refreshTimer(this.getParentDevice().name, timer);
        });
    }

    toggle(): Promise<void> {
        this.onOff = !this.onOff;
        return this.callback(this.onOff);
    }

    getOnOff(): boolean {
        if (null === this.onOff) {
            return false;
            // todo: throw new Error('OnOff value not set yet');
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
