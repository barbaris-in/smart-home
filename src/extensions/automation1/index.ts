import Extension from "../../core/abstract-extension";
import timers from "../../core/timers";
const logger = require("../../core/logger").logger('automation1');
import deviceManager from "../../core/device-manager";
import Bulb from "../../devices/bulb";
import MotionSensor from "../../devices/motion-sensor";

class AutomationExtension extends Extension {
    getName(): string {
        return "motion-light-automation";
    }

    run(): void {
        logger.debug("Running automation1");
        const automate = function(motionDeviceName: string, lightDeviceName: string, timeout: number = 0) {
            const motionSensor = deviceManager.getDeviceByName(motionDeviceName);

            if (motionSensor instanceof MotionSensor) {
                motionSensor.onMotionDetected((params: any) => {
                    logger.debug('Motion detected', {motionDeviceName, params});
                    timers.clearTimer(motionDeviceName);
                    const light = deviceManager.getDeviceByName(lightDeviceName);
                    if (light instanceof Bulb) {
                        light.turnOn();
                    }
                });
                motionSensor.onMotionStopped((params: any) => {
                    logger.debug('Motion stopped', {motionDeviceName, params});
                    const timer = setTimeout(() => {
                        logger.debug('Light off', {motionDeviceName, params});
                        const light = deviceManager.getDeviceByName(lightDeviceName);
                        if (light instanceof Bulb) {
                            light.turnOff();
                        }
                    }, timeout * 1000);
                    timers.refreshTimer(motionDeviceName, timer);
                });
                // motionSensor.onStatusChanged((params: any) => {
                //     logger.debug('Moving alert', {motionDeviceName, params});
                //     if (undefined === params.occupancy) {
                //         logger.error('Invalid motion sensor status', {motionDeviceName, params});
                //         return;
                //     }
                //
                //     // if occupancy just changed
                //     if (motionSensor.setOccupancy(params.occupancy)) {
                //         if (params.occupancy) {
                //         } else {
                //         }
                //     }
                // });
            }
        }

        automate('Hallway Motion Sensor', 'Hallway Light');
        automate('Bathroom Motion Sensor', 'Bathroom Mirror Light', 60*10);
    }
}

export default new AutomationExtension();
