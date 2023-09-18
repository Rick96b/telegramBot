import { doc, getDoc, setDoc } from "firebase/firestore";
import { User } from "types";
import { firestore } from "../config";

export const addNewUser = (user: User) => {
    if(user.uid) setDoc(doc(firestore, 'Users', user.uid), user);
    else console.log('User doesnt have an id');
}

export const getUserByUID = async (userUID: string) => {
    let user: User = {}
    try {
        user = (await getDoc(doc(firestore, 'Users', userUID))).data() as User;
        console.log(user)
    } catch(error){
        console.log(error)
    }
    return user;
}