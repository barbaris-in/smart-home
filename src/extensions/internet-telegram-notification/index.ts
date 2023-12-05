import Extension from "../../core/abstract-extension";
import telegramBot from "../telegram-bot/index";
import deviceManager from "../../core/device-manager";
import {InternetDevice} from "../internet";

const logger = require('../../core/logger').logger('internet-telegram-notification');

class Index extends Extension {
    getName(): string {
        return 'internet-telegram-notification';
    }

    dependsOn(): string[] {
        return ['internet', 'telegram-bot'];
    }

    init(): void {
        const chatId: number = parseFloat(process.env.TELEGRAM_CHAT_ID || '');
        const internet = deviceManager.getDeviceByName('Internet');
        if (!(internet instanceof InternetDevice)) {
            logger.error('Internet not found');
            return;
        }
        internet.onConnected(() => {
            telegramBot.bot.telegram.sendMessage(chatId, '🛜 Internet is back online!');
        });
        internet.onDisconnected(() => {
            logger.info('Internet is down');
            telegramBot.bot.telegram.sendMessage(chatId, `🛜💔 Internet has been down since ${new Date().toLocaleString()}`);
        });
    }
}

export default new Index();
