import Extension from "../../core/abstract-extension";
import {getSunrise, getSunset} from "sunrise-sunset-js";
import {Job, scheduleJob} from "node-schedule";
import deviceManager from "../../core/device-manager";
import {Device} from "../../core/device";

const logger = require("../../core/logger").logger('sun');

export class SunDevice extends Device {
    public readonly type: string = 'sun';

    isLateNight(): boolean {
        const now: Date = new Date();

        return now.getHours() >= 0 && now.getHours() <= 6;
    }
}

class SunExtension extends Extension {
    private job: Job | null = null;

    constructor(name: string) {
        super(name);
        deviceManager.registerDevice(new SunDevice('sun', 'Sun'), 'sun');
        this.setupSunEvent();
    }

    setupSunEvent(): void {
        const nextEvent = this.getNextEvent();
        logger.debug('Next sun event', {event: nextEvent});
        this.job = scheduleJob(nextEvent.time, (): void => {
            logger.debug('Sun event fired', {event: nextEvent});
            const sun: Device | null = deviceManager.getDeviceByName('Sun');
            if (sun instanceof SunDevice) {
                sun.emit(nextEvent.type, nextEvent);
            } else {
                logger.error('Sun not found');
            }
            this.setupSunEvent();
        });
    }
    //
    // getNextEventDummy(type: string): any {
    //     const now = new Date();
    //     now.setSeconds(now.getSeconds() + 10);
    //     return {
    //         type: type,
    //         time: now
    //     };
    // }
    //
    getNextEvent(): any {
        const now: Date = new Date();
        const location: string[] = (process.env.LOCATION || '49.8397,24.0297').split(',');
        const lat: number = parseFloat(location[0]), lon: number = parseFloat(location[1]);
        const nextEvent = {
            type: 'sunrise',
            time: getSunrise(lat, lon)
        };

        if (now > nextEvent.time) {
            nextEvent.type = 'sunset';
            nextEvent.time = getSunset(lat, lon)
        }

        if (now > nextEvent.time) {
            nextEvent.type = 'sunrise';
            now.setDate(now.getDate() + 1);
            nextEvent.time = getSunrise(lat, lon, now)
        }

        return nextEvent;
    }

    destructor(): void {
        if (this.job !== null) {
            this.job.cancel();
        }
    }
}

export default new SunExtension('Sun');
