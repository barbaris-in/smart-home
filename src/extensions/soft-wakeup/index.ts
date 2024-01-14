import Extension from "../../core/abstract-extension";
import deviceManager from "../../core/device-manager";
import {Device} from "../../core/device";
import {Brightness} from "../../core/traits/Brightness";
import {scheduleJob, RecurrenceRule, Job} from "node-schedule";
import {ColorTemperature} from "../../core/traits/ColorTemperature";

const logger = require("../../core/logger").logger('soft-wakeup');

class SoftWakeup extends Extension {
    private job: Job | null = null;
    getName(): string {
        return "soft-wakeup";
    }

    dependsOn(): string[] {
        return ['mqtt'];
    }

    setUpWakeUp(): void {
        const rule = new RecurrenceRule();
        rule.hour = 7;
        rule.minute = 0;
        this.job = scheduleJob(rule, (): void => {
            logger.debug("Wake up");
            const bulb: Device = deviceManager.getDeviceByName('Bedroom Desk Light');
            bulb.emit('wakeup');
            if (bulb.supports(Brightness)) {
                const maxBrightness = Brightness(bulb).maxBrightness;
                const minColorTemperature = ColorTemperature(bulb).minColorTemperature;
                let br: number = 0;
                let t: number = ColorTemperature(bulb).maxColorTemperature;
                Brightness(bulb).setBrightness(br);
                ColorTemperature(bulb).setColorTemperature(t);
                const brightnessInterval = setInterval(() => {
                    Brightness(bulb).setBrightness(br++);
                    ColorTemperature(bulb).setColorTemperature(t);
                    logger.debug(br);
                    if (br > maxBrightness) {
                        logger.debug('Max Brightness Done');
                        // const colorTempInterval = setInterval(() => {
                        //     ColorTemperature(bulb).setColorTemperature(t);
                        //     logger.debug(t);
                        //     if (t < minColorTemperature) {
                        //         logger.debug('Color Temperature Done');
                        //         clearInterval(colorTempInterval);
                        //     }
                        // });
                        clearInterval(brightnessInterval);
                    }
                }, 5000);
            }
        });
    }

    init(): void {
        this.setUpWakeUp();
    }

    unload() {
        if (this.job !== null) {
            this.job.cancel();
        }
    }
}

export default new SoftWakeup();
