import actions from './actions';
import {Properties, Property} from "./properties";
import Trait from "./trait";
import {Brightness} from "./traits/Brightness";
import {OnOff} from "./traits/OnOff";
import {ColorTemperature} from "./traits/ColorTemperature";

export class Device {
    protected info: any;
    public readonly properties: Properties = new Properties();

    constructor(public readonly id: string, public name: string, public readonly traits: { [key: string]: Trait } = {}) {
        for (const trait of Object.values(traits)) {
            (trait as Trait).setDevice(this);
        }
    }

    public supports(traitFunction: Function): boolean {
        return this.traits[traitFunction.name] && true;
    }

    setProperty(name: string, newValue: Property): void {
        switch (name) {
            case 'state':
                if (this.supports(OnOff)) {
                    OnOff(this).initOnOff(newValue === 'ON' || newValue === true);
                }
                break;
            case 'brightness':
                if (this.supports(Brightness)) {
                    Brightness(this).initBrightness(newValue as number);
                }
                break;
            // case 'color':
            //     newValue = newValue;
            //     break;
            case 'color_temp':
                if (this.supports(ColorTemperature)) {
                    ColorTemperature(this).initColorTemperature(newValue as number);
                }
                break;
            // case 'temperature':
            //     newValue = parseInt(newValue, 10);
            //     break;
            // case 'humidity':
            //     newValue = parseInt(newValue, 10);
            //     break;
            // case 'pressure':
            //     newValue = parseInt(newValue, 10);
            //     break;
            // case 'motionDetected':
            //     newValue = newValue === 'true' || newValue === true;
            //     break;
            // case 'open':
            //     newValue = newValue === 'true' || newValue === true;
            //     break;
            // case 'lock':
            //     newValue = newValue === 'true' || newValue === true;
            //     break;
            // case 'online':
            //     newValue = newValue === 'true' || newValue === true;
            //     break;
            // case 'reachable':
            //     newValue = newValue === 'true' || newValue === true;
            //     break;
            // case 'batteryLevel':
            //     newValue = parseInt(newValue, 10);
            //     break;
            // case 'charging':
            //     newValue = newValue === 'true' || newValue === true;
            //     break;
            // case 'lowBattery':
            //     newValue = newValue === 'true' || newValue === true;
            //     break;
            // case 'smokeDetected':
            //     newValue = newValue === 'true' || newValue === true;
            //     break;
            // case 'carbonMonoxideDetected':
            //     newValue = newValue === 'true' || newValue === true;
            //     break;
            // case 'carbonDioxideDetected':
            //     newValue = newValue === 'true' || newValue === true;
            //     break;
            // case 'contactSensor':
            //     newValue = newValue === 'true' || newValue === true;
            //     break;
            // case 'leakDetected':
            //     newValue = newValue === 'true' || newValue === true;
            //     break;
            // case 'occupancy':
            //     newValue = newValue === 'true' || newValue === true;
            //     break;
            // case 'vibration':
            //     newValue = newValue === 'true' || newValue === true;
            //     break;
            // case 'tamper':
            //     newValue = newValue === 'true' || newValue === true;
            //     break;
            // case 'waterDetected':
            //     newValue = newValue === 'true' || newValue === true;
            //     break;
            // default:
            //     break;
        }
        if (!this.properties.has(name)) {
        //     todo: new property
        } else {
            const oldValue = this.properties.get(name);
            if (oldValue !== newValue) {
                this.emit('property_changed', {name, newValue});
                this.emit(name + '_changed', newValue);
            }
        }
        this.properties.set(name, newValue);
    }

    emit(event: string, args: any = {}): void {
        actions.getCallbacks(this.name, event).forEach((callback: Function): void => {
            callback(args);
        });
    }

    on(event: string, callback: Function): void {
        actions.addCallback(this.name, event, callback);
    }

    onPropertyChanged(propertyName: string, callback: Function): void {
        actions.addCallback(this.name, propertyName + '_changed', callback);
    }

    public setName(name: string): void {
        this.name = name;
    }

    public setInfo(info: any): void {
        this.info = info;
    }

    public getInfo(): any {
        return this.info;
    }

    toJSON(): any {
        const traitsList: string[] = [];

        return {
            name: this.name,
            traits: traitsList
        };
    }
}
