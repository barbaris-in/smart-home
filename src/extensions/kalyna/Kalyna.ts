import Extension from "../../core/abstract-extension";
import deviceManager from "../../core/device-manager";
import {Device} from "../../core/device";
import {OnOff} from "../../core/traits/OnOff";
import {Brightness} from "../../core/traits/Brightness";
import {ColorTemperature} from "../../core/traits/ColorTemperature";
import telegramBot from "../telegram-bot";
import {Property} from "../../core/properties";
import { SunDevice } from "../sun/Sun";

const logger = require("../../core/logger").logger('kalyna');

class AutomationExtension extends Extension {
    constructor(name: string) {
        super(name);
        logger.debug("Running kalyna automations");

        this.motion('Hallway Motion Sensor', 'Hallway Light', 60);
        this.presence('Bathroom Presence Sensor', 'Bathroom Mirror Light');
        this.motion('Kitchen Motion Sensor', '0x0000000008016701', 60 * 10);
        this.motion('Bedroom Motion Sensor', 'Bedroom Bed Strip', 10);

        this.desktop();

        this.door();
        this.sun();

        // deviceManager.waitDevices(['Office Desk Light'], () => {
        //     setTimeout(() => {
        //        const officeDeskLight: Device = deviceManager.getDeviceByName('Office Desk Light');
        //         // if (officeDeskLight.supports(OnOff)) {
        //              Brightness(officeDeskLight).setBrightnessPercentage(1);
        //         // }
        //     });
        // });
        //
        // const bulb: Device = deviceManager.getDeviceByName('Bedroom Desk Light');
        // const chatId: number = parseFloat(process.env.TELEGRAM_CHAT_ID || '');
        // bulb.on('wakeup', () => {
        //     telegramBot.sendMessage(chatId, '🌅 Wake up', true);
        // });
    }

    protected motion(motionDeviceName: string, lightDeviceName: string, timeout: number = 0) {
        deviceManager.waitDevices([motionDeviceName, lightDeviceName], () => {
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
        });
    }

    protected presence(sensorDeviceName: string, lightDeviceName: string, dimLateNight: boolean = false) {
        const devices = [sensorDeviceName, lightDeviceName];
        if (dimLateNight) {
            devices.push('Sun');
        }
        deviceManager.waitDevices(devices, () => {
            const motionSensor = deviceManager.getDeviceByName(sensorDeviceName);
            logger.debug('Automate', {motionDeviceName: sensorDeviceName, lightDeviceName});
            motionSensor.on('presence_changed', (newValue: any) => {
                if (newValue) {
                    logger.debug('Presence detected', {motionDeviceName: sensorDeviceName});
                    const light = deviceManager.getDeviceByName(lightDeviceName);
                    if (light.supports(OnOff)) {
                        logger.debug('Light on', {lightDeviceName});
                        if (dimLateNight) {
                            const sun = deviceManager.getDeviceByName('Sun');
                            if (sun instanceof SunDevice) {
                                if (sun.isLateNight()) {
                                    Brightness(light).setBrightness(1);
                                } else {
                                    Brightness(light).setBrightnessPercentage(100);
                                }
                            }
                        } else {
                            OnOff(light).turnOn();
                        }
                    }
                } else {
                    logger.debug('Presence stopped', {motionDeviceName: sensorDeviceName});
                    const light: Device = deviceManager.getDeviceByName(lightDeviceName);
                    if (light.supports(OnOff)) {
                        logger.debug('Light off', {lightDeviceName});
                        OnOff(light).turnOff();
                    }
                }
            });
        });
    }

    protected desktop() {
        deviceManager.waitDevices(['Cube', 'Office Desk Light', 'Tree Plug'], () => {
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
        });
    }

    protected door(): void {
        deviceManager.waitDevices(['Door Sensor'], () => {
            const doorSensor: Device = deviceManager.getDeviceByName('Door Sensor');
            const chatId: number = parseFloat(process.env.TELEGRAM_CHAT_ID || '');
            let doorTimer: NodeJS.Timeout | null = null;
            doorSensor.onPropertyChanged('contact', (newValue: Property) => {
                if (newValue === false) {
                    telegramBot.sendMessage(chatId, '🚪 Door');
                    doorTimer = setTimeout((): void => {
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
        });
    }

    protected sun(): void {
        deviceManager.waitDevices(['Sun'], () => {
            logger.debug('Sun is here');
            const sun: Device = deviceManager.getDeviceByName('Sun');
            const chatId: number = parseFloat(process.env.TELEGRAM_CHAT_ID || '');
            sun.on('sunrise', () => {
                telegramBot.sendMessage(chatId, '☀️ Good morning!');
            });
            sun.on('sunset', () => {
                telegramBot.sendMessage(chatId, "🌜 It's going to be dark soon.");
            });
        });
    }

}

export default new AutomationExtension('kalyna-automations');
