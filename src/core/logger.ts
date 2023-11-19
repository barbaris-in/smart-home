import * as winston from 'winston';

const loggers = new Map<string, winston.Logger>();

export const logger = function (channel: string): winston.Logger {
    if (!loggers.has(channel)) {
        const logger: winston.Logger = winston.createLogger({
            level: 'debug',
            defaultMeta: {channel},
            format: winston.format.combine(
                winston.format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
                winston.format.colorize(),
                winston.format.simple(),
                winston.format.printf((info) => {
                    const message = `[${info.timestamp}][${info.level}][${info.channel}] ${info.message}`;
                    delete info.timestamp;
                    delete info.message;
                    // @ts-ignore
                    delete info.level;
                    delete info.channel;
                    const infoStr = Object.keys(info).length ? ' ' + JSON.stringify(info) : '';

                    return message + infoStr;
                }),
            ),
            transports: [
                new winston.transports.File({filename: `logs/${channel}.log`}),
                new winston.transports.File({filename: 'logs/combined.log'}),
                new winston.transports.Console(),
            ],
        });

        loggers.set(channel, logger);
    }

    const result = loggers.get(channel);

    if (result) {
        return result;
    } else {
        throw new Error(`Logger for channel "${channel}" not found`);
    }
}
