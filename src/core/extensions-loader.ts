import Extension from "./abstract-extension";
import * as fs from "fs";
import * as path from "path";

const logger = require('./logger').logger('extensions-loader');

class ExtensionsLoader {
    private extensions: Extension[] = [];

    loadExtensions() {
        const normalizedPath: string = path.join(__dirname, '../extensions');
        if (!fs.existsSync(normalizedPath)) {
            logger.info('Extensions directory not found');
            return;
        }
        logger.debug('Loading extensions...', normalizedPath);
        fs.readdirSync(normalizedPath).forEach((extensionName: string): void => {
            logger.debug("Loading extension:", {extensionName});
            const packageJson = require('../extensions/' + extensionName + '/package.json');
            const mainFile = packageJson.main ? packageJson.main : 'index.js';
            const extension = require('../extensions/' + extensionName + '/' + mainFile).default;
            if (!(extension instanceof Extension)) {
                logger.error(`Extension "${extensionName}" is not an instance of Extension class`);
                return;
            }
            logger.debug('Extension has been loaded:', {extensionName});
            this.extensions.push(extension);
        });

        process.on('SIGINT', () => {
            logger.debug('Stopping extensions');
            for(const extension of this.extensions) {
                logger.debug(`Stopping extension "${extension.name}"`);
                extension.destructor();
            }
        });
    }
}

export default new ExtensionsLoader();
