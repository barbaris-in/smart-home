import Extension from "../../core/abstract-extension";
import {Context, Telegraf} from "telegraf";

const logger = require('../../core/logger').logger('telegram');

class TelegramBot extends Extension {
    public readonly bot: Telegraf<Context>;

    constructor(name: string) {
        super(name);
        this.bot = new Telegraf(process.env.TELEGRAM_ACCESS_TOKEN || (() => {
            throw Error('Telegram access token is not set!');
        })());

        this.bot.start((ctx) => {
            ctx.reply('Welcome!');
            logger.debug('Bot started', ctx);
        });

        this.bot.launch().then(() => {
        });
    }

    destructor(): void {
        logger.debug('Stopping Telegram bot');
        this.bot.stop();
    }

    sendMessage(chatId: number, message: string, silent: boolean = false): void {
        // toto: implement silent mode
        this.bot.telegram.sendMessage(chatId, message).catch((e) => logger.error('Error sending message', {message, e}));
    }
}

export default new TelegramBot('telegram-bot');
