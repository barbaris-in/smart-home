import Extension from "../../core/abstract-extension";
import {Device} from "../../core/device";
import deviceManager from "../../core/device-manager";
import {SecuritySystem, SecuritySystemTrait} from "./SecuritySystem";

class SecuritySystemExtension extends Extension {
    getName(): string {
        return "security-system";
    }

    dependsOn(): string[] {
        return ['mqtt'];
    }

    init(): void {

    }

    loadDevices(): void {
        const traits: { [key: string]: any } = {};
        traits[SecuritySystem.name] = new SecuritySystemTrait();
        const securitySystem = new Device('security-system', 'Security System', traits);
        deviceManager.addDevice(securitySystem, 'security-system');
    }
}

export default new SecuritySystemExtension();
