import firebase_app from "../config";
import { getFirestore, doc, getDoc, collection, getDocs } from "firebase/firestore";

const db = getFirestore(firebase_app)
export default async function getDoument(collection: string, id: string) {
    let docRef = doc(db, collection, id);

    let result = null;
    let error = null;

    try {
        result = await getDoc(docRef);
    } catch (e) {
        error = e;
    }

    return { result, error };
}
export async function getCollection(collectionName: string) {
    
    const collectionRef = collection(db, collectionName);

    let result = null;
    let error = null;

    try {
        //get entire collection
        let snapshot = await getDocs(collectionRef);
        result = snapshot.docs.map(doc => doc.data());
    } catch (e) {
        error = e;
    }

    return { result, error };
}