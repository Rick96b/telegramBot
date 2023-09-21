import { MyContext } from "config"
import { Telegraf } from "telegraf"

const useMentorCommand = (bot: Telegraf<MyContext>) => {
    bot.hears('Mentor', async (ctx) => {
        await ctx.scene.enter('mentor-registration')
    })
}

export default useMentorCommand;