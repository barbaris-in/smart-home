import Extension from "./abstract-extension";
import * as fs from "fs";
import * as path from "path";
const logger = require('./logger').logger('extensions-loader');

class ExtensionsLoader {
    private extensions: Extension[] = [];

    loadExtensions() {
        const normalizedPath: string = path.join(__dirname, '../extensions');
        logger.debug('Loading extensions...', normalizedPath);
        fs.readdirSync(normalizedPath).forEach((extensionName: string): void => {
           logger.debug("Loading extension:", {extensionName});
           const extension = require('../extensions/' + extensionName + '/index.js');
           if (!(extension.default instanceof Extension)) {
               logger.error(`Extension "${extensionName}" is not an instance of Extension class`);
               return;
           }
           logger.debug('Extension has been loaded:', {extensionName});
           this.extensions.push(extension.default);
        });
        this.extensions = this.extensions.sort((a: Extension, b: Extension): number => {
            return a.dependsOn().indexOf(b.getName()) > -1 ? 1 : -1
        });
    }

    loadDevices(): void {
        for(const extension of this.extensions) {
            logger.debug("Loading devices:", {name: extension.getName()});
            extension.loadDevices();
        }
    }

    initExtensions(): void {
        for(const extension of this.extensions) {
            logger.debug(`Running extension "${extension.getName()}"`);
            // todo: make sure extension is loaded
            // try {
                extension.init();
            // } catch (e) {
            //     logger.error(`Error running extension "${extension.getName()}"`, e);
            //     setTimeout(() => {
            //         logger.debug(`Running extension again"${extension.getName()}"`);
            //         extension.getName()
            //     }, 5000);
            // }
        }

        process.on('SIGINT', () => {
            logger.debug('Stopping extensions');
            for(const extension of this.extensions) {
                logger.debug(`Stopping extension "${extension.getName()}"`);
                extension.unload();
            }
        });
    }
}

export default new ExtensionsLoader();
