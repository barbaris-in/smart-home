import Extension from "../../core/abstract-extension";
import {Device} from "../../core/device";
import deviceManager from "../../core/device-manager";
import {OnOff, OnOffTrait} from "../../core/traits/OnOff";
import {Properties} from "../../core/properties";
const ping = require('ping');

const logger = require('../../core/logger').logger('my-computer');
const ssh = require('ssh2').Client;
const connectionOptions = {
    host: '192.168.1.11',
    port: 22,
    username: 'barbaris',
    password: process.env.COMPUTER_PASSWORD, // or use private key for authentication
};

const shutdownCommand = 'systemctl suspend';

class MyComputerExtension extends Extension {
    getName(): string {
        return "my-computer";
    }

    loadDevices(): void {
        const traits: { [key: string]: any } = {};
        traits[OnOff.name] = new OnOffTrait((state: boolean): Promise<void> => {
            return new Promise((resolve, reject) => {
                // const conn = new ssh();
                // conn
                //     .on('ready', () => {
                //         logger.debug('SSH connection established.');
                //
                //         // Execute the shutdown command on the remote machine
                //         conn.exec(shutdownCommand, (err: any, stream: any) => {
                //             if (err) throw err;
                //
                //             stream
                //                 .on('close', (code: any, signal: any) => {
                //                     logger.debug(`Shutdown command exited with code ${code} and signal ${signal}`);
                //                     conn.end();
                //                 })
                //                 .on('data', (data: any) => {
                //                     logger.debug(`STDOUT: ${data}`);
                //                 })
                //                 .stderr
                //                 .on('data', (data: any) => {
                //                     logger.error(`STDERR: ${data}`);
                //                 });
                //         });
                //     })
                //     .on('error', (err: any) => {
                //         logger.error(`Error: ${err.message}`);
                //         conn.end();
                //     })
                //     .on('close', () => {
                //         logger.debug('SSH connection closed.');
                //     })
                //     .connect(connectionOptions);
                logger.debug('Turning off my computer');
                resolve();
            });
            // if (state) {
            //     // logger.debug('Turning on my computer');
            // } else {
            //     logger.debug('Turning off my computer');
            // }
        }, (properties: Properties): Promise<boolean> => {
            return new Promise((resolve, reject) => {
                // ping.sys.probe(connectionOptions.host, (isAlive: boolean) => {
                //     resolve(isAlive);
                //     properties.set('state', isAlive);
                //     logger.debug(`My computer is ${isAlive ? 'on' : 'off'}`);
                // });
                logger.debug('Checking if my computer is on');
            });
        });
        const securitySystem = new Device('computer', 'My Computer', traits);
        deviceManager.addDevice(securitySystem, 'security-system');
    }

    init(): void {
    }
}

export default new MyComputerExtension();
