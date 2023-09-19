import { config } from 'dotenv'
import { Markup, Telegraf, session } from "telegraf";
import { Scenes } from 'telegraf';
import { registrationScene } from "@scenes/registration";
import { MyContext } from 'config';
import { addSchedulesScene } from '@scenes/addSchedules';
import { addGroupScene } from '@scenes/addNewGroup';
import { firestoreApi } from 'core/firestore';

config();

export const bot = new Telegraf<MyContext>(process.env['TELEGRAM_API_TOKEN'] || '');
const stage = new Scenes.Stage<MyContext>([registrationScene, addSchedulesScene, addGroupScene]);

bot.use(session());
bot.use(stage.middleware());
bot.use(async (ctx, next) => {
    ctx.session.user = await firestoreApi.user.getUserByUID(String(ctx.chat?.id))
    next();
})
bot.start(async(ctx) => {
    return ctx.reply(
        'Я в деле!',
        Markup.inlineKeyboard([
            ctx.session.user ? [] : [Markup.button.callback('Регистрация', 'registration')],
            ctx.session.user?.isMentor ? [Markup.button.callback('Добавить групповое мероприятие', 'add-schedule')] : [],
            ctx.session.user?.isMentor ? [Markup.button.callback('Добавить группу', 'add-group')] : []
        ])
    )
})

bot.command('menu', async (ctx) => {
    console.log(ctx.session.user)
    return ctx.reply(
        'Я в деле!',
        Markup.inlineKeyboard([
            ctx.session.user ? [] : [Markup.button.callback('Регистрация', 'registration')],
            ctx.session.user?.isMentor ? [Markup.button.callback('Добавить групповое мероприятие', 'add-schedule')] : [],
            ctx.session.user?.isMentor ? [Markup.button.callback('Добавить группу', 'add-group')] : []
        ])
    )
})

bot.action('registration', async (ctx) => {
    await ctx.answerCbQuery();
    await ctx.scene.enter('registration')
})

bot.action('add-schedule', async (ctx) => {
    await ctx.answerCbQuery();
    await ctx.scene.enter('add-schedule')
})

bot.action('add-group', async (ctx) => {
    await ctx.answerCbQuery();
    await ctx.scene.enter('add-group')
})


bot.launch();
// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))