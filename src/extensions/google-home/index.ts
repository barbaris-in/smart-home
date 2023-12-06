import Extension from "../../core/abstract-extension";
import * as express from "express";
import * as bodyParser from "body-parser";
import Sync from "./sync";
import Query from "./query";
import Execute from "./execute";
import Security from "../../core/security";
import AuthorizationError from "../../core/authorization-error";

const logger = require("../../core/logger").logger('google-home');

class GoogleHomeApi extends Extension {
    getName(): string {
        return "google-home";
    }

    init(): void {
        const app = express();
        app.use(bodyParser.json());

        app.get('/', (req, res) => {
            res.send('OK');
        });

        app.post('/fulfillment', (req, res) => {
            logger.debug('Fulfillment', {body: req.body});
            Security.authorize(req)
                .then(user => {
                    try {
                        const input = req.body.inputs[0];
                        switch (input.intent) {
                            case 'action.devices.SYNC':
                                const syncContent = Sync.sync(req.body.requestId, user.username);
                                logger.debug('syncContent', {syncContent});
                                res.send(syncContent);
                                break;
                            case 'action.devices.QUERY':
                                const queryContent = Query.query(req.body.requestId, input);
                                logger.debug('queryContent', {queryContent});
                                res.send(queryContent);
                                break;
                            case 'action.devices.EXECUTE':
                                const executeContent = Execute.execute(req.body.requestId, input);
                                logger.debug('executeContent', {executeContent});
                                res.send(executeContent);
                                break;
                            default:
                                logger.error('Unknown intent', input);
                        }
                    } catch (e) {
                        logger.error(e);
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

        app.listen(port, '0.0.0.0', () => {
            logger.info(`Google Home Integration is listening on port ${port}`);
        });
    }
}

export default new GoogleHomeApi();
