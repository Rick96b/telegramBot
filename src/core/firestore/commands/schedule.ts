import { doc, setDoc } from "firebase/firestore";
import { Schedule } from "types";
import { firestore } from "../config";

export const addNewSchedule = (schedule: Schedule) => {
    if(schedule.id) setDoc(doc(firestore, 'Schedules', schedule.id), schedule);
    else console.log('Schedule doesnt have an id')
}