export type User = Partial<{
	uid: string;
	name: string;
	surname: string;
	patronymic: string;
	group: string;
}>

export type Mentor = Partial<{
	uid: string;
	name: string;
	surname: string;
	patronymic: string;
	groups: string[];
}>

export type Event = Partial<{
	id: string;
	group: string;
	name: string;
	time: string;
	date: string;
	place: string;
	participants: string[];
}>

export type Group = Partial<{
	id: string;
	name: string;
	mentorUID: string;
	members: string[];
	events: string[];
}>