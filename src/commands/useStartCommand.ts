import { MyContext } from "config"
import { Markup, Telegraf } from "telegraf"

const useStartCommand = (bot: Telegraf<MyContext>) => {
    bot.start(async(ctx) => {
        return ctx.replyWithPhoto(
            'https://firebasestorage.googleapis.com/v0/b/telegrambot-5fe07.appspot.com/o/%D0%BD%D0%BE%D0%B2%D1%8B%D0%B9%20%D0%BB%D0%BE%D0%B3%D0%BE%D1%82%D0%B8%D0%BF%20%D1%8F%20%D0%B2%20%D0%B4%D0%B5%D0%BB%D0%B5%20(1).png?alt=media&token=56657093-a32f-4be4-a6e8-71461b542db2',
            Markup.inlineKeyboard([
                ctx.session.user || ctx.session.mentor ? [] : [Markup.button.callback('Регистрация', 'registration')],
                ctx.session.mentor ? [Markup.button.callback('Добавить групповое мероприятие', 'add-event')] : [],
                ctx.session.mentor ? [Markup.button.callback('Добавить группу', 'add-group')] : [],
                ctx.session.mentor ? [Markup.button.callback('Показать мероприятия группы', 'show-group-events')] : [],
            ])
        )
    })
}

export default useStartCommand;
