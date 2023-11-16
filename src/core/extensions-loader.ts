import {Extension} from "./extension-interface";// get list of extensions from directory
import * as fs from "fs";
import * as path from "path";

class ExtensionsLoader {
    private extensions: Extension[] = [];

    loadExtensions() {
        const normalizedPath: string = path.join(__dirname, '../extensions');
        console.log('Loading extensions...', normalizedPath);
        fs.readdirSync(normalizedPath).forEach((extensionName: string): void => {
           console.log("Loading extension:", extensionName);
           const {extension} = require('../extensions/' + extensionName + '/index.js');
           if (!(extension instanceof Extension)) {
               console.error(`Extension "${extensionName}"is not an instance of Extension class`);
               return;
           }
           console.log("Extension:", extension);
           this.extensions.push(extension);
        });
    }

    getExtensions() {
        return this.extensions;
    }

    runExtensions(): void {
        for(const extension of this.extensions) {
            console.log("Running extension:", extension.getName());
            extension.run();
        }
    }
}

export const extensionsLoader = new ExtensionsLoader();
