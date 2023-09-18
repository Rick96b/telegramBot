import { Composer, Scenes } from "telegraf";
import { MyContext } from "config";

const time_handler = new Composer<MyContext>();
const date_handler = new Composer<MyContext>();
const name_handler = new Composer<MyContext>();

time_handler.on('text', async (ctx) => {
    ctx.state['schedule'] = {};
    ctx.state['schedule'].time = ctx.message.text;
    await ctx.reply("Введите дату мероприятия в формате DD.MM.YYYY");
    return ctx.wizard.next();
});

date_handler.on("text", async ctx => {
    ctx.state['schedule'].date = ctx.message.text;
    await ctx.reply("Введите название мероприятия");
    return ctx.wizard.next();
});

name_handler.on("text", async ctx => {
    ctx.state['schedule'].name = ctx.message.text;
    await ctx.reply("Введите свой номер группы");
    return ctx.scene.leave();
});


const addSchedulesScene = new Scenes.WizardScene<MyContext>(
	"add-schedule",
	async ctx => {
		await ctx.reply(
			"Напишите время мероприятия в формате HH:MM",
		)
		return ctx.wizard.next();
	},
	time_handler,
	date_handler,
	name_handler,
);

export {addSchedulesScene}