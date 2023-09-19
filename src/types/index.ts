export type User = Partial<{
	uid: string;
	name: string;
	surname: string;
	patronymic: string;
	groupNumber: string;
	isMentor: boolean;
}>

export type Schedule = Partial<{
	id: string;
	griup: string;
	name: string;
	time: string;
	date: string;
}>

export type Group = Partial<{
	name: string;
	mentorUID: string;
	members: string[];
	events: string[];
}>