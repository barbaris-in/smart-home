import Extension from "../../core/abstract-extension";
const logger = require("../../core/logger").logger('motion-light-automation');
import deviceManager from "../../core/device-manager";
import Bulb from "../../devices/bulb";
import MotionSensor from "../../devices/motion-sensor";

class AutomationExtension extends Extension {
    getName(): string {
        return "motion-light-automation";
    }

    init(): void {
        logger.debug("Running automation1");
        const automate = function(motionDeviceName: string, lightDeviceName: string, timeout: number = 0) {
            const motionSensor = deviceManager.getDeviceByName(motionDeviceName);
            logger.debug('Automate', {motionDeviceName, lightDeviceName, timeout});
            if (motionSensor instanceof MotionSensor) {
                motionSensor.onMotionDetected((params: any) => {
                    logger.debug('Motion detected', {motionDeviceName, params});
                    const light = deviceManager.getDeviceByName(lightDeviceName);
                    if (light instanceof Bulb) {
                        logger.debug('Light on', {lightDeviceName});
                        light.turnOn();
                    }
                });

                motionSensor.onMotionStopped((params: any) => {
                    logger.debug('Motion stopped', {motionDeviceName, params});
                    const light = deviceManager.getDeviceByName(lightDeviceName);
                    if (light instanceof Bulb) {
                        logger.debug('Light off', {lightDeviceName});
                        light.turnOffAfter(timeout);
                    }
                });
            }
        }

        automate('Hallway Motion Sensor', 'Hallway Light', 60);
        automate('Bathroom Motion Sensor', 'Bathroom Mirror Light', 60*10);
    }
}

export default new AutomationExtension();
