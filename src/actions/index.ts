import { MyContext } from "config";
import { firestoreApi } from "core/firestore";
import { Telegraf } from "telegraf";

export const useBotActions = (bot: Telegraf<MyContext>) => {
    bot.action('registration', async (ctx) => {
        await ctx.answerCbQuery();
        await ctx.scene.enter('registration')
    })
    
    bot.action('add-event', async (ctx) => {
        await ctx.answerCbQuery();
        await ctx.scene.enter('add-event')
    })
    
    bot.action('add-group', async (ctx) => {
        await ctx.answerCbQuery();
        await ctx.scene.enter('add-group')
    })

    bot.action('show-group-events', async (ctx) => {
        await ctx.answerCbQuery();
        await ctx.scene.enter('show-group-events')
    })

    bot.action('show-user-events', async (ctx) => {
        await ctx.answerCbQuery();
        const group = await firestoreApi.group.getGroupByName(ctx.session.user.group!);
        if(group) {
            group.events?.forEach(async (eventId) => 
                firestoreApi
                .event
                .getEventById(eventId)
                .then(event => ctx.reply(`${event.name}\n${event.date}\n${event.time}\n${event.place}`))
            )
        }
    })

    bot.action(/show-event-members (.+)/, async (ctx) => {
        let eventId = ctx.match[1];
        await ctx.answerCbQuery();
        const event = await firestoreApi.event.getEventById(eventId!);
        const participantsPromise = event.participants!.map(async (participantId) => {
            const participant = await firestoreApi.user.getUserByUID(participantId);
            return `${participant.surname} ${participant.name} ${participant.patronymic}\n`
        })
        Promise.all(participantsPromise)
        .then(async (result) => await ctx.reply(result.join() || 'Участников пока нет!'))
    })
}