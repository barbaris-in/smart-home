export default class Queue {
    interval: number = 5000;
    intervalId: NodeJS.Timeout | null = null;
    initialized = false;
    initializing = false;
    private waitFor: Function;
    private callback: Function;

    constructor(waitFor: Function, callback: Function, interval: number) {
        this.waitFor = waitFor;
        this.callback = callback;
        this.interval = interval;
    }

    q: any[] = [];

    public add(...items: any[]) {
        if (this.intervalId) {
            this.q.push(items);
        } else {
            const newEl = items;
            const callbackImmediatelyAndSetInterval = () => {
                this.callback(...newEl);
                this.intervalId = setInterval(() => {
                    let el: any[];
                    el = this.q.shift();
                    if (el) {
                        this.callback(...el);
                    } else {
                        if (this.intervalId) {
                            clearInterval(this.intervalId);
                        }
                        this.intervalId = null;
                    }
                }, this.interval);
            }

            if (this.initialized) {
                callbackImmediatelyAndSetInterval();
            } else {
                if (!this.initializing) {
                    this.initializing = true;
                    this.waitFor().then(() => {
                        this.initialized = true;
                        this.initializing = false;

                        callbackImmediatelyAndSetInterval();
                    });
                } else {
                    this.q.push(items);
                }
            }
        }
    }
}
