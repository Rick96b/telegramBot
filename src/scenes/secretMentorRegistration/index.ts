import { firestoreApi } from "core/firestore";
import { Composer, Scenes } from "telegraf";
import { MyContext } from "config";

const name_handler = new Composer<MyContext>();
const surname_handler = new Composer<MyContext>();
const patronymic_handler = new Composer<MyContext>();

name_handler.on('text', async (ctx) => {
    ctx.session.mentor = {};
    ctx.session.mentor.name = ctx.message.text;
    await ctx.reply("Введите свою фамилию");
    return ctx.wizard.next();
});

surname_handler.on("text", async ctx => {
    ctx.session.mentor.surname = ctx.message.text;
    await ctx.reply("Введите своё отчество");
    return ctx.wizard.next();
});

patronymic_handler.on("text", async ctx => {
    ctx.session.mentor.patronymic = ctx.message.text;
    ctx.session.mentor.uid = String(ctx.chat.id);
    firestoreApi.mentor.addNewMentor(ctx.session.mentor)
    ctx.reply("Отлично! Вы прошли регистрацию наставника");
    return ctx.scene.leave();
});

const secretMentorRegistrationScene = new Scenes.WizardScene<MyContext>(
	"mentor-registration",
	async ctx => {
        await ctx.reply("Давайте начнем регистрацию наставника\nВведите своё имя");
		return ctx.wizard.next();
	},
	name_handler,
	surname_handler,
	patronymic_handler,
);

export {secretMentorRegistrationScene};