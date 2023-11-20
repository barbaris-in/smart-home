import Device from "../core/abscract-device";

export default class GenericDevice extends Device {
    public readonly type: string = 'generic-device';

    constructor(protected readonly id: string, protected name: string, protected object: any = {}) {
        super(id, name);
    }
}
