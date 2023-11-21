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

        if (cube instanceof Cube) {
            cube.onRotateLeft((params: any) => {
                const bulb: Device | null = deviceManager.getDeviceByName('Office Desk Light');
                if (bulb instanceof Bulb) {
                    bulb.turnOff();
                }
            });
            cube.onRotateRight((params: any) => {
                const bulb: Device | null = deviceManager.getDeviceByName('Office Desk Light');
                if (bulb instanceof Bulb) {
                    bulb.turnOn();
                }
            });
            // cube.on('slide', (params: any) => {
            //     const bulb: Device | null = devices.getDeviceByName('Office Desk Light');
            //     if (bulb instanceof Bulb) {
            //         bulb.turnOff();
            //     }
            // });
        }
    }
}

export default new CubeAutomation();
