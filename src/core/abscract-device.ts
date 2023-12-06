import actions from './actions';

export abstract class Trait {
    protected parentDevice?: Device;

    initialize(): void {
    }

    refresh(): void {
    }

    public setParentDevice(device: Device) {
        this.parentDevice = device;
    }

    public getParentDevice(): Device {
        if (!this.parentDevice) {
            throw new Error('Parent device is not set');
        }
        return this.parentDevice;
    }
}

export class Device {
    protected info: any;
    public readonly properties: { [key: string]: boolean | number | string } = {}

    constructor(public readonly id: string, public name: string, public readonly traits: { [key: string]: Trait } = {}) {
        for (const trait of Object.values(traits)) {
            (trait as Trait).setParentDevice(this);
        }
    }

    public supports(traitFunction: Function): boolean {
        return this.traits[traitFunction.name] && true;
    }

    setProperty(name: string, newValue: boolean | number | string): void {
        // fix this for boolean properties like `occupancy`
        // if (typeof this.properties[name] === 'undefined') {
        //     todo: new property
            // console.log('new property', name, newValue);
        // } else {
        //     const oldValue = this.properties[name];
        //     if (oldValue !== newValue) {
                this.emit('property_changed', {name, newValue});
            // }
        // }
        this.properties[name] = newValue;
    }

    emit(event: string, args: any = {}): void {
        actions.getCallbacks(this.name, event).forEach((callback: Function): void => {
            callback(args);
        });
    }

    on(event: string, callback: Function): void {
        actions.addCallback(this.name, event, callback);
    }

    public setInfo(info: any): void {
        this.info = info;
    }

    public getInfo(): any {
        return this.info;
    }
}
