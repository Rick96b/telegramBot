import { config } from 'dotenv'
import { Markup, Telegraf, session } from "telegraf";
import { Scenes } from 'telegraf';
import { registrationScene } from "@scenes/registration";
import { MyContext } from 'config';

config();

export const bot = new Telegraf<MyContext>(process.env['TELEGRAM_API_TOKEN'] || '');
const stage = new Scenes.Stage<MyContext>([registrationScene]);

bot.use(session());
bot.use(stage.middleware());
bot.start(async(ctx) => {
    return ctx.reply(
        'Привет!',
        Markup.inlineKeyboard([
            ctx.session.user ? [] : [Markup.button.callback('Регистрация', 'registration')],
        ])
    )
})

bot.command('menu', async (ctx) => {
    return ctx.reply(
        'Привет!',
        Markup.inlineKeyboard([
            ctx.session.user ? [] : [Markup.button.callback('Регистрация', 'registration')],
        ])
    )
})

bot.action('registration', async (ctx) => {
    await ctx.answerCbQuery();
    await ctx.scene.enter('registration')
})

bot.launch();
// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))