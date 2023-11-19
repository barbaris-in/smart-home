import Extension from "../../core/abstract-extension";
import {getSunrise, getSunset} from "sunrise-sunset-js";
import {scheduleJob} from "node-schedule";
import {eventsEmitter} from "../../core/events-emitter";
import GenericDevice from "../../devices/generic-device";
import deviceManager from "../../core/device-manager";
import Device from "../../core/abscract-device";

const logger = require("../../core/logger").logger('sun');

class Sun extends GenericDevice {

}

class SunExtension extends Extension {
    getName(): string {
        return "sun";
    }

    run(): void {
        logger.debug("Running sun");
        deviceManager.addDevice(new Sun('sun', 'Sun', {}), 'sun');
        this.setupSunEvent();
    }

    setupSunEvent(): void {
        const nextEvent = this.getNextEvent();
        logger.debug('Next sun event', {event: nextEvent});
        scheduleJob(nextEvent.time, (): void => {
            logger.debug('Sun event fired', {event: nextEvent});
            const sun: Device | null = deviceManager.getDeviceByName('Sun');
            if (sun instanceof Sun) {
                sun.emit(nextEvent.type, nextEvent);
            } else {
                logger.error('Sun not found');
            }
            this.setupSunEvent();
        });
    }

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
}

export default new SunExtension();
