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
    public static readonly levels: {disarmed_key: number, home_key: number, away_key: number} = {
        disarmed_key: 0,
        home_key: 1,
        away_key: 2
    };
    protected currentArmLevel: keyof typeof SecuritySystemTrait.levels = 'disarmed_key';
    protected currentArmLevelNum: number = 0;

    public initialize(): void {
    }


    public arm(armLevel: keyof typeof SecuritySystemTrait.levels): void {
        this.armed = true;
        this.currentArmLevel = armLevel;
        this.currentArmLevelNum = SecuritySystemTrait.levels[armLevel];
    }

    public disarm(): void {
        this.armed = false;
        this.currentArmLevel = 'disarmed_key';
    }

    public isArmed(): boolean {
        return this.armed;
    }

    getCurrentArmLevel(): string {
        return this.currentArmLevel;
    }

    getCurrentArmLevelNum(): number {
        return this.currentArmLevelNum;
    }
}

export function SecuritySystem(device: Device): SecuritySystemTrait {
    if (!device.traits['SecuritySystem']) {
        throw new Error('SecuritySystem trait in not supported');
    }
    return device.traits['SecuritySystem'] as SecuritySystemTrait;
}

export default new SecuritySystemExtension('security-system');
