import { MyContext } from "config";
import { Telegraf } from "telegraf";
import useMentorCommand from "./useMentorCommand";
import useMenuCommand from "./useMenuCommand";
import useStartCommand from "./useStartCommand";

export const useBotCommands = (bot: Telegraf<MyContext>) => {
    useMentorCommand(bot);
    useMenuCommand(bot);
    useStartCommand(bot);
}