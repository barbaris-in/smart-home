import Extension from "../../core/abstract-extension";
const logger = require("../../core/logger").logger('kalyna');
import deviceManager from "../../core/device-manager";
import Bulb from "../../devices/bulb";
import MotionSensor from "../../devices/motion-sensor";
import YeelightWifiStrip from "../../devices/yeelight-wifi-strip";
import Device from "../../core/abscract-device";
import Cube from "../../devices/cube";

class AutomationExtension extends Extension {
    getName(): string {
        return "kalyna-automations";
    }

    init(): void {
        logger.debug("Running kalyna autorations");

        this.motion('Hallway Motion Sensor', 'Hallway Light', 60);
        this.motion('Bathroom Motion Sensor', 'Bathroom Mirror Light', 60*10);
        this.motion('Kitchen Motion Sensor', '0x0000000008016701', 60*10);

        this.desktop();
    }

    protected motion(motionDeviceName: string, lightDeviceName: string, timeout: number = 0) {
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
                if (light instanceof YeelightWifiStrip) {
                    logger.debug('Light off', {lightDeviceName});
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
                if (light instanceof YeelightWifiStrip) {
                    logger.debug('Light off', {lightDeviceName});
                    light.turnOffAfter(timeout);
                }
            });
        }
    }

    protected desktop() {
        const cube: Device | null = deviceManager.getDeviceByName('Cube');
        if (!cube) {
            logger.error('Cube not found');
            return;
        }
        const bulb: Device | null = deviceManager.getDeviceByName('Office Desk Light');
        if (!(bulb instanceof Bulb)) {
            logger.error('Bulb not found');
            return;
        }

        if (cube instanceof Cube) {
            let brightnessMode = true;

            const rotationCallback = (params: any) => {
                if (!params.angle) {
                    logger.error('No angle', params);
                    return;
                }
                const diff = Math.round(params.angle);
                if (brightnessMode) {
                    bulb.setBrightness((bulb.getBrightness() || 0) + diff);
                } else {
                    bulb.setColorTemperature((bulb.getColorTemperature() || 0) + diff);
                }
            };

            cube.onRotateRight(rotationCallback);
            cube.onRotateLeft(rotationCallback);
            cube.onFlip90(() => {
                brightnessMode = !brightnessMode;
                logger.debug('Switched to', {brightnessMode});
            })
        }
    }
}

export default new AutomationExtension();
