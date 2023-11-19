import Extension from "./abstract-extension";
import * as fs from "fs";
import * as path from "path";
const logger = require('./logger').logger('extensions-loader');

class ExtensionsLoader {
    private extensions: Extension[] = [];

    loadExtensions() {
        // todo: order extensions by priority
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
    }

    getExtensions() {
        return this.extensions;
    }

    runExtensions(): void {
        for(const extension of this.extensions) {
            logger.debug("Running extension:", {name: extension.getName()});
            extension.run();
        }
    }
}

export default new ExtensionsLoader();
