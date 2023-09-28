import { MyContext } from "config";
import { useAuthInitialize } from "./useAuthInitialize";
import { useEventListenerInitialize } from "./useEventListenerInitialize";
import { useEventNotificationInitialize } from "./useEventNotificationInitialize";
import { Telegraf } from "telegraf";

export const useBotInitialization = async (ctx: MyContext, bot: Telegraf<MyContext>) => {
    await useAuthInitialize(ctx);
    useEventListenerInitialize(bot, ctx);
    useEventNotificationInitialize(ctx);
}