import { MyContext } from "config";
import { Markup } from "telegraf";
import { Scenes } from "telegraf";

export const startScene = new Scenes.BaseScene<MyContext>('start-scene');
startScene.enter(async (ctx, next) => {
    return ctx.reply(
        'Привет!',
        Markup.inlineKeyboard([
            [Markup.button.callback('Регистрация', 'registration')],
        ])
    )

    await next();
})

startScene.action('registration', async (ctx) => {
    await ctx.answerCbQuery();
    await ctx.scene.enter('registration')
})