import Extension from "../../core/abstract-extension";
import * as express from "express";
import {Express} from "express";
import deviceManager from "../../core/device-manager";
const logger = require("../../core/logger").logger('web-api');

class WebAPI extends Extension {
    private port: number = parseInt(process.env.WEB_API_PORT || '') || 3000;

    getName(): string {
        return 'web-api';
    }

    run(): void {
        const api: Express = express();

        const port: number = this.port;
        const server = api.listen(port, (): void => {
            logger.debug('Server is running', {port});
        });

        api.get('/health', (req, res) => {
            res.send('OK');
        });

        api.get('/devices', (req, res) => {
           res.send(deviceManager.getDevices());
        });

        // Gracefully close on process exit
        process.on('SIGINT', (): void => {
            logger.debug('Closing API server');
            server.close((err): void => {
                if (err) {
                    logger.error('Error while closing API server', {err});
                    return;
                }
                logger.debug('API server closed');
            });
        });
    }
}

export default new WebAPI();
