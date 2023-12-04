import deviceManager from "../../core/device-manager";
import {OnOff} from "../../core/traits/OnOff";
import {Brightness} from "../../core/traits/Brightness";
import {ColorTemperature} from "../../core/traits/ColorTemperature";

const logger = require('../../core/logger').logger('google-home-execute');

export default class Execute {
    static execute(requestId: string, intent: any): any {
        const result = {
            ids: [],
            status: 'SUCCESS',
            states: {
                online: true,
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
                            if (device.supports(OnOff)) {
                                if (typeof execution.params.on !== 'undefined') {
                                    if (execution.params.on) {
                                        OnOff(device).turnOn();
                                    } else {
                                        OnOff(device).turnOff();
                                    }
                                    Object.assign(result.states, {on: execution.params.on});
                                }
                            }
                            break;
                        case 'action.devices.commands.BrightnessAbsolute':
                            if (device.supports(Brightness)) {
                                if (typeof execution.params.brightness !== 'undefined') {
                                    Brightness(device).setBrightnessPercentage(execution.params.brightness);
                                    Object.assign(result.states, {brightness: execution.params.brightness});
                                }
                            }
                            break;
                        case 'action.devices.commands.ColorAbsolute':
                            if (device.supports(ColorTemperature)) {
                                if (typeof execution.params.color.temperature !== 'undefined') {
                                    ColorTemperature(device).setColorTemperatureKelvin(execution.params.color.temperature);
                                    Object.assign(result.states, {color: {temperatureK: execution.params.color.temperature}});
                                }
                            }
                            break;
                        default:
                            logger.error('Command not implemented', {execution});
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
