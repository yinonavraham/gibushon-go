import {collection, doc, getDoc, setDoc, getDocs, query, where} from "firebase/firestore";
import {db} from "@/services/FirebaseService";
import {NotFoundError, ObjectableConverter, UniqueIDPrefix, updateEntityMetadata} from "@/datastore/services/Common";
import type {ReviewerID} from "@/datastore/models/audition/Reviewer";
import type {CandidateID} from "@/datastore/models/audition/CandidateStatus";
import {ReviewerCandidateSummary} from "@/datastore/models/audition/ReviewerCandidateSummary";

export const reviewerCandidateSummariesRef = collection(db, "reviewer_candidate_summaries");

export async function fetchReviewerCandidateSummaries(reviewerID: ReviewerID): Promise<Array<ReviewerCandidateSummary>> {
    const q = query(reviewerCandidateSummariesRef,
        where("reviewerID", "==", reviewerID))
        .withConverter(new ReviewerCandidateSummaryConverter());
    const querySnap = await getDocs(q);
    const result: Array<ReviewerCandidateSummary> = [];
    querySnap.forEach(qDocSnap => result.push(qDocSnap.data()));
    return result;
}

export async function fetchReviewerCandidateSummary(reviewerID: ReviewerID, candidateID: CandidateID): Promise<ReviewerCandidateSummary> {
    const docRef = doc(reviewerCandidateSummariesRef, reviewerCandidateID(reviewerID, candidateID)).withConverter(new ReviewerCandidateSummaryConverter());
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
        throw new NotFoundError("Summary for candidate '" + candidateID + "' not found");
    }
    return docSnap.data();
}

export async function saveReviewerCandidateSummary(reviewerCandidateSummary: ReviewerCandidateSummary): Promise<ReviewerCandidateSummary> {
    updateEntityMetadata(reviewerCandidateSummary.metadata);
    const docRef = doc(reviewerCandidateSummariesRef, reviewerCandidateID(reviewerCandidateSummary.reviewerID, reviewerCandidateSummary.candidateID))
        .withConverter(new ReviewerCandidateSummaryConverter());
    await setDoc(docRef, reviewerCandidateSummary);
    return reviewerCandidateSummary;
}

function reviewerCandidateID(reviewerID: ReviewerID, candidateID: CandidateID): string {
    return `${reviewerID}_${candidateID}`
}

class ReviewerCandidateSummaryConverter extends ObjectableConverter<ReviewerCandidateSummary> {
    constructor() {
        super(() => new ReviewerCandidateSummary());
    }
}