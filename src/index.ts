import { config } from 'dotenv'
import { Markup, Telegraf, session } from "telegraf";
import { Scenes } from 'telegraf';
import { registrationScene } from "@scenes/registration";
import { MyContext } from 'config';
import { addEventScene } from '@scenes/addNewEvent';
import { addGroupScene } from '@scenes/addNewGroup';
import { secretMentorRegistrationScene } from '@scenes/secretMentorRegistration';
import { useBotCommands } from 'commands';
import { useBotActions } from 'actions';
import { showGroupEventsScene } from '@scenes/showGroupEvents';
import { useBotInitialization } from 'bot-initialization';

config();

export const bot = new Telegraf<MyContext>(process.env['TELEGRAM_API_TOKEN'] || '');
const stage = new Scenes.Stage<MyContext>([
    registrationScene, 
    addEventScene, 
    addGroupScene, 
    secretMentorRegistrationScene,
    showGroupEventsScene
]);

stage.command('cancel', async (ctx) => {
    await ctx.scene.leave()
    await ctx.reply('Действие отменено')
})

bot.use(session());
bot.use(stage.middleware());
bot.start(async (ctx) => {
    await useBotInitialization(ctx, bot)
    return ctx.replyWithPhoto(
        'https://firebasestorage.googleapis.com/v0/b/telegrambot-5fe07.appspot.com/o/%D0%BD%D0%BE%D0%B2%D1%8B%D0%B9%20%D0%BB%D0%BE%D0%B3%D0%BE%D1%82%D0%B8%D0%BF%20%D1%8F%20%D0%B2%20%D0%B4%D0%B5%D0%BB%D0%B5%20(1).png?alt=media&token=56657093-a32f-4be4-a6e8-71461b542db2',
        Markup.inlineKeyboard([
            ctx.session.user || ctx.session.mentor ? [] : [Markup.button.callback('Регистрация', 'registration')],
            ctx.session.user ? [Markup.button.callback('Показать ваши мероприятия', 'show-user-events')] : [],
            ctx.session.mentor ? [Markup.button.callback('Добавить групповое мероприятие', 'add-event')] : [],
            ctx.session.mentor ? [Markup.button.callback('Добавить группу', 'add-group')] : [],
            ctx.session.mentor ? [Markup.button.callback('Показать мероприятия группы', 'show-group-events')] : [],
        ])
    )
})
useBotCommands(bot);
useBotActions(bot);

bot.launch();
// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))