import { Context, Scenes } from "telegraf";
import { User } from "types";


interface MyWizardSession extends Scenes.WizardSessionData {
	myWizardSessionProp: number;
}

interface MySession extends Scenes.WizardSession<MyWizardSession> {
	user: User
}

export interface MyContext extends Context {
	session: MySession;
	scene: Scenes.SceneContextScene<MyContext, MyWizardSession>;
	wizard: Scenes.WizardContextWizard<MyContext>;
}