import { doc, getDoc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { firestore } from "../config";

export const addNewGroup = (groupName: string, userUID: string) => {
    setDoc(doc(firestore, 'Groups', groupName), {
        name: groupName,
        mentor: userUID
    });
    if(doc(firestore, 'Groups', 'GroupNames')) {
        updateDoc(doc(firestore, 'Groups', 'GroupNames'), {
            names: arrayUnion(groupName) 
        })
    } else {
        setDoc(doc(firestore, 'Groups', 'GroupNames'), {
            names: [groupName],
        });
    }
}

export const getExistingGroupNames = async () => {
    console.log((await getDoc(doc(firestore, 'Groups', 'GroupNames'))).data());
    return (await getDoc(doc(firestore, 'Groups', 'GroupNames'))).data() as {names: string[]} || {names: []};
}