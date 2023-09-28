import { MyContext } from "config";
import { firestoreApi } from "core/firestore";
import { dateFormater } from "utils/dateFormater";

export const useEventNotificationInitialize = (ctx: MyContext) => {
    if(ctx.session.user) {
        setInterval(async () => {
            const events = await firestoreApi.group.getGroupByName(ctx.session.user.group!);
            events.events?.forEach(async (eventId) => {
                const event = await firestoreApi.event.getEventById(eventId);
                const eventDate = dateFormater(event.date!, event.time!);
                const currentDate = new Date()
                const dif = Math.round(((eventDate.getTime() - currentDate.getTime()) / 1000) / 60);
                if(dif < 60) {
                    ctx.sendMessage(`${event.name}`)
                }
            });
        }, 1000*60*30)
    }
}