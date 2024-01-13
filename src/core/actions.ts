export class DeviceCallbacks extends Map<string, Function[]> {
}

class Actions extends Map<string, DeviceCallbacks> {
    public addCallback(deviceName: string, eventName: string, callback: Function): void {
        if (!this.has(deviceName)) {
            this.set(deviceName, new DeviceCallbacks());
        }

        // @ts-ignore
        const deviceCallbacks: DeviceCallbacks = this.get(deviceName);

        if (!deviceCallbacks.has(eventName)) {
            deviceCallbacks.set(eventName, []);
        }

        const eventCallbacks = deviceCallbacks.get(eventName);

        if (undefined !== eventCallbacks) {
            eventCallbacks.push(callback);
        }
    }

    public getCallbacks(deviceName: string, event: string): Function[] {
        if (!this.has(deviceName)) {
            return [];
        }

        // @ts-ignore
        const deviceCallbacks: DeviceCallbacks = this.get(deviceName);
        if (deviceCallbacks.has(event)) {
            // @ts-ignore
            return deviceCallbacks.get(event);
        } else {
            return [];
        }
    }
}

export default new Actions();
