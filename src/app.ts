console.log('███████╗███╗   ███╗ █████╗ ██████╗ ████████╗ ██████╗ ███╗   ███╗███████╗');
console.log('██╔════╝████╗ ████║██╔══██╗██╔══██╗╚══██╔══╝██╔═══██╗████╗ ████║██╔════╝');
console.log('███████╗██╔████╔██║███████║██████╔╝   ██║   ██║   ██║██╔████╔██║█████╗');
console.log('╚════██║██║╚██╔╝██║██╔══██║██╔══██╗   ██║   ██║   ██║██║╚██╔╝██║██╔══╝');
console.log('███████║██║ ╚═╝ ██║██║  ██║██║  ██║   ██║   ╚██████╔╝██║ ╚═╝ ██║███████╗');
console.log('╚══════╝╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝    ╚═════╝ ╚═╝     ╚═╝╚══════╝');

import extensionsLoader from "./core/extensions-loader";
import deviceManager from "./core/device-manager";

deviceManager.loadDevices();

extensionsLoader.loadExtensions();
extensionsLoader.runExtensions();
