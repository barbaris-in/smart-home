import Extension from "../../core/abstract-extension";
import * as express from "express";
import * as bodyParser from "body-parser";
import Sync from "./sync";
import Query from "./query";
import Execute from "./execute";
import Security from "../../core/security";
import AuthorizationError from "../../core/authorization-error";
import {Server} from "node:http";

const logger = require("../../core/logger").logger('google-home');

class GoogleHomeApi extends Extension {
    protected server: Server | null = null

    constructor(public readonly name: string) {
        super(name);
        logger.debug('Initializing Google Home API');
        const app = express();
        app.use(bodyParser.json());

        app.get('/', (req, res) => {
            res.send('OK');
        });

        app.post('/fulfillment', (req, res) => {
            logger.debug('Request', {body: req.body});
            Security.authorize(req)
                .then(user => {
                    try {
                        const input = req.body.inputs[0];
                        switch (input.intent) {
                            case 'action.devices.SYNC':
                                const syncContent = Sync.sync(req.body.requestId, user.username);
                                logger.debug('Sync Response', {syncContent});
                                res.send(syncContent);
                                break;
                            case 'action.devices.QUERY':
                                const queryContent = Query.query(req.body.requestId, input);
                                logger.debug('Query Response', {queryContent});
                                res.send(queryContent);
                                break;
                            case 'action.devices.EXECUTE':
                                const executeContent = Execute.execute(req.body.requestId, input);
                                logger.debug('Execute Response', {executeContent});
                                res.send(executeContent);
                                break;
                            default:
                                logger.error('Unknown intent', input);
                        }
                    } catch (e) {
                        logger.error('Could not process request', e);
                        res.status(500).json({message: 'Internal server error'});
                    }
                })
                .catch(err => {
                    if (err instanceof AuthorizationError) {
                        res.status(err.status).json({message: err.message});
                    } else {
                        res.status(500).json({message: 'Internal server error'});
                    }
                });
        });

        const port: number = parseInt(process.env.GOOGLE_HOME_PORT || "") || 3003;
        if (!port) {
            throw new Error('Google Home API Port not specified');
        }

        this.server = app.listen(port, '0.0.0.0', () => {
            logger.info(`Google Home Integration is listening on port ${port}`);
        });
    }

    destructor(): void {
        logger.debug('Closing Google Home API');
        if (this.server) {
            this.server.close((err): void => {
                if (err) {
                    logger.error('Error while closing Google Home API', {err});
                    return;
                }
                logger.debug('Google Home API closed');
            });
        }
    }
}

export default new GoogleHomeApi('google-home');
