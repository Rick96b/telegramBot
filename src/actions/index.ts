import { MyContext } from "config";
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
}