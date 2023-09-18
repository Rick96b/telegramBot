import { doc, setDoc } from "firebase/firestore";
import { User } from "types";
import { firestore } from "../config";

export const addNewUser = (user: User) => {
    if(user.uid) setDoc(doc(firestore, 'Users', user.uid), user);
    else console.log('User doesnt have an id');
}