import { config } from 'dotenv'
import { Telegraf, session } from "telegraf";
import { Scenes } from 'telegraf';
import { startScene } from '@scenes/start-scene';
import { registrationScene } from "@scenes/registration";
import { MyContext } from 'config';

config();

export const bot = new Telegraf<MyContext>(process.env['TELEGRAM_API_TOKEN'] || '');
const stage = new Scenes.Stage<MyContext>([startScene, registrationScene]);

bot.use(session());
bot.use(stage.middleware());
bot.start(async(ctx, next) => {
    ctx.scene.enter('start-scene')
    await next();
})
bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))