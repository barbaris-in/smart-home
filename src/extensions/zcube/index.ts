import Extension from "../../core/abstract-extension";
import deviceManager from "../../core/device-manager";
import Device from "../../core/abscract-device";
import Bulb from "../../devices/bulb";
import Cube from "../../devices/cube";
const logger = require("../../core/logger").logger('cube-automation');

class CubeAutomation extends Extension {
    getName(): string {
        return "cube-automation";
    }

    init(): void {
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
                console.log('=======================================================================================', 'brightnessMode', brightnessMode);
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
                console.log('=======================================================================================', 'brightnessMode', brightnessMode);
            })
        }
    }
}

export default new CubeAutomation();
