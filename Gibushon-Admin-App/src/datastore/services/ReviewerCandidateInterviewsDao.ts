import {collection, doc, getDoc, setDoc, getDocs, query, where} from "firebase/firestore";
import {db} from "@/services/FirebaseService";
import {NotFoundError, ObjectableConverter, UniqueIDPrefix, updateEntityMetadata} from "@/datastore/services/Common";
import type {ReviewerID} from "@/datastore/models/audition/Reviewer";
import type {CandidateID} from "@/datastore/models/audition/CandidateStatus";
import {ReviewerCandidateSummary} from "@/datastore/models/audition/ReviewerCandidateSummary";
import {ReviewerCandidateInterview} from "@/datastore/models/audition/ReviewerCandidateInterview";

export const reviewerCandidateInterviewsRef = collection(db, "reviewer_candidate_interviews");

export async function fetchReviewerCandidateInterviews(reviewerID: ReviewerID): Promise<Array<ReviewerCandidateInterview>> {
    const q = query(reviewerCandidateInterviewsRef,
        where("reviewerID", "==", reviewerID))
        .withConverter(new ReviewerCandidateInterviewConverter());
    const querySnap = await getDocs(q);
    const result: Array<ReviewerCandidateInterview> = [];
    querySnap.forEach(qDocSnap => result.push(qDocSnap.data()));
    return result;
}

export async function fetchReviewerCandidateInterview(reviewerID: ReviewerID, candidateID: CandidateID): Promise<ReviewerCandidateInterview> {
    const docRef = doc(reviewerCandidateInterviewsRef, reviewerCandidateID(reviewerID, candidateID)).withConverter(new ReviewerCandidateInterviewConverter());
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
        throw new NotFoundError("Interview for candidate '" + candidateID + "' not found");
    }
    return docSnap.data();
}

export async function saveReviewerCandidateInterview(reviewerCandidateInterview: ReviewerCandidateInterview): Promise<ReviewerCandidateInterview> {
    updateEntityMetadata(reviewerCandidateInterview.metadata);
    const docRef = doc(reviewerCandidateInterviewsRef, reviewerCandidateID(reviewerCandidateInterview.reviewerID, reviewerCandidateInterview.candidateID))
        .withConverter(new ReviewerCandidateInterviewConverter());
    await setDoc(docRef, reviewerCandidateInterview);
    return reviewerCandidateInterview;
}

function reviewerCandidateID(reviewerID: ReviewerID, candidateID: CandidateID): string {
    return `${reviewerID}_${candidateID}`
}

class ReviewerCandidateInterviewConverter extends ObjectableConverter<ReviewerCandidateInterview> {
    constructor() {
        super(() => new ReviewerCandidateInterview());
    }
}