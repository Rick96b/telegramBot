import { doc, getDoc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { firestore } from "../config";
import { Group } from "types";

export const addNewGroup = async (groupName: string, userUID: string) => {
    setDoc(doc(firestore, 'Groups', groupName), {
        name: groupName,
        mentor: userUID
    });
    try {
        await updateDoc(doc(firestore, 'Groups', 'GroupNames'), {
            names: arrayUnion(groupName) 
        })
    } catch(error){
        await setDoc(doc(firestore, 'Groups', 'GroupNames'), {
            names: [groupName],
        });
    }
}

export const getExistingGroupNames = async () => {
    return (await getDoc(doc(firestore, 'Groups', 'GroupNames'))).data() as {names: string[]} || {names: []};
}

export const getGroupByName = async (groupName: string) => {
    return (await getDoc(doc(firestore, 'Groups', groupName))).data() as Group || {};
}