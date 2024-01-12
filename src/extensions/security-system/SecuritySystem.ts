import {Device} from "../../core/device";
import Trait from "../../core/trait";

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
