import Extension from "../../core/abstract-extension";
import {Context, Telegraf} from "telegraf";
const logger = require('../../core/logger').logger('telegram');

class TelegramBot extends Extension {
    public readonly bot: Telegraf<Context>;

    constructor() {
        super();
        this.bot = new Telegraf(process.env.TELEGRAM_ACCESS_TOKEN || (() => {
            throw Error('Telegram access token is not set!');
        })());
    }

    getName(): string {
        return 'telegram-bot';
    }

    run(): void {
        this.bot.start((ctx) => {
            ctx.reply('Welcome!');
            console.log(ctx.update.message.chat.id);
        });

        this.bot.launch()
            .then(() => {
                logger.debug('Telegram bot has been started');

                process.once('SIGINT', () => {
                    this.bot.stop('SIGINT');
                });

                process.once('SIGTERM', () => {
                    this.bot.stop('SIGTERM')
                })
            }).catch(reason => {
            // todo: restart bot if disconnected
            logger.error(reason);
        });
    }
}

export default new TelegramBot();
