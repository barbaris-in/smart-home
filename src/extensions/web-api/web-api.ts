import Extension from "../../core/abstract-extension";
import * as express from "express";
import deviceManager from "../../core/device-manager";
import * as http from "http";

const logger = require("../../core/logger").logger('web-api');

class WebAPI extends Extension {
    private port: number = parseInt(process.env.WEB_API_PORT || '') || 3000;
    private readonly server: http.Server;

    getName(): string {
        return 'web-api';
    }

    constructor() {
        super('web-api');
        const port: number = this.port;
        const app = express();
        app.get('/health', (req, res) => {
            res.send('OK');
        });

        app.get('/devices', (req, res) => {
            res.send(deviceManager.getDevices().toJSON());
        });

        this.server = app.listen(port, (): void => {
            logger.debug('Server is running', {port});
        });
    }

    destructor() {
        logger.debug('Closing API server');
        if (this.server) {
            this.server.close((err): void => {
                if (err) {
                    logger.error('Error while closing API server', {err});
                    return;
                }
                logger.debug('API server closed');
            });
        }
    }
}

export default new WebAPI();
