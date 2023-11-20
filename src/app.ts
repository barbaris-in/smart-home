console.log('███████╗███╗   ███╗ █████╗ ██████╗ ████████╗ ██████╗ ███╗   ███╗███████╗');
console.log('██╔════╝████╗ ████║██╔══██╗██╔══██╗╚══██╔══╝██╔═══██╗████╗ ████║██╔════╝');
console.log('███████╗██╔████╔██║███████║██████╔╝   ██║   ██║   ██║██╔████╔██║█████╗');
console.log('╚════██║██║╚██╔╝██║██╔══██║██╔══██╗   ██║   ██║   ██║██║╚██╔╝██║██╔══╝');
console.log('███████║██║ ╚═╝ ██║██║  ██║██║  ██║   ██║   ╚██████╔╝██║ ╚═╝ ██║███████╗');
console.log('╚══════╝╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝    ╚═════╝ ╚═╝     ╚═╝╚══════╝');

import deviceClassRegistry from "./core/device-class-registry";
import deviceManager from "./core/device-manager";
import extensionsLoader from "./core/extensions-loader";

deviceClassRegistry.loadDefaultDeviceClasses();
deviceManager.loadDevices();

extensionsLoader.loadExtensions();
extensionsLoader.runExtensions();
