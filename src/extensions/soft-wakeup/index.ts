import Extension from "../../core/abstract-extension";
import deviceManager from "../../core/device-manager";
import {Device} from "../../core/abscract-device";
import {Brightness} from "../../core/traits/Brightness";
import {scheduleJob} from "node-schedule";
import {ColorTemperature} from "../../core/traits/ColorTemperature";

const logger = require("../../core/logger").logger('soft-wakeup');

class SoftWakeup extends Extension {
    getName(): string {
        return "soft-wakeup";
    }

    dependsOn(): string[] {
        return ['mqtt'];
    }

    getTomorrowSevenAM() {
        const result = new Date();
        result.setDate(result.getDate() + 1); // Add one day
        result.setHours(7, 0, 0, 0); // Set the time to 7:00 AM
        console.log(result);
        return result;
    }

    setUpWakeUp(): void {
        scheduleJob(this.getTomorrowSevenAM(), (): void => {
            logger.debug("Wake up");
            this.setUpWakeUp();
            const bulb = deviceManager.getDeviceByName('Bedroom Desk Light');
            if (bulb instanceof Device && bulb.supports(Brightness)) {
                const maxBrightness = Brightness(bulb).maxBrightness;
                const minColorTemperature = ColorTemperature(bulb).minColorTemperature;
                let br: number = 0;
                let t: number = ColorTemperature(bulb).maxColorTemperature;
                Brightness(bulb).setBrightness(br);
                ColorTemperature(bulb).setColorTemperature(t);
                const brightnessInterval = setInterval(() => {
                    Brightness(bulb).setBrightness(br);
                    ColorTemperature(bulb).setColorTemperature(t);
                    logger.debug(br);
                    if (br > maxBrightness) {
                        logger.debug('Max Brightness Done');
                        const colorTempInterval = setInterval(() => {
                            ColorTemperature(bulb).setColorTemperature(t);
                            logger.debug(t);
                            if (t < minColorTemperature) {
                                logger.debug('Color Temperature Done');
                                clearInterval(colorTempInterval);
                            }
                        });
                        clearInterval(brightnessInterval);
                    }
                }, 5000);
            }
        });
    }

    init(): void {
        logger.debug("Running soft wakeup", {at: new Date('2023-12-06 10:51')});
        this.setUpWakeUp();
    }
}

export default new SoftWakeup();
