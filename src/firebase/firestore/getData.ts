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
export async function getCollection<T>(collectionName: string): Promise<{ result: T[]; error: Error | null }> {
    
    const collectionRef = collection(db, collectionName);

    let result = null;
    let error = null;

    try {
        //get entire collection
        let snapshot = await getDocs(collectionRef);
    const result = snapshot.docs.map((doc) => doc.data()) as T[];
        return { result, error: null };
    } catch (e) {
        return { result: [], error };
    }}