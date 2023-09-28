import { MyContext } from "config";
import { firestoreApi } from "core/firestore";
import { firestore } from "core/firestore/config";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { Markup, Telegraf } from "telegraf";

export const useEventListenerInitialize = (bot: Telegraf<MyContext>, ctx: MyContext) => {
    const q = query(collection(firestore, "Events"), where("group", "==", ctx.session.user.group));
    if(ctx.session.user) {
        onSnapshot(q, (changes) => {
            changes.docChanges().forEach(change => {
                if(change.type === "added") {
                    const data = change.doc.data();
                    ctx.reply(
                        `Привет!\nУ тебя новое мероприятие\n\n${data['name']}\n${data['date']}\n${data['time']}\n${data['place']}`,
                        Markup.inlineKeyboard([
                            [Markup.button.callback('Я пойду', `add ${change.doc.id}`)],
                        ])
                    )
                }    
            })
        });
    }

    bot.action(/add (.+)/, async (ctx) => {
        let eventId = ctx.match[1];
        firestoreApi.event.addParticipant(ctx.session.user.uid!, eventId!);
    })
}