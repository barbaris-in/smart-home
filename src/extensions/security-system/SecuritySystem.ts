import {Device} from "../../core/device";
import Trait from "../../core/trait";

export class SecuritySystemTrait extends Trait {
    protected armed: boolean = false;

    public initialize(): void {
    }

    public isArmed(): boolean {
        return this.armed;
    }

    getCurrentArmLevel(): string {
        return 'home_key';
    }
}

export function SecuritySystem(device: Device): SecuritySystemTrait {
    if (!device.traits['SecuritySystem']) {
        throw new Error('SecuritySystem trait in not supported');
    }
    return device.traits['SecuritySystem'] as SecuritySystemTrait;
}
