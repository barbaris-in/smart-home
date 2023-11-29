import deviceManager from "../../core/device-manager";
import Bulb from "../../devices/bulb";

const logger = require('../../core/logger').logger('google-home-execute');

export default class Execute {
    static execute(requestId: string, intent: any): any {
        const result = {
            ids: [],
            status: 'SUCCESS',
            states: {
                online: true,
                // on: true,
            },
        };

        for (const command of intent.payload.commands) {
            for (const requestDevice of command.devices) {
                for (const execution of command.execution) {
                    // @ts-ignore
                    result.ids.push(requestDevice.id);
                    const device = deviceManager.getDevice(requestDevice.id);

                    switch (execution.command) {
                        case 'action.devices.commands.OnOff':
                            if (device instanceof Bulb) {
                                if (typeof execution.params.on !== 'undefined') {
                                    if (execution.params.on) {
                                        device.turnOn();
                                    } else {
                                        device.turnOff();
                                    }
                                    Object.assign(result.states, {on: execution.params.on});
                                }
                            }
                            break;
                        case 'action.devices.commands.BrightnessAbsolute':
                            if (device instanceof Bulb) {
                                if (typeof execution.params.brightness !== 'undefined') {
                                    device.setBrightnessPercentage(execution.params.brightness);
                                    Object.assign(result.states, {brightness: execution.params.brightness});
                                }
                            }
                            break;
                        case 'action.devices.commands.ColorAbsolute':
                            if (device instanceof Bulb) {
                                if (typeof execution.params.color.temperature !== 'undefined') {
                                    device.setColorTemperatureKelvin(execution.params.color.temperature);
                                    Object.assign(result.states, {color: {temperatureK: execution.params.color.temperature}});
                                }
                            }
                            break;
                        default:
                            logger.error('Unknown command', {execution});
                    }
                }
            }
        }

        return {
            requestId: requestId,
            payload: {
                commands: [result],
            },
        };
    }
}
