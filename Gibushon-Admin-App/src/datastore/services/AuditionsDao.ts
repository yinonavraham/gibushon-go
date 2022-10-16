import {collection, doc, getDoc, setDoc, getDocs, query, where} from "firebase/firestore";
import {db} from "@/services/FirebaseService";
import {NotFoundError, ObjectableConverter, UniqueIDPrefix, updateEntityMetadata} from "@/datastore/services/Common";
import {Audition} from "@/datastore/models/audition/Audition";
import type {AuditionID} from "@/datastore/models/audition/Audition";
import {generateUniqueID} from "@/utils/UniqueID";

export const auditionsRef = collection(db, "auditions");

export async function fetchAuditions(): Promise<Array<Audition>> {
    const q = query(auditionsRef)
        .withConverter(new AuditionConverter());
    const querySnap = await getDocs(q);
    const result: Array<Audition> = [];
    querySnap.forEach(qDocSnap => result.push(qDocSnap.data()));
    return result;
}

export async function fetchAudition(auditionID: AuditionID): Promise<Audition> {
    const docRef = doc(auditionsRef, auditionID).withConverter(new AuditionConverter());
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
        throw new NotFoundError("Audition '" + auditionID + "' not found");
    }
    return docSnap.data();
}

export async function saveAudition(audition: Audition): Promise<Audition> {
    updateEntityMetadata(audition.metadata);
    if (!audition.id) audition.id = generateUniqueID(UniqueIDPrefix.Audition);
    const docRef = doc(auditionsRef, audition.id).withConverter(new AuditionConverter());
    await setDoc(docRef, audition);
    return audition;
}

class AuditionConverter extends ObjectableConverter<Audition> {
    constructor() {
        super(() => new Audition());
    }
}