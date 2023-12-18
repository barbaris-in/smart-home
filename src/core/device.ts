import actions from './actions';
import {Properties, Property} from "./properties";
import Trait from "./trait";

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
        // fix this for boolean properties like `occupancy`
        if (!this.properties.has(name)) {
        //     todo: new property
            console.log('new property', name, newValue);
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

    public setInfo(info: any): void {
        this.info = info;
    }

    public getInfo(): any {
        return this.info;
    }
}
