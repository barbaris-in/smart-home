import actions from './actions';

export abstract class Trait {
}

export class Device {
    protected info: any;
    public readonly properties: { [key: string]: boolean | number | string } = {}

    constructor(public readonly id: string, public name: string, public readonly traits: { [key: string]: Trait } = {}) {
    }

    public supports(traitFunction: Function): boolean {
        return this.traits[traitFunction.name] && true;
    }

    setProperty(name: string, newValue: boolean | number | string): void {
        if (!this.properties[name]) {
            // todo: new property
        } else {
            const oldValue = this.properties[name];
            if (oldValue !== newValue) {
                this.emit('property_changed', {name, oldValue, newValue});
            }
        }
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
