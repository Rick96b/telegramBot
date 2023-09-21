import { Composer, Scenes } from "telegraf";
import { MyContext } from "config";
import { v4 as uuidv4 } from 'uuid';
import { firestoreApi } from "core/firestore";
import { Event } from "types";

const group_handler = new Composer<MyContext>();
const time_handler = new Composer<MyContext>();
const date_handler = new Composer<MyContext>();
const name_handler = new Composer<MyContext>();

group_handler.on('text', async (ctx) => {
    const groupNames = await firestoreApi.group.getExistingGroupNames()
    let state = ctx.wizard.state as Event;
	if(groupNames.names.includes(ctx.message.text)) {
        state.group = ctx.message.text;
        await ctx.reply("Напишите время мероприятия в формате HH:MM");
        return ctx.wizard.next();
	} else {
		await ctx.reply("Такой группы не существует!",)
	}
});

time_handler.on('text', async (ctx) => {
    let state = ctx.wizard.state as Event;
    state.time = ctx.message.text;
    await ctx.reply("Напишите дату мероприятия");
    return ctx.wizard.next();
});

date_handler.on("text", async ctx => {
    let state = ctx.wizard.state as Event;
    state.date = ctx.message.text;
    await ctx.reply("Введите название мероприятия");
    return ctx.wizard.next();
});

name_handler.on("text", async ctx => {
    let state = ctx.wizard.state as Event;
    state.name = ctx.message.text;
    firestoreApi.event.addNewEvent({...state, id: uuidv4()})
    return ctx.scene.leave();
});


const addEventScene = new Scenes.WizardScene<MyContext>(
	"add-event",
	async ctx => {
		await ctx.reply(
			"Введите название группы",
		)
		return ctx.wizard.next();
	},
    group_handler,
	time_handler,
	date_handler,
	name_handler,
);

export {addEventScene}