import { MyContext } from "config";
import { firestoreApi } from "core/firestore";

export const useAuthInitialize = async (ctx: MyContext) => {
    ctx.session.user = await firestoreApi.user.getUserByUID(String(ctx.chat?.id));
    ctx.session.mentor = await firestoreApi.mentor.getMentorByUID(String(ctx.chat?.id));
}