import { MyContext } from "config";
import { firestoreApi } from "core/firestore";
import { event } from "core/firestore/commands";
import { Composer, Markup, Scenes } from "telegraf";

const group_handler = new Composer<MyContext>();

group_handler.on('text', async (ctx)=> {
    const group = await firestoreApi.group.getGroupByName(ctx.message.text);
    if(group) {
        group.events?.forEach(async (eventId) => 
            firestoreApi
            .event
            .getEventById(eventId)
            .then(async (event) => await ctx.reply(
                `${event.name}\n${event.date}\n${event.time}\n${event.place}`,
                Markup.inlineKeyboard([
                    [Markup.button.callback('Показать участников', `show-event-members ${event.id}`)],
                ])
            ))
        )
    }
    ctx.scene.leave();
})

const showGroupEventsScene = new Scenes.WizardScene<MyContext>(
	"show-group-events",
	async ctx => {
        let message = "Введите нужную группу \n\nДоступные группы:";
        ctx.session.mentor.groups?.forEach(group => message += `\n${group}`)
        await ctx.reply(message);
		return ctx.wizard.next();
	},
    group_handler
);

export {showGroupEventsScene};