import { Context, Scenes } from "telegraf";
import { Event, Mentor, User } from "types";

interface MySession extends Scenes.WizardSession<Scenes.WizardSessionData> {
	user: User;
	mentor: Mentor;
}

export interface MyContext extends Context {
	session: MySession;
	scene: Scenes.SceneContextScene<MyContext, Scenes.WizardSessionData>;
	wizard: Scenes.WizardContextWizard<MyContext>;
}