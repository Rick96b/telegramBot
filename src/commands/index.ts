import { MyContext } from "config";
import { Telegraf } from "telegraf";
import useMentorCommand from "./useMentorCommand";
import useMenuCommand from "./useMenuCommand";

export const useBotCommands = (bot: Telegraf<MyContext>) => {
    useMentorCommand(bot);
    useMenuCommand(bot);
}