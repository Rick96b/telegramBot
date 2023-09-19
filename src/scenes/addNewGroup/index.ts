import { MyContext } from "config";
import { firestoreApi } from "core/firestore";
import { Composer, Scenes } from "telegraf";

const text_handler = new Composer<MyContext>();

text_handler.on('text', async (ctx) => {
	const groupNames = await firestoreApi.group.getExistingGroupNames()
	if(groupNames.names.includes(ctx.message.text)) {
		await ctx.reply("Такое название группы уже существует")
		await ctx.scene.reenter();
	} else {
		firestoreApi.group.addNewGroup(ctx.message.text, String(ctx.chat.id))
		await ctx.reply("Группа создана!",)
		return ctx.scene.leave();
	}
})

const addGroupScene = new Scenes.WizardScene<MyContext>(
	"add-group",
	async ctx => {
		await ctx.reply(
			"Введите название группы",
		)
		return ctx.wizard.next();
	},
	text_handler,
);

export {addGroupScene}