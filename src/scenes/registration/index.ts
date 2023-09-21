import { firestoreApi } from "core/firestore";
import { Composer, Scenes } from "telegraf";
import { MyContext } from "config";

const name_handler = new Composer<MyContext>();
const surname_handler = new Composer<MyContext>();
const patronymic_handler = new Composer<MyContext>();
const groupNumber_handler = new Composer<MyContext>();

groupNumber_handler.on("text", async ctx => {
    const groupNames = await firestoreApi.group.getExistingGroupNames();
    if(groupNames.names.includes(ctx.message.text)) {
        ctx.session.user.groupNumber = ctx.message.text;
        ctx.reply('Введите своё имя')
        ctx.wizard.next();
    } else {
        await ctx.reply("Группа не найдена!\nПопробуй еще раз");
    }
});

name_handler.on('text', async (ctx) => {
    ctx.session.user = {};
    ctx.session.user.name = ctx.message.text;
    await ctx.reply("Введите свою фамилию");
    return ctx.wizard.next();
});

surname_handler.on("text", async ctx => {
    ctx.session.user.surname = ctx.message.text;
    await ctx.reply("Введите своё отчество");
    return ctx.wizard.next();
});

patronymic_handler.on("text", async ctx => {
    ctx.session.user.patronymic = ctx.message.text;
    ctx.session.user.uid = String(ctx.chat.id);
    firestoreApi.user.addNewUser(ctx.session.user)
    ctx.reply("Отлично! Вы прошли регистрацию");
    return ctx.scene.leave();
});

const registrationScene = new Scenes.WizardScene<MyContext>(
	"registration",
	async ctx => {
        await ctx.reply("Давайте начнем регистрацию \nВведите название своей группы");
		return ctx.wizard.next();
	},
    groupNumber_handler,
	name_handler,
	surname_handler,
	patronymic_handler,
);

export {registrationScene}