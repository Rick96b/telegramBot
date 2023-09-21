import { config } from 'dotenv'
import { Telegraf, session } from "telegraf";
import { Scenes } from 'telegraf';
import { registrationScene } from "@scenes/registration";
import { MyContext } from 'config';
import { addEventScene } from '@scenes/addNewEvent';
import { addGroupScene } from '@scenes/addNewGroup';
import { firestoreApi } from 'core/firestore';
import { secretMentorRegistrationScene } from '@scenes/secretMentorRegistration';
import { useBotCommands } from 'commands';
import { useBotActions } from 'actions';
import { showGroupEventsScene } from '@scenes/showGroupEvents';

config();

export const bot = new Telegraf<MyContext>(process.env['TELEGRAM_API_TOKEN'] || '');
const stage = new Scenes.Stage<MyContext>([
    registrationScene, 
    addEventScene, 
    addGroupScene, 
    secretMentorRegistrationScene,
    showGroupEventsScene
]);

bot.use(session());
bot.use(stage.middleware());
bot.use(async (ctx, next) => {
    ctx.session.user = await firestoreApi.user.getUserByUID(String(ctx.chat?.id));
    ctx.session.mentor = await firestoreApi.mentor.getMentorByUID(String(ctx.chat?.id));
    next();
})

useBotCommands(bot);
useBotActions(bot);

bot.launch();
// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))