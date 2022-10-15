import {collection, doc, getDoc, setDoc, getDocs, query, where} from "firebase/firestore";
import {db} from "@/services/FirebaseService";
import {NotFoundError, ObjectableConverter, UniqueIDPrefix, updateEntityMetadata} from "@/datastore/services/Common";
import type {AuditionID} from "@/datastore/models/audition/Audition";
import {Reviewer} from "@/datastore/models/audition/Reviewer";
import type {ReviewerID} from "@/datastore/models/audition/Reviewer";
import {Candidate} from "@/datastore/models/audition/Candidate";
import type {CandidateID} from "@/datastore/models/audition/CandidateStatus";
import {generateUniqueID} from "@/utils/UniqueID";
import {CandidateStatus} from "@/datastore/models/audition/CandidateStatus";

export const auditionCandidateStatusesRef = collection(db, "audition_candidate_statuses");

export async function fetchAuditionCandidateStatuses(auditionID: AuditionID): Promise<Array<CandidateStatus>> {
    const q = query(auditionCandidateStatusesRef,
        where("auditionID", "==", auditionID))
        .withConverter(new CandidateStatusConverter());
    const querySnap = await getDocs(q);
    const result: Array<CandidateStatus> = [];
    querySnap.forEach(qDocSnap => result.push(qDocSnap.data()));
    return result;
}

export async function fetchCandidateStatus(candidateID: CandidateID): Promise<CandidateStatus> {
    const docRef = doc(auditionCandidateStatusesRef, candidateID).withConverter(new CandidateStatusConverter());
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
        throw new NotFoundError("Status for candidate '" + candidateID + "' not found");
    }
    return docSnap.data();
}

export async function saveCandidateStatus(candidateStatus: CandidateStatus): Promise<CandidateStatus> {
    updateEntityMetadata(candidateStatus.metadata);
    const docRef = doc(auditionCandidateStatusesRef, candidateStatus.candidateID).withConverter(new CandidateStatusConverter());
    await setDoc(docRef, candidateStatus);
    return candidateStatus;
}

class CandidateStatusConverter extends ObjectableConverter<CandidateStatus> {
    constructor() {
        super(() => new CandidateStatus());
    }
}