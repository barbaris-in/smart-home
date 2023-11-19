interface AssociativeArray {
    [key: string]: NodeJS.Timeout;
}

class Timers {
    protected timers: AssociativeArray = {};

    clearTimer(timerId: string): void {
        if (timerId in this.timers) {
            const timer: NodeJS.Timeout = this.timers[timerId];
            clearTimeout(timer);
        }
    }

    refreshTimer(timerId: string, timer: NodeJS.Timeout): void {
        this.timers[timerId] = timer;
    }
}

export default new Timers();
