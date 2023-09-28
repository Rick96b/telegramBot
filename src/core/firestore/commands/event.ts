import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { Event } from "types";
import { firestore } from "../config";

export const addNewEvent = async (event: Event) => {
    if(event.id) {
        setDoc(doc(firestore, 'Events', event.id), event)
        updateDoc(doc(firestore, 'Groups', event.group!), {
            events: arrayUnion(event.id)
        })
    }
    else console.log('Event is not found!')
}

export const getEventById = async (eventId: string) => {
    return (await getDoc(doc(firestore, 'Events', eventId))).data() as Event || {};
}

export const addParticipant =  async (participantId: string, eventId:string) => {
    updateDoc(doc(firestore, 'Events', eventId), {
        participants: arrayUnion(participantId)
    })
}