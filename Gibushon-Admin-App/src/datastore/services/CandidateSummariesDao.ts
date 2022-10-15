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
import {CandidateSummary} from "@/datastore/models/audition/CandidateSummary";

export const auditionCandidateSummariesRef = collection(db, "audition_candidate_summaries");

export async function fetchAuditionCandidateSummaries(auditionID: AuditionID): Promise<Array<CandidateSummary>> {
    const q = query(auditionCandidateSummariesRef,
        where("auditionID", "==", auditionID))
        .withConverter(new CandidateSummaryConverter());
    const querySnap = await getDocs(q);
    const result: Array<CandidateSummary> = [];
    querySnap.forEach(qDocSnap => result.push(qDocSnap.data()));
    return result;
}

export async function fetchCandidateSummary(candidateID: CandidateID): Promise<CandidateSummary> {
    const docRef = doc(auditionCandidateSummariesRef, candidateID).withConverter(new CandidateSummaryConverter());
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
        throw new NotFoundError("Summary for candidate '" + candidateID + "' not found");
    }
    return docSnap.data();
}

export async function saveCandidateSummary(candidateSummary: CandidateSummary): Promise<CandidateSummary> {
    updateEntityMetadata(candidateSummary.metadata);
    const docRef = doc(auditionCandidateSummariesRef, candidateSummary.candidateID).withConverter(new CandidateSummaryConverter());
    await setDoc(docRef, candidateSummary);
    return candidateSummary;
}

class CandidateSummaryConverter extends ObjectableConverter<CandidateSummary> {
    constructor() {
        super(() => new CandidateSummary());
    }
}