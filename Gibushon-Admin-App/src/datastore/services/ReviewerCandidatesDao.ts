import {collection, doc, getDoc, setDoc, getDocs, query, where} from "firebase/firestore";
import {db} from "@/services/FirebaseService";
import {NotFoundError, ObjectableConverter, updateEntityMetadata} from "@/datastore/services/Common";
import type {ReviewerID} from "@/datastore/models/audition/Reviewer";
import type {CandidateID} from "@/datastore/models/audition/CandidateStatus";
import {ReviewerCandidate} from "@/datastore/models/audition/ReviewerCandidate";

export const reviewerCandidatesRef = collection(db, "reviewer_candidates");

export async function fetchReviewerCandidates(reviewerID: ReviewerID): Promise<Array<ReviewerCandidate>> {
    const q = query(reviewerCandidatesRef,
        where("reviewerID", "==", reviewerID))
        .withConverter(new ReviewerCandidateConverter());
    const querySnap = await getDocs(q);
    const result: Array<ReviewerCandidate> = [];
    querySnap.forEach(qDocSnap => result.push(qDocSnap.data()));
    return result;
}

export async function fetchReviewerCandidate(reviewerID: ReviewerID, candidateID: CandidateID): Promise<ReviewerCandidate> {
    const docRef = doc(reviewerCandidatesRef, reviewerCandidateID(reviewerID, candidateID)).withConverter(new ReviewerCandidateConverter());
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
        throw new NotFoundError("Status for candidate '" + candidateID + "' not found");
    }
    return docSnap.data();
}

export async function saveReviewerCandidate(reviewerCandidate: ReviewerCandidate): Promise<ReviewerCandidate> {
    updateEntityMetadata(reviewerCandidate.metadata);
    const docRef = doc(reviewerCandidatesRef, reviewerCandidateID(reviewerCandidate.reviewerID, reviewerCandidate.candidateID))
        .withConverter(new ReviewerCandidateConverter());
    await setDoc(docRef, reviewerCandidate);
    return reviewerCandidate;
}

function reviewerCandidateID(reviewerID: ReviewerID, candidateID: CandidateID): string {
    return `${candidateID}_${reviewerID}`
}

class ReviewerCandidateConverter extends ObjectableConverter<ReviewerCandidate> {
    constructor() {
        super(() => new ReviewerCandidate());
    }
}