import actions from './actions';

export default abstract class Device {
    public readonly type: string = 'abstract-device';

    protected constructor(protected readonly id: string, protected name: string) {
    }

    getId(): string {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    emit(event: string, args: any = {}): void {
        actions.getCallbacks(this.getName(), event).forEach((callback: Function): void => {
            callback(args);
        });
    }

    on(event: string, callback: Function): void {
        actions.addCallback(this.getName(), event, callback);
    }
}
