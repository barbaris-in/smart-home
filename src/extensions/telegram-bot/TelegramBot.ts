import Extension from "../../core/abstract-extension";
import {Context, Telegraf} from "telegraf";
import Queue from "./queue";

const logger = require('../../core/logger').logger('telegram');

class TelegramBot extends Extension {
    private readonly bot: Telegraf<Context>;
    private readonly telegramQueue: Queue;

    constructor(name: string) {
        super(name);
        this.bot = new Telegraf(process.env.TELEGRAM_ACCESS_TOKEN || (() => {
            throw Error('Telegram access token is not set!');
        })());

        this.telegramQueue = new Queue((): Promise<void> => {
                this.bot.start((ctx) => {
                    ctx.reply('Welcome!');
                    logger.debug('Bot started', ctx);
                });
                this.bot.launch().then(() => {
                    logger.debug('Telegram bot started');
                });

                return new Promise((resolve, reject) => {
                    resolve();
                });
            }, (target: number, message: string) => {
                logger.debug('Telegram send message', {target, message});
                this.bot.telegram.sendMessage(target, message)
                    .catch((e) => logger.error('Error sending message', {message, e}));
            },
            5000);
    }

    destructor(): void {
        logger.debug('Stopping Telegram bot');
        this.bot.stop();
    }

    sendMessage(chatId: number, message: string, silent: boolean = false): void {
        // toto: implement silent mode
        this.telegramQueue.add(chatId, message);
    }
}

export default new TelegramBot('telegram-bot');
