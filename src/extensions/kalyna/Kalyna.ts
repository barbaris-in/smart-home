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
import Sound from "../../core/sound";

const logger = require("../../core/logger").logger('kalyna');

class KalynaAutomation extends Extension {
    constructor(name: string) {
        super(name);
        logger.debug("Running kalyna automations");
        Sound.play('/etc/sound/login.wav').catch((e: any) => {
            logger.error(e);
        });
        deviceManager.waitDevices(['Bedroom Desk Switch'], () => {
            const switchDevice = deviceManager.getDeviceByName('Bedroom Desk Switch');
            switchDevice.on('single', (args: any) => {
                Sound.play('/etc/sound/startup.wav').catch((e: any) => {
                    logger.error(e);
                });
            });
        });

        this.motion('Hallway Motion Sensor', 'Hallway Main Light', 60);
        this.motion('Hallway Motion Sensor', 'Hallway Desk Light', 60);
        this.motion('Living Room Motion Sensor', 'Living Room Wall Light 1', 0);
        this.presence('Bathroom Presence Sensor', 'Bathroom Mirror Light');
        this.motion('Kitchen Motion Sensor', '0x0000000008016701', 60 * 10);
        this.motion('Kitchen Motion Sensor', 'Kitchen Main Light', 60 * 10);
        this.livingRoom();
        this.kitchen();
        // this.motion('Living Room Motion Sensor', 'Bedroom Bed Strip', 10);

        this.securitySystem();
        this.desktop();

        this.door();
        this.sun();

        this.water();
        this.smoke();
        this.gas();
        this.sendTelegramMessage('🤖 Kalyna is running');
    }

    protected water() {
        deviceManager.waitDevices(['Bathroom Water Leak Sensor'], () => {
            const waterSensor = deviceManager.getDeviceByName('Bathroom Water Leak Sensor');
            waterSensor.onPropertyChanged('water_leak', (args: any) => {
                if (args.newValue) {
                    this.sendTelegramMessage('⚠️');
                    this.sendTelegramMessage('💧 Water leak detected');
                } else {
                    if (args.oldValue !== null && args.oldValue === true) {
                        this.sendTelegramMessage('💧 Water leak stopped');
                    }
                }
            });
        });
    }

    protected smoke() {
        deviceManager.waitDevices(['Smoke Sensor'], () => {
            const smokeDetector = deviceManager.getDeviceByName('Smoke Sensor');
            smokeDetector.onPropertyChanged('smoke', (args: any) => {
                if (args.newValue) {
                    this.sendTelegramMessage('⚠️');
                    this.sendTelegramMessage('🔥 Smoke detected');
                } else {
                    if (args.oldValue !== null && args.oldValue === true) {
                        this.sendTelegramMessage('🔥 Smoke stopped');
                    }
                }
            });
        });
    }

    protected gas() {
        deviceManager.waitDevices(['Gas Sensor'], () => {
            const gasDetector = deviceManager.getDeviceByName('Gas Sensor');
            gasDetector.onPropertyChanged('gas', (args: any) => {
                if (args.newValue) {
                    this.sendTelegramMessage('⚠️');
                    this.sendTelegramMessage('💨 Gas detected');
                } else {
                    if (args.oldValue !== null && args.oldValue === true) {
                        this.sendTelegramMessage('💨 Gas stopped');
                    }
                }
            });
        });
    }

    protected securitySystem() {
        deviceManager.waitDevices(['Security System'], () => {
            const securitySystem = deviceManager.getDeviceByName('Security System');

            deviceManager.waitDevices(['Living Room Motion Sensor', 'Security System'], () => {
                const securitySystem = deviceManager.getDeviceByName('Security System');
                const motionSensor = deviceManager.getDeviceByName('Living Room Motion Sensor');
                motionSensor.on('occupancy_changed', (args: {}) => {
                });
            });
            deviceManager.waitDevices(['Door Sensor'], () => {
                const doorSensor: Device = deviceManager.getDeviceByName('Door Sensor');
                doorSensor.onPropertyChanged('contact', (args: any) => {
                    securitySystem.emit('alarm', {device: doorSensor.name, property: 'contact', newValue: args.newValue});
                });
            });

            securitySystem.on('alarm', (args: { device: string, property: string, newValue: Property }) => {
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
            motionSensor.on('presence_changed', (args: any) => {
                const newValue = args.newValue;
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
            let doorTimer: NodeJS.Timeout | null = null;
            doorSensor.onPropertyChanged('contact', (args: any) => {
                if (args.newValue === false) {
                    this.sendTelegramMessage('🚪 Door');
                    doorTimer = setTimeout((): void => {
                        this.sendTelegramMessage('🚪 Door still open');
                        doorTimer = null;
                    }, 1000 * 60 * 2);
                } else {
                    if (doorTimer) {
                        clearTimeout(doorTimer);
                        doorTimer = null;
                    } else {
                        if (args.oldValue !== null && args.oldValue === false) {
                            this.sendTelegramMessage('🚪 Door closed');
                        }
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

    private kitchen() {
        deviceManager.waitDevices(['Kitchen Switch'], () => {
            deviceManager.waitDevices(['Kitchen Main Light'], () => {
                const wallSwitch = deviceManager.getDeviceByName('Kitchen Switch');
                wallSwitch.on('single', (args: any) => {
                    const light = deviceManager.getDeviceByName('Kitchen Main Light');
                    if (light.supports(OnOff)) {
                        OnOff(light).toggle();
                    }
                });
            });
        });
    }

    private livingRoom() {
        deviceManager.waitDevices(['Living Room Wall Switch'], () => {
            const wallSwitch = deviceManager.getDeviceByName('Living Room Wall Switch');

            deviceManager.waitDevices(['Living Room Main Light'], () => {
                wallSwitch.on('single_left', (args: any) => {
                    const light = deviceManager.getDeviceByName('Living Room Main Light');
                    if (light.supports(OnOff)) {
                        OnOff(light).toggle();
                    }
                });
            });
            deviceManager.waitDevices(['Living Room Wall Light 1'], () => {
                wallSwitch.on('single_right', (args: any) => {
                    const light = deviceManager.getDeviceByName('Living Room Wall Light 1');
                    if (light.supports(OnOff)) {
                        OnOff(light).toggle();
                    }
                });
            });
        });

        deviceManager.waitDevices(['Living Room Motion Sensor'], () => {
            const motionSensor = deviceManager.getDeviceByName('Living Room Motion Sensor');
            deviceManager.waitDevices(['Living Room Main Light'], () => {
                const light = deviceManager.getDeviceByName('Living Room Main Light');
                motionSensor.on('occupancy_changed', (args: any) => {
                    if (args.newValue) {
                    } else {
                        if (light.supports(OnOff)) {
                            OnOff(light).turnOff();
                        }
                    }
                });
            });
            // deviceManager.waitDevices(['Living Room Wall Light 1'], () => {
            //     const light = deviceManager.getDeviceByName('Living Room Wall Light 1');
            //     motionSensor.on('occupancy_changed', (args: any) => {
            //         if (args.newValue) {
            //         } else {
            //             if (light.supports(OnOff)) {
            //                 OnOff(light).turnOff();
            //             }
            //         }
            //     });
            // });
        })
    }
}

export default new KalynaAutomation('kalyna-automations');
