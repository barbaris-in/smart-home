import Extension from "../../core/abstract-extension";
import {Telegraf} from "telegraf";
const logger = require('../../core/logger').logger('telegram');

class TelegramBot extends Extension {
    getName(): string {
        return 'telegram-bot';
    }

    run(): void {
        const bot = new Telegraf(process.env.TELEGRAM_ACCESS_TOKEN || (() => {
            throw Error('Telegram access token is not set!');
        })());

        bot.launch().then(() => {
            logger.debug('Telegram bot has been started');

            process.once('SIGINT', () => {
                bot.stop('SIGINT');
            });

            process.once('SIGTERM', () => {
                bot.stop('SIGTERM')
            })
        }).catch(reason => {
            // todo: restart bot if disconnected
            logger.error(reason);
        });
    }
}

export default new TelegramBot();
