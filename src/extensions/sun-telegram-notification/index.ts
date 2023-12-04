import Extension from "../../core/abstract-extension";
import telegramBot from "../telegram-bot/index";
import deviceManager from "../../core/device-manager";
import {SunDevice} from "../sun";

const logger = require('../../core/logger').logger('sun-telegram-notification');

class Index extends Extension {
    getName(): string {
        return 'sun-telegram-notification';
    }

    dependsOn(): string[] {
        return ['sun', 'telegram-bot'];
    }

    init(): void {
        const chatId: number = parseFloat(process.env.TELEGRAM_CHAT_ID || '');
        const sun = deviceManager.getDeviceByName('Sun');
        if (!(sun instanceof SunDevice)) {
            logger.error('Sun not found');
            return;
        }
        sun.on('sunrise', () => {
            telegramBot.bot.telegram.sendMessage(chatId, '☀️ Good morning!');
        });
        sun.on('sunset', () => {
            telegramBot.bot.telegram.sendMessage(chatId, "🌜 It's going to be dark soon.");
        });
    }
}

export default new Index();
