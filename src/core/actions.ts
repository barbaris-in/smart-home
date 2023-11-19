class Actions {
    protected callbacks: { [deviceName: string]: { [event: string]: Function[]; } } = {};

    public addCallback(deviceName: string, event: string, callback: Function): void {
        if (!this.callbacks.hasOwnProperty(deviceName)) {
            this.callbacks[deviceName] = {};
        }
        if (!this.callbacks[deviceName].hasOwnProperty(event)) {
            this.callbacks[deviceName][event] = [];
        }
        this.callbacks[deviceName][event].push(callback);
    }

    public getCallbacks(deviceName: string, event: string): Function[] {
        if (!this.callbacks.hasOwnProperty(deviceName)) {
            return [];
        }
        if (!this.callbacks[deviceName].hasOwnProperty(event)) {
            return [];
        }

        return this.callbacks[deviceName][event];
    }
}

export default new Actions();
