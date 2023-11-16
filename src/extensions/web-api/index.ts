import {Extension} from "../../core/extension-interface";
import * as express from "express";
import {Express} from "express";

class ExpressExtension extends Extension {
    private port: number = parseInt(process.env.WEB_API_PORT || '') || 3000;

    getName(): string {
        return 'web-api';
    }

    run(): void {
        const api: Express = express();

        const port: number = this.port;
        const server = api.listen(port, (): void => {
            console.log(`Server is running on port ${port}`);
        });

        // Gracefully close on process exit
        process.on('SIGINT', (): void => {
            console.log('Closing API connections');
            server.close();
            console.log('Closed API connections');
        });
    }
}

export const extension: ExpressExtension = new ExpressExtension();
