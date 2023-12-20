import {Device} from "../device";
import timers from "../timers";
import Trait from "../trait";
import {Properties} from "../properties";

const logger = require("../logger").logger('onoff');

export class OnOffTrait extends Trait {
    protected onOff: boolean | null = null;

    constructor(
        protected readonly commandCallback: (state: boolean) => Promise<void>,
        protected readonly initializeCallback: (properties: Properties) => Promise<boolean>
    ) {
        super();
    }

    initialize() {
        this.initializeCallback(this.getDevice().properties)
            .then((result: boolean) => {
                this.onOff = result;
            })
            .catch((err: any) => {
                logger.error('Error refreshing OnOffTrait', err);
            });
    }

    turnOn(): void {
        this.onOff = true;
        timers.clearTimer(this.getDevice().name);
        this.commandCallback(this.onOff).catch((err: any) => {
            logger.error('Failed to turn on', err);
        });
    }

    turnOff(): void {
        this.onOff = false;
        timers.clearTimer(this.getDevice().name);
        this.commandCallback(this.onOff).catch((err: any) => {
            logger.error('Failed to turn off', err);
        });
    }

    public turnOffAfter(timeout: number): void {
        const timer = setTimeout(() => {
            this.turnOff();
        }, timeout * 1000);
        timers.refreshTimer(this.getDevice().name, timer);
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
