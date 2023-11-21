console.log('███████╗███╗   ███╗ █████╗ ██████╗ ████████╗ ██████╗ ███╗   ███╗███████╗');
console.log('██╔════╝████╗ ████║██╔══██╗██╔══██╗╚══██╔══╝██╔═══██╗████╗ ████║██╔════╝');
console.log('███████╗██╔████╔██║███████║██████╔╝   ██║   ██║   ██║██╔████╔██║█████╗');
console.log('╚════██║██║╚██╔╝██║██╔══██║██╔══██╗   ██║   ██║   ██║██║╚██╔╝██║██╔══╝');
console.log('███████║██║ ╚═╝ ██║██║  ██║██║  ██║   ██║   ╚██████╔╝██║ ╚═╝ ██║███████╗');
console.log('╚══════╝╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝    ╚═════╝ ╚═╝     ╚═╝╚══════╝');

import deviceClassRegistry from "./core/device-class-registry";
import deviceManager from "./core/device-manager";
import extensionsLoader from "./core/extensions-loader";

extensionsLoader.loadExtensions();

deviceClassRegistry.registerDefaultDeviceClasses();
extensionsLoader.registerDeviceClasses();

deviceManager.loadDevices();

extensionsLoader.initExtensions();
