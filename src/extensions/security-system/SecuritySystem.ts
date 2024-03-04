import {Device} from "../../core/device";
import Trait from "../../core/trait";
import Extension from "../../core/abstract-extension";
import deviceManager from "../../core/device-manager";

class SecuritySystemExtension extends Extension {
    constructor(name: string) {
        super(name);
        const traits: { [key: string]: any } = {};
        traits[SecuritySystem.name] = new SecuritySystemTrait();
        const securitySystem = new Device('security-system', 'Security System', traits);
        deviceManager.registerDevice(securitySystem, 'security-system');
    }
}

export class SecuritySystemTrait extends Trait {
    protected armed: boolean = false;
    protected currentArmLevel: string = '';

    public initialize(): void {
    }

    public arm(armLevel: string): void {
        this.armed = true;
        this.currentArmLevel = armLevel;
    }

    public disarm(): void {
        this.armed = false;
        this.currentArmLevel = '';
    }

    public isArmed(): boolean {
        return this.armed;
    }

    getCurrentArmLevel(): string {
        return this.currentArmLevel;
    }
}

export function SecuritySystem(device: Device): SecuritySystemTrait {
    if (!device.traits['SecuritySystem']) {
        throw new Error('SecuritySystem trait in not supported');
    }
    return device.traits['SecuritySystem'] as SecuritySystemTrait;
}

export default new SecuritySystemExtension('security-system');
