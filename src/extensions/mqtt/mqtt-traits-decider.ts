import {OnOffTrait} from "../../core/traits/OnOff";
import mqtt from "./index";
import {BrightnessTrait} from "../../core/traits/Brightness";
import {ColorTemperatureTrait} from "../../core/traits/ColorTemperature";
import {TemperatureSensorTrait} from "../../core/traits/TemperatureSensor";
import Trait from "../../core/trait";
import {Properties} from "../../core/properties";

const logger = require('../../core/logger').logger('mqtt-decider');

export class MqttTraitsDecider {
    protected static sendCommand(deviceName: string, command: {}): void {
        const commandString = JSON.stringify(command);
        mqtt.getMqttClient().publish(`zigbee2mqtt/${deviceName}/set`, commandString);
    }

    public static getTraitsFor(info: any): { [key: string]: Trait } {
        const traits: { [key: string]: Trait } = {};
        if (info.definition && info.definition.exposes && info.definition.exposes) {
            for (const expose of info.definition.exposes) {
                switch (true) {
                    case (expose.type && expose.type === 'light' && expose.features && true):
                        for (const feature of expose.features) {
                            if (feature.property === 'state') {
                                traits['OnOff'] = new OnOffTrait((state: boolean): Promise<void> => {
                                    return new Promise((resolve, reject) => {
                                        MqttTraitsDecider.sendCommand(info.friendly_name, {state: state ? feature.value_on : feature.value_off});
                                        // todo: check if command was successful
                                        resolve();
                                    });
                                }, (properties: Properties): Promise<boolean> => {
                                    return new Promise((resolve, reject): void => {
                                        resolve(properties.get('state') === 'ON');
                                    });
                                });
                            }
                            if (feature.property === 'brightness') {
                                traits['Brightness'] = new BrightnessTrait(
                                    feature.value_min, feature.value_max,
                                    (brightness: number): void => {
                                        MqttTraitsDecider.sendCommand(info.friendly_name, {brightness: brightness});
                                    }, (properties: Properties): Promise<number> => {
                                        return new Promise((resolve, reject): void => {
                                            if (!properties.has('brightness')) {
                                                logger.error('Brightness is not set', {properties});
                                                // reject(new Error('Brightness is not set'));
                                                resolve(Math.round((feature.value_max + feature.value_min) / 2));
                                            }
                                            resolve(<number>properties.get('brightness'));
                                        });
                                    });
                            }
                            if (feature.property === 'color_temp') {
                                traits['ColorTemperature'] = new ColorTemperatureTrait(
                                    feature.value_min, feature.value_max,
                                    (colorTemperature: number): void => {
                                        MqttTraitsDecider.sendCommand(info.friendly_name, {color_temp: colorTemperature});
                                    },
                                    (properties: Properties): Promise<number> => {
                                        return new Promise((resolve, reject): void => {
                                            if (!properties.has('color_temp')) {
                                                logger.error('Color temperature is not set', {properties});
                                                // reject(new Error('Color temperature is not set'));
                                                resolve(Math.round((feature.value_max + feature.value_min) / 2));
                                            }
                                            resolve(<number>properties.get('color_temp'));
                                        });
                                    });
                            }
                        }
                        break;
                    case expose.property && true:
                        if (expose.property === 'temperature') {
                            traits['TemperatureSensor'] = new TemperatureSensorTrait();
                        }
                        if (expose.property === 'humidity') {
                            traits['HumiditySensor'] = new TemperatureSensorTrait();
                        }
                        // properties[expose.property] = new Property(expose.property, expose.type);
                        // todo: register property
                        // console.log('action', info.friendly_name);
                        // if (result['Action']) {
                        //     logger.error('Action already set for device', info);
                        //     throw new Error('Action already set for device');
                        // }
                        // result['Action'] = new ActionTrait(expose.values);
                        break;
                }
            }
        }
        return traits;
    }
}
