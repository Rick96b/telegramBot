import { firestoreApi } from "core/firestore";
import { Composer, Scenes } from "telegraf";
import { MyContext } from "config";

const name_handler = new Composer<MyContext>();
const surname_handler = new Composer<MyContext>();
const patronymic_handler = new Composer<MyContext>();
const groupNumber_handler = new Composer<MyContext>();

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
    await ctx.reply("Введите свой номер группы");
    return ctx.wizard.next();
});

groupNumber_handler.on("text", async ctx => {
    ctx.session.user.groupNumber = ctx.message.text;
    ctx.reply("Отлично! Вы прошли регистрацию");
	firestoreApi.addNewUser(ctx.session.user)
    return ctx.scene.leave();
});

const registrationScene = new Scenes.WizardScene<MyContext>(
	"registration",
	async ctx => {
		await ctx.reply(
			"Давайте начнем регистрацию \nВведите своё имя",
		)
		return ctx.wizard.next();
	},
	name_handler,
	surname_handler,
	patronymic_handler,
	groupNumber_handler
);

export {registrationScene}