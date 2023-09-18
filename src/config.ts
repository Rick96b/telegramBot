import { Context, Scenes } from "telegraf";
import { Schedule, User } from "types";

interface MySession extends Scenes.WizardSession<Scenes.WizardSessionData> {
	user: User;
}

export interface MyContext extends Context {
	state: Schedule;
	session: MySession;
	scene: Scenes.SceneContextScene<MyContext, Scenes.WizardSessionData>;
	wizard: Scenes.WizardContextWizard<MyContext>;
}