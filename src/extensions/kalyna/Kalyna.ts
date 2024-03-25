import Extension from "../../core/abstract-extension";
import deviceManager from "../../core/device-manager";
import {Device} from "../../core/device";
import {OnOff} from "../../core/traits/OnOff";
import {Brightness} from "../../core/traits/Brightness";
import {ColorTemperature} from "../../core/traits/ColorTemperature";
import telegramBot from "../telegram-bot";
import {Property} from "../../core/properties";
import {SunDevice} from "../sun/Sun";
import {SecuritySystem, SecuritySystemTrait} from "../security-system/SecuritySystem";

const logger = require("../../core/logger").logger('kalyna');

class AutomationExtension extends Extension {
    constructor(name: string) {
        super(name);
        logger.debug("Running kalyna automations");

        this.motion('Hallway Motion Sensor', 'Hallway Light', 60);
        this.motion('Hallway Motion Sensor', 'Hallway Desk Light', 60);
        this.presence('Bathroom Presence Sensor', 'Bathroom Mirror Light');
        this.motion('Kitchen Motion Sensor', '0x0000000008016701', 60 * 10);
        this.motion('Kitchen Motion Sensor', 'Kitchen Light', 60 * 10);
        this.motion('Bedroom Motion Sensor', 'Bedroom Bed Strip', 10);

        this.securitySystem();
        this.desktop();

        this.door();
        this.sun();

        deviceManager.waitDevices(['Hallway Motion Sensor'], () => {
            deviceManager.getDevices().forEach((device: Device) => {
                const l = require("../../core/logger").logger('kalyna-' + device.name.replace(/ /g, '-').toLowerCase().replace(',', ''));
                device.on('property_changed', (args: { name: string, params: any }) => {
                    l.debug('Property changed', args);
                });
            });
        });
    }

    protected securitySystem() {
        deviceManager.waitDevices(['Security System'], () => {
            const securitySystem = deviceManager.getDeviceByName('Security System');

            deviceManager.waitDevices(['Bedroom Motion Sensor', 'Security System'], () => {
                const securitySystem = deviceManager.getDeviceByName('Security System');
                const motionSensor = deviceManager.getDeviceByName('Bedroom Motion Sensor');
                motionSensor.on('occupancy_changed', (newValue: boolean) => {
                });
            });
            deviceManager.waitDevices(['Door Sensor'], () => {
                const doorSensor: Device = deviceManager.getDeviceByName('Door Sensor');
                doorSensor.onPropertyChanged('contact', (newValue: Property) => {
                    securitySystem.emit('alarm', {device: doorSensor.name, property: 'contact', newValue});
                });
            });

            securitySystem.on('alarm', (args: {device: string, property: string, newValue: Property}) => {
                const isArmed = SecuritySystem(securitySystem).isArmed();
                const armLevelNum = SecuritySystem(securitySystem).getCurrentArmLevelNum();
                if (SecuritySystem(securitySystem).isArmed() && SecuritySystem(securitySystem).getCurrentArmLevelNum() >= SecuritySystemTrait.levels['home_key']) {
                    // if (newValue) {
                        this.sendTelegramMessage('🚨 Motion detected');
                        // logger.debug('Motion detected', {motionDeviceName: 'Bathroom Motion Sensor', params});
                        // const light = deviceManager.getDeviceByName('Bathroom Mirror Light');
                        // if (light.supports(OnOff)) {
                        //     logger.debug('Light on', {lightDeviceName: 'Bathroom Mirror Light'});
                        //     OnOff(light).turnOn();
                        // }
                    // } else {
                        // send telegram message with emoji and text
                        // this.sendTelegramMessage('Motion stopped');
                        // this.sendTelegramMessage('Motion stopped');
                        // const light: Device = deviceManager.getDeviceByName('Bathroom Mirror Light');
                        // if (light.supports(OnOff)) {
                        //     logger.debug('Light off', {lightDeviceName: 'Bathroom Mirror Light'});
                        //     OnOff(light).turnOff();
                        // }
                    // }
                }

            });
        });
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
        deviceManager.waitDevices(['Cube', 'Office Desk Light'], () => {
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

    protected sendTelegramMessage(message: string): void {
        const chatId: number = parseFloat(process.env.TELEGRAM_CHAT_ID || '');
        telegramBot.sendMessage(chatId, message);
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
