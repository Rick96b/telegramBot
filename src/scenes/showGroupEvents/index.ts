import { MyContext } from "config";
import { firestoreApi } from "core/firestore";
import { event } from "core/firestore/commands";
import { Composer, Scenes } from "telegraf";

const group_handler = new Composer<MyContext>();

group_handler.on('text', async (ctx)=> {
    const groupName = await firestoreApi.group.getGroupByName(ctx.message.text);
    if(groupName) {
        groupName.events?.forEach(async (eventId) => 
            firestoreApi
            .event
            .getEventById(eventId)
            .then(event => ctx.reply(`${event.name}\n${event.date}\n${event.time}`))
        )
    }
    ctx.scene.leave();
})

const showGroupEventsScene = new Scenes.WizardScene<MyContext>(
	"show-group-events",
	async ctx => {
        await ctx.reply("Введите название группы");
		return ctx.wizard.next();
	},
    group_handler
);

export {showGroupEventsScene};