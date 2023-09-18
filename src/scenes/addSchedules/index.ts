import { Composer, Scenes } from "telegraf";
import { MyContext } from "config";
import { v4 as uuidv4 } from 'uuid';
import { firestoreApi } from "core/firestore";

const group_handler = new Composer<MyContext>();
const time_handler = new Composer<MyContext>();
const date_handler = new Composer<MyContext>();
const name_handler = new Composer<MyContext>();

group_handler.on('text', async (ctx) => {
    ctx.state['group'] = ctx.message.text;
    await ctx.reply("Напишите время мероприятия в формате HH:MM");
    return ctx.wizard.next();
});

time_handler.on('text', async (ctx) => {
    ctx.state['time'] = ctx.message.text;
    await ctx.reply("Напишите время мероприятия в формате HH:MM",);
    return ctx.wizard.next();
});

date_handler.on("text", async ctx => {
    ctx.state['date'] = ctx.message.text;
    await ctx.reply("Введите название мероприятия");
    return ctx.wizard.next();
});

name_handler.on("text", async ctx => {
    ctx.state['name'] = ctx.message.text;
    firestoreApi.schedule.addNewSchedule({...ctx.state, id: uuidv4()})
    return ctx.scene.leave();
});


const addSchedulesScene = new Scenes.WizardScene<MyContext>(
	"add-schedule",
	async ctx => {
		await ctx.reply(
			"Введите номер группы",
		)
		return ctx.wizard.next();
	},
	time_handler,
	date_handler,
	name_handler,
);

export {addSchedulesScene}