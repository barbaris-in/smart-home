import Extension from "../../core/abstract-extension";
import deviceManager from "../../core/device-manager";
import {Device} from "../../core/device";
import {OnOff} from "../../core/traits/OnOff";
import {Brightness} from "../../core/traits/Brightness";
import {ColorTemperature} from "../../core/traits/ColorTemperature";
import telegramBot from "../telegram-bot";
import {Property} from "../../core/properties";

const logger = require("../../core/logger").logger('kalyna');

class AutomationExtension extends Extension {
    getName(): string {
        return "kalyna-automations";
    }

    dependsOn(): string[] {
        return ['sun', 'telegram-bot', 'mqtt', 'yeelight'];
    }

    init(): void {
        logger.debug("Running kalyna automations");

        this.motion('Hallway Motion Sensor', 'Hallway Light', 60);
        this.motion('Bathroom Motion Sensor', 'Bathroom Mirror Light', 60 * 10);
        this.motion('Kitchen Motion Sensor', '0x0000000008016701', 60 * 10);

        this.desktop();

        this.door();
        this.sun();
    }

    protected motion(motionDeviceName: string, lightDeviceName: string, timeout: number = 0) {
        const motionSensor = deviceManager.getDeviceByName(motionDeviceName);
        logger.debug('Automate', {motionDeviceName, lightDeviceName, timeout});
        motionSensor.on('property_changed', (params: any) => {
            if (params.name !== 'occupancy') {
                return;
            }
            if (params.newValue) {
                logger.debug('Motion detected', {motionDeviceName, params});
                const light = deviceManager.getDeviceByName(lightDeviceName);
                if (light.supports(OnOff)) {
                    logger.debug('Light on', {lightDeviceName});
                    OnOff(light).turnOn();
                }
            } else {
                logger.debug('Motion stopped', {motionDeviceName, params});
                const light: Device = deviceManager.getDeviceByName(lightDeviceName);
                if (light.supports(OnOff)) {
                    logger.debug('Light off', {lightDeviceName});
                    OnOff(light).turnOffAfter(timeout);
                }
            }
        });
    }

    protected desktop() {
        const cube: Device = deviceManager.getDeviceByName('Cube');
        const bulb: Device = deviceManager.getDeviceByName('Office Desk Light');

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
        cube.on('slide', () => {
            OnOff(<Device>deviceManager.getDeviceByName('Tree Plug')).toggle()
                .then(() => {
                    logger.debug('Toggled');
                })
                .catch((e) => {
                    logger.error(e);
                });
        });
    }

    protected door(): void {
        const doorSensor: Device = deviceManager.getDeviceByName('Door Sensor');
        const chatId: number = parseFloat(process.env.TELEGRAM_CHAT_ID || '');
        let doorTimer: NodeJS.Timeout | null = null;
        doorSensor.onPropertyChanged('contact', (newValue: Property) => {
            if (newValue === false) {
                telegramBot.sendMessage(chatId, '🚪 Door');
                setTimeout((): void => {
                    telegramBot.sendMessage(chatId, '🚪 Door still open');
                    doorTimer = null;
                }, 1000 * 60 * 2);
            } else {
                if (doorTimer) {
                    clearTimeout(doorTimer);
                    doorTimer = null;
                } else {
                    telegramBot.sendMessage(chatId, '🚪 Door closed');
                }
            }
        });
    }

    protected sun(): void {
        const chatId: number = parseFloat(process.env.TELEGRAM_CHAT_ID || '');
        const sun: Device = deviceManager.getDeviceByName('Sun');
        sun.on('sunrise', () => {
            telegramBot.sendMessage(chatId, '☀️ Good morning!');
        });
        sun.on('sunset', () => {
            telegramBot.sendMessage(chatId, "🌜 It's going to be dark soon.");
        });
    }
}

export default new AutomationExtension();
