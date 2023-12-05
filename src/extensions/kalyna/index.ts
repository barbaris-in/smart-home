import Extension from "../../core/abstract-extension";
import deviceManager from "../../core/device-manager";
import {Device} from "../../core/abscract-device";
import {OnOff} from "../../core/traits/OnOff";
import {Brightness} from "../../core/traits/Brightness";
import {ColorTemperature} from "../../core/traits/ColorTemperature";

const logger = require("../../core/logger").logger('kalyna');

class AutomationExtension extends Extension {
    getName(): string {
        return "kalyna-automations";
    }

    init(): void {
        logger.debug("Running kalyna automations");

        this.motion('Hallway Motion Sensor', 'Hallway Light', 60);
        this.motion('Bathroom Motion Sensor', 'Bathroom Mirror Light', 60 * 10);
        this.motion('Kitchen Motion Sensor', 'Kitchen Light Stripe', 60 * 10);

        this.desktop();
    }

    protected motion(motionDeviceName: string, lightDeviceName: string, timeout: number = 0) {
        const motionSensor = deviceManager.getDeviceByName(motionDeviceName);
        logger.debug('Automate', {motionDeviceName, lightDeviceName, timeout});
        if (motionSensor instanceof Device) {
            motionSensor.on('property_changed', (params: any) => {
                if (params.name !== 'occupancy') {
                    return;
                }
                if (params.newValue) {
                    logger.debug('Motion detected', {motionDeviceName, params});
                    const light = deviceManager.getDeviceByName(lightDeviceName);
                    if (light instanceof Device && light.supports(OnOff)) {
                        logger.debug('Light on', {lightDeviceName});
                        OnOff(light).turnOn();
                    }
                } else {
                    logger.debug('Motion stopped', {motionDeviceName, params});
                    const light = deviceManager.getDeviceByName(lightDeviceName);
                    if (light instanceof Device && light.supports(OnOff)) {
                        logger.debug('Light off', {lightDeviceName});
                        OnOff(light).turnOffAfter(timeout);
                    }
                }
            });
        }
    }

    protected desktop() {
        const cube: Device | null = deviceManager.getDeviceByName('Cube');
        if (!(cube instanceof Device)) {
            logger.error('Cube not found');
            return;
        }
        const bulb: Device | null = deviceManager.getDeviceByName('Office Desk Light');
        if (null === bulb) {
            logger.error('Bulb not found');
            return;
        }
        if (!(bulb.supports(OnOff))) {
            logger.error('Bulb does not support OnOff');
            return;
        }

        let brightnessMode = true;

        const rotationCallback = (params: any) => {
            if (!params.angle) {
                logger.error('No angle', params);
                return;
            }
            const diff = Math.round(params.angle);
            if (brightnessMode) {
                Brightness(bulb).setBrightness(Brightness(bulb).getBrightness() + diff);
            } else {
                ColorTemperature(bulb).setColorTemperature(ColorTemperature(bulb).getColorTemperature() + diff);
            }
        };

        cube.on('rotate_right', rotationCallback);
        cube.on('rotate_left', rotationCallback);
        cube.on('flip90', () => {
            brightnessMode = !brightnessMode;
            logger.debug('Switched to', {mode: brightnessMode ? 'brightness' : 'color temperature'});
        });
    }
}

export default new AutomationExtension();
