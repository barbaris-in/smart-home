import Extension from "../../core/abstract-extension";
import deviceManager from "../../core/device-manager";
import {Device} from "../../core/device";
import {Brightness} from "../../core/traits/Brightness";
import {scheduleJob, RecurrenceRule, Job} from "node-schedule";
import {ColorTemperature} from "../../core/traits/ColorTemperature";

const logger = require("../../core/logger").logger('soft-wakeup');

class SoftWakeup extends Extension {
    private job: Job | null = null;

    setUpWakeUp(): void {
        const rule = new RecurrenceRule();
        rule.hour = 6;
        rule.minute = 30;
        this.job = scheduleJob(rule, (): void => {
            deviceManager.waitDevices(['Office Desk Light'], () => {
                logger.debug("Wake up");
                const bulb: Device = deviceManager.getDeviceByName('Office Desk Light');
                bulb.emit('wakeup');
                if (bulb.supports(Brightness)) {
                    const maxBrightness = Brightness(bulb).maxBrightness;
                    const minColorTemperature = ColorTemperature(bulb).minColorTemperature;
                    let br: number = 1;
                    // let t: number = ColorTemperature(bulb).maxColorTemperature;
                    Brightness(bulb).setBrightness(br);
                    // ColorTemperature(bulb).setColorTemperature(t);
                    const brightnessInterval = setInterval(() => {
                        Brightness(bulb).setBrightness(br++);
                        // ColorTemperature(bulb).setColorTemperature(t);
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
        });
    }

    constructor() {
        super('soft-wakeup');
        this.setUpWakeUp();
    }

    destructor() {
        if (this.job !== null) {
            this.job.cancel();
        }
    }
}

export default new SoftWakeup();
