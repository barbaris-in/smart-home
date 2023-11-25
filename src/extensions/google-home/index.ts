import Extension from "../../core/abstract-extension";
import * as express from "express";
import * as bodyParser from "body-parser";
import deviceManager from "../../core/device-manager";
import Bulb from "../../devices/bulb";
const logger = require("../../core/logger").logger('google-home');

class GoogleHome extends Extension {
    getName(): string {
        return "google-home";
    }

    init(): void {
        let redirect: any = '';

        const app = express();
        app.use(bodyParser.json());

        app.post('/fulfillment', (request, response) => {
            const input = request.body.inputs[0];
            switch (input.intent) {
                case 'action.devices.SYNC':
                    const devices = [];
                    devices.push({
                        id: 'washer',
                        type: 'action.devices.types.WASHER',
                        traits: [
                            'action.devices.traits.OnOff',
                            'action.devices.traits.StartStop',
                            'action.devices.traits.RunCycle',
                        ],
                        name: {
                            defaultNames: ['My Washer'],
                            name: 'Washer',
                            nicknames: ['Washer'],
                        },
                        deviceInfo: {
                            manufacturer: 'Acme Co',
                            model: 'acme-washer',
                            hwVersion: '1.0',
                            swVersion: '1.0.1',
                        },
                        willReportState: true,
                        attributes: {
                            pausable: true,
                        },
                    });
                    const homeDevices = deviceManager.getDevices();
                    for (const deviceId in homeDevices) {
                        const d = homeDevices[deviceId].device;
                        console.log(homeDevices[deviceId].device.type === 'bulb');
                        switch (d.type) {
                            case 'bulb':
                                devices.push({
                                    id: deviceId,
                                    type: 'action.devices.types.LIGHT',
                                    traits: [
                                        'action.devices.traits.OnOff',
                                        'action.devices.traits.ColorSetting',
                                        'action.devices.traits.Brightness',
                                    ],
                                    name: {
                                        defaultNames: [d.getName()],
                                        name: d.getName(),
                                        nicknames: [d.getName()],
                                    },
                                    deviceInfo: {
                                        manufacturer: 'Acme Co',
                                        model: 'acme-washer',
                                        hwVersion: '1.0',
                                        swVersion: '1.0.1',
                                    },
                                    willReportState: true,
                                    attributes: {
                                        // todo: is the light color temperature adjustable?
                                        colorTemperatureRange: {
                                            // todo: get max and min color temperature from device
                                            "temperatureMinK": 2000,
                                            "temperatureMaxK": 9000
                                        },
                                    },
                                });
                                break;
                            default:

                        }
                    }
                    response.send({
                        requestId: request.body.requestId,
                        payload: {
                            agentUserId: "1",
                            devices: devices,
                        },
                    });
                    break;
                case 'action.devices.QUERY':
                    const queryDevices: { [key: string]: {} } = {};
                    for (const device of input.payload.devices) {
                        const deviceId = device.id;
                        const d = deviceManager.getDevice(deviceId);
                        if (d instanceof Bulb) {
                            queryDevices[d.getId()] = {
                                online: true,
                                on: d.isTurnedOn(),
                                brightness: d.getBrightnessPercentage(),
                                color: {
                                    temperatureK: 5000,
                                },
                            };
                        }
                    }
                    response.send({
                        requestId: request.body.requestId,
                        payload: {
                            devices: queryDevices,
                        }
                    });
                    break;
                case 'action.devices.EXECUTE':
                    const commandsResponse = [];
                    for (const command of input.payload.commands) {
                        const ids = [];
                        let on: boolean | null = null;
                        let br: number | null = null;
                        let temp: number | null = null;
                        for (const execution of command.execution) {
                            for (const device of command.devices) {
                                const d = deviceManager.getDevice(device.id);
                                switch (execution.command) {
                                    case 'action.devices.commands.OnOff':
                                        if (d instanceof Bulb) {
                                            if (typeof execution.params.on !== 'undefined') {
                                                on = execution.params.on;
                                            }
                                            if (execution.params.on) {
                                                d.turnOn();
                                            } else {
                                                d.turnOff();
                                            }
                                            ids.push(device.id);
                                        }
                                        break;
                                    case 'action.devices.commands.BrightnessAbsolute':
                                        if (d instanceof Bulb) {
                                            if (typeof execution.params.brightness !== 'undefined') {
                                                br = execution.params.brightness;
                                                d.setBrightnessPercentage(execution.params.brightness);
                                            }
                                            ids.push(device.id);
                                        }
                                        break;
                                    case 'action.devices.commands.ColorAbsolute':
                                        if (d instanceof Bulb) {
                                            if (typeof execution.params.color.temperature !== 'undefined') {
                                                temp = execution.params.color.temperature;
                                                d.setColorTemperatureKelvin(execution.params.color.temperature);
                                            }
                                            ids.push(device.id);
                                        }
                                        break;
                                    default:
                                        logger.error('Unknown command', {execution});
                                }
                            }
                        }
                        const commandResponse = {
                            ids: ids,
                            status: 'SUCCESS',
                            states: {
                                online: true,
                                // brightness: br,
                                // on: on
                            },
                        }
                        if (br !== null) {
                            // @ts-ignore
                            commandResponse.states['brightness'] = br;
                        }
                        if (temp !== null) {
                            // @ts-ignore
                            commandResponse.states['color'] = {
                                temperatureK: temp,
                            };
                        }
                        if (on !== null) {
                            // @ts-ignore
                            commandResponse.states['on'] = on;
                        }
                        commandsResponse.push(commandResponse);
                    }
                    response.send({
                        requestId: request.body.requestId,
                        payload: {
                            commands: commandsResponse,
                        },
                    });
                    break;
                default:
                    console.error('Unknown intent', input);
            }
            logger.debug('fulfillment', request.body, response);
        });

        app.get('/login', (req, res) => {
            console.log('Requesting login page', req.query);
            redirect = req.query.responseurl;
            res.send(`
    <html>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <body>
        <form action="/login" method="post">
          <input type="text"
            name="responseurl" value="${req.query.responseurl}" />
          <input type="submit" style="font-size:14pt" value="Link this service to Google"/>
        </form>
        ${req.query.responseurl}
      </body>
    </html>
  `);
        });

        app.post('/login', (req, res) => {
            return res.redirect(redirect);
        });

        app.get('/fakeauth', (request, response) => {
            // @ts-ignore
            let responseurl = decodeURIComponent(request.query.redirect_uri);
            const code = 'xxxxxx';
            responseurl += '?code=' + code + '&state=' + request.query.state;
            const redirecuUrl = `/login?responseurl=${encodeURIComponent(responseurl)}`;
            redirect = responseurl;
            response.redirect(redirecuUrl);
        });

        app.post('/faketoken', (request, response) => {
            console.log('faketoken', request.query);
            const grantType = request.query.grant_type ?
                request.query.grant_type : request.body.grant_type;
            const secondsInDay = 86400; // 60 * 60 * 24
            const HTTP_STATUS_OK = 200;
            console.log(`Grant type ${grantType}`);

            let obj;
            if (grantType === 'authorization_code') {
                obj = {
                    token_type: 'bearer',
                    access_token: '123access',
                    refresh_token: '123refresh',
                    expires_in: secondsInDay,
                };
            } else if (grantType === 'refresh_token') {
                obj = {
                    token_type: 'bearer',
                    access_token: '123access',
                    expires_in: secondsInDay,
                };
            }
            response.status(HTTP_STATUS_OK)
                .json(obj);
        });


        app.listen(3003, '0.0.0.0', () => {
            console.log('listening on port 3003');
        });
    }
}

export default new GoogleHome();
