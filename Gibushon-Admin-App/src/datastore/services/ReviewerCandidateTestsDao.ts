import {collection, doc, getDoc, setDoc, getDocs, query, where} from "firebase/firestore";
import {db} from "@/services/FirebaseService";
import {NotFoundError, ObjectableConverter, UniqueIDPrefix, updateEntityMetadata} from "@/datastore/services/Common";
import type {ReviewerID} from "@/datastore/models/audition/Reviewer";
import type {CandidateID} from "@/datastore/models/audition/CandidateStatus";
import {ReviewerCandidateTest} from "@/datastore/models/audition/ReviewerCandidateTest";
import type {ReviewerCandidateTestID} from "@/datastore/models/audition/ReviewerCandidateTest";
import type {TeamTestID} from "@/datastore/models/audition/ReviewerTeamTest";

export const reviewerCandidateTestsRef = collection(db, "reviewer_candidate_tests");

export async function fetchReviewerCandidateTests(reviewerID: ReviewerID, candidateID: CandidateID): Promise<Array<ReviewerCandidateTest>> {
    const q = query(reviewerCandidateTestsRef,
        where("reviewerID", "==", reviewerID),
        where("candidateID", "==", candidateID))
        .withConverter(new ReviewerCandidateTestConverter());
    const querySnap = await getDocs(q);
    const result: Array<ReviewerCandidateTest> = [];
    querySnap.forEach(qDocSnap => result.push(qDocSnap.data()));
    return result;
}

export async function fetchReviewerCandidateTestsByTest(reviewerID: ReviewerID, teamTestID: TeamTestID): Promise<Array<ReviewerCandidateTest>> {
    const q = query(reviewerCandidateTestsRef,
        where("reviewerID", "==", reviewerID),
        where("teamTestID", "==", teamTestID))
        .withConverter(new ReviewerCandidateTestConverter());
    const querySnap = await getDocs(q);
    const result: Array<ReviewerCandidateTest> = [];
    querySnap.forEach(qDocSnap => result.push(qDocSnap.data()));
    return result;
}

export async function fetchReviewerCandidateTest(id: ReviewerCandidateTestID): Promise<ReviewerCandidateTest> {
    const docRef = doc(reviewerCandidateTestsRef, id).withConverter(new ReviewerCandidateTestConverter());
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
        throw new NotFoundError("Reviewer candidate test '" + id + "' not found");
    }
    return docSnap.data();
}

export async function saveReviewerCandidate(reviewerCandidateTest: ReviewerCandidateTest): Promise<ReviewerCandidateTest> {
    updateEntityMetadata(reviewerCandidateTest.metadata);
    if (!reviewerCandidateTest.id) reviewerCandidateTest.id = `${reviewerCandidateTest.reviewerID}_${reviewerCandidateTest.candidateID}_${reviewerCandidateTest.teamTestID}`;
    const docRef = doc(reviewerCandidateTestsRef, reviewerCandidateTest.id)
        .withConverter(new ReviewerCandidateTestConverter());
    await setDoc(docRef, reviewerCandidateTest);
    return reviewerCandidateTest;
}

class ReviewerCandidateTestConverter extends ObjectableConverter<ReviewerCandidateTest> {
    constructor() {
        super(() => new ReviewerCandidateTest());
    }
}