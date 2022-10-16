import {collection, doc, getDoc, setDoc, getDocs, query, where} from "firebase/firestore";
import {db} from "@/services/FirebaseService";
import {NotFoundError, ObjectableConverter, UniqueIDPrefix, updateEntityMetadata} from "@/datastore/services/Common";
import type {AuditionID} from "@/datastore/models/audition/Audition";
import {Candidate} from "@/datastore/models/audition/Candidate";
import type {CandidateID} from "@/datastore/models/audition/CandidateStatus";
import {generateUniqueID} from "@/utils/UniqueID";

export const auditionCandidatesRef = collection(db, "audition_candidates");

export async function fetchAuditionCandidates(auditionID: AuditionID): Promise<Array<Candidate>> {
    const q = query(auditionCandidatesRef,
        where("auditionID", "==", auditionID))
        .withConverter(new CandidateConverter());
    const querySnap = await getDocs(q);
    const result: Array<Candidate> = [];
    querySnap.forEach(qDocSnap => result.push(qDocSnap.data()));
    return result;
}

export async function fetchCandidate(candidateID: CandidateID): Promise<Candidate> {
    const docRef = doc(auditionCandidatesRef, candidateID).withConverter(new CandidateConverter());
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
        throw new NotFoundError("Candidate '" + candidateID + "' not found");
    }
    return docSnap.data();
}

export async function saveCandidate(candidate: Candidate): Promise<Candidate> {
    updateEntityMetadata(candidate.metadata);
    if (!candidate.id) candidate.id = generateUniqueID(UniqueIDPrefix.Candidate);
    const docRef = doc(auditionCandidatesRef, candidate.id).withConverter(new CandidateConverter());
    await setDoc(docRef, candidate);
    return candidate;
}

class CandidateConverter extends ObjectableConverter<Candidate> {
    constructor() {
        super(() => new Candidate());
    }
}