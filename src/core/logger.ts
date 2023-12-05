import * as winston from 'winston';

const loggers = new Map<string, winston.Logger>();

const stringFormat = winston.format.printf((info) => {
    const message = `[${info.timestamp}][${info.level}][${info.channel}] ${info.message}`;
    delete info.timestamp;
    delete info.message;
    // @ts-ignore
    delete info.level;
    delete info.channel;
    const infoStr = Object.keys(info).length ? ' ' + JSON.stringify(info) : '';

    return message + infoStr;
});

export const logger = function (channel: string): winston.Logger {
    if (!loggers.has(channel)) {
        const logger: winston.Logger = winston.createLogger({
            // level: process.env.LOG_LEVEL || 'debug',
            defaultMeta: {channel},
            format:winston.format.combine(
                winston.format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
                winston.format.simple(),
                winston.format.colorize(),
                stringFormat,
            ),
            transports: [
                new winston.transports.File({
                    filename: `logs/${channel}.log`,
                    level: 'debug',
                }),
                new winston.transports.File({
                    filename: 'logs/combined.log',
                    level: 'debug',
                }),
                new winston.transports.File({
                    filename: 'logs/errors.log',
                    level: 'warn',
                }),
                new winston.transports.Console({
                    level: 'debug',
                }),
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
