import { config } from 'dotenv'
import { Telegraf } from "telegraf";

config();

export const bot = new Telegraf(process.env['TELEGRAM_API_TOKEN'] || '');

bot.launch();
bot.start((ctx) => ctx.reply('hehe'))
// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))