import {Trait, Device} from "../abscract-device";
import timers from "../timers";

const logger = require("../logger").logger('onoff');

export class OnOffTrait extends Trait {
    protected onOff: boolean | null = null;

    constructor(
        protected readonly commandCallback: (state: boolean) => Promise<void>,
        protected readonly initializeCallback: (properties: { [key: string]: boolean | number | string }) => Promise<boolean>
    ) {
        super();
    }

    initialize() {
        this.initializeCallback(this.getParentDevice().properties)
            .then((result: boolean) => {
                this.onOff = result;
            })
            .catch((err: any) => {
                console.error('Error refreshing OnOffTrait', err);
            });
    }

    turnOn(): Promise<void> {
        this.onOff = true;
        timers.clearTimer(this.getParentDevice().name);
        return this.commandCallback(this.onOff)
    }

    turnOff(): Promise<void> {
        this.onOff = false;
        timers.clearTimer(this.getParentDevice().name);
        return this.commandCallback(this.onOff)
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
        return this.commandCallback(this.onOff);
    }

    getOnOff(): boolean {
        if (null === this.onOff) {
            logger.error('OnOff value not set yet. Using default value', this);
            return false;
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
