class DeviceCallbacks extends Map<string, Function[]> {
}

class Actions extends Map<string, DeviceCallbacks> {
    public addCallback(deviceName: string, eventName: string, callback: Function): boolean {
        if (!this.has(deviceName)) {
            this.set(deviceName, new DeviceCallbacks());
        }

        const deviceCallbacks = this.get(deviceName);

        if (undefined !== deviceCallbacks) {
            if (!deviceCallbacks.has(eventName)) {
                deviceCallbacks.set(eventName, []);
            }

            const eventCallbacks = deviceCallbacks.get(eventName);

            if (undefined !== eventCallbacks) {
                eventCallbacks.push(callback);
            }

            return true;
        } else {
            return false;
        }
    }

    public getCallbacks(deviceName: string, event: string): Function[] {
        if (!this.has(deviceName)) {
            return [];
        }

        const deviceCallbacks = this.get(deviceName);
        if (undefined === deviceCallbacks || !deviceCallbacks.has(event)) {
            return [];
        }

        if (deviceCallbacks.has(event)) {
            const callbacks = deviceCallbacks.get(event);
            if (undefined === callbacks) {
                return [];
            } else {
                return callbacks;
            }
        }

        return [];
    }
}

export default new Actions();
