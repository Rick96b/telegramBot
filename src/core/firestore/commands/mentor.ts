import { doc, getDoc, setDoc } from "firebase/firestore";
import { firestore } from "../config";
import { Mentor } from "types";

export const addNewMentor = (mentor: Mentor) => {
    if(mentor.uid) setDoc(doc(firestore, 'Mentors', mentor.uid), mentor);
    else console.log('Mentor doesnt have an id');
}

export const getMentorByUID = async (userUID: string) => {
    let mentor: Mentor = {}
    try {
        mentor = (await getDoc(doc(firestore, 'Mentors', userUID))).data() as Mentor;
    } catch(error){
        console.log(error)
    }
    return mentor;
}