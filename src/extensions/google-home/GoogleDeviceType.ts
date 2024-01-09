import {Device} from "../../core/device";
import {OnOff} from "../../core/traits/OnOff";
import {Brightness} from "../../core/traits/Brightness";
import {ColorTemperature} from "../../core/traits/ColorTemperature";
import {SecuritySystem} from "../security-system/SecuritySystem";

/**
 * https://developers.home.google.com/cloud-to-cloud/guides
 */
export default class GoogleDeviceType {
    public static deviceToGoogleDevice(device: Device): any {
        const googleDeviceType: string = GoogleDeviceType.getDeviceType(device);
        if (googleDeviceType === 'unknown') return null;
        const traits: string[] = [];
        const attributes: any = {};

        if (device.supports(OnOff)) {
            traits.push('action.devices.traits.OnOff');
        }
        if (device.supports(Brightness)) {
            traits.push('action.devices.traits.Brightness');
        }
        if (device.supports(ColorTemperature)) {
            traits.push('action.devices.traits.ColorSetting');
            attributes.colorTemperatureRange = {
                "temperatureMinK": ColorTemperature(device).minColorTemperatureKelvin,
                "temperatureMaxK": ColorTemperature(device).maxColorTemperatureKelvin,
            }
        }
        if (device.supports(SecuritySystem)) {
            traits.push('action.devices.traits.ArmDisarm');
            traits.push('action.devices.traits.StatusReport');

            attributes.availableArmLevels = {
                levels: [
                    {
                        level_name: "disarmed_key",
                        level_values: [
                            {
                                level_synonym: [
                                    "Disarmed",
                                    "level 0",
                                    "disarmed",
                                    "SL0"
                                ],
                                lang: "en"
                            }
                        ]
                    },
                    {
                        level_name: "home_key",
                        level_values: [
                            {
                                level_synonym: [
                                    "Home and Guarding",
                                    "level 1",
                                    "home",
                                    "SL1"
                                ],
                                lang: "en"
                            }
                        ]
                    },
                    {
                        level_name: "away_key",
                        level_values: [
                            {
                                level_synonym: [
                                    "Away and Guarding",
                                    "level 2",
                                    "away",
                                    "SL2"
                                ],
                                lang: "en"
                            }
                        ]
                    }
                ],
                ordered: true
            };
        }

        return {
            id: device.id,
            type: googleDeviceType,
            traits: traits,
            name: {
                defaultNames: [device.name],
                name: device.name,
                nicknames: [device.name],
            },
            deviceInfo: {
                manufacturer: 'Acme Co', // todo: get manufacturer
                model: 'acme-washer', // todo: get model
                hwVersion: '1.0', // todo: get hardware version
                swVersion: '1.0.1', // todo: get software version
            },
            willReportState: true,
            attributes: attributes,
        };
    }

    public static getDeviceType(device: Device): string {
        if (device.name.toLowerCase().includes('light')) {
            return 'action.devices.types.LIGHT';
        }
        if (device.name.toLowerCase().includes('plug')) {
            return 'action.devices.types.OUTLET';
        }
        if (device.name.toLowerCase().includes('outlet')) {
            return 'action.devices.types.OUTLET';
        }
        if (device.name.toLowerCase().includes('security')) {
            return 'action.devices.types.SECURITYSYSTEM';
        }
        // if (device.name.toLowerCase().includes('temperature') && device.name.toLowerCase().includes('sensor')) {
        //     return 'action.devices.types.SENSOR';
        // }
        return 'unknown';
    }
}
