import Extension from "../../core/abstract-extension";
import {Telegraf} from "telegraf";

class TelegramBot extends Extension {
    getName(): string {
        return 'telegram-bot';
    }

    run(): void {
        const bot = new Telegraf(process.env.TELEGRAM_ACCESS_TOKEN || (() => {
            throw Error('Telegram access token is not set!');
        })());

        bot.launch().then(() => {
            console.info('Telegram bot has been started');
            process.once('SIGINT', () => bot.stop('SIGINT'))
            process.once('SIGTERM', () => bot.stop('SIGTERM'))
        });
    }
}

export default new TelegramBot();
