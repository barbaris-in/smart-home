import GenericDevice from "./generic-device";

export default class YeelightWifiStrip extends GenericDevice {
    public readonly type: string = 'yeelight-wifi-strip';

    constructor(
        id: string,
        name: string,
        protected ip: string,
        protected port: number,
    ) {
        super(id, name, {ip, port});
    }

    getId(): string {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    sendCommand(): boolean {
        return false;
    }

    toggle(): boolean {
        return false;
    }

    tornOn(): boolean {
        return false;
    }

    tornOff(): boolean {
        return false;
    }
}
