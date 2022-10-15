import {collection, doc, getDoc, setDoc, getDocs, query, where} from "firebase/firestore";
import {db} from "@/services/FirebaseService";
import {NotFoundError, ObjectableConverter, UniqueIDPrefix, updateEntityMetadata} from "@/datastore/services/Common";
import type {ReviewerID} from "@/datastore/models/audition/Reviewer";
import {ReviewerTeamTest} from "@/datastore/models/audition/ReviewerTeamTest";
import type {TeamTestID} from "@/datastore/models/audition/ReviewerTeamTest";
import {generateUniqueID} from "@/utils/UniqueID";

export const reviewerTeamTestsRef = collection(db, "reviewer_team_tests");

export async function fetchReviewerTeamTests(reviewerID: ReviewerID): Promise<Array<ReviewerTeamTest>> {
    const q = query(reviewerTeamTestsRef,
        where("reviewerID", "==", reviewerID))
        .withConverter(new ReviewerTeamTestConverter());
    const querySnap = await getDocs(q);
    const result: Array<ReviewerTeamTest> = [];
    querySnap.forEach(qDocSnap => result.push(qDocSnap.data()));
    return result;
}

export async function fetchReviewerTeamTest(testID: TeamTestID): Promise<ReviewerTeamTest> {
    const docRef = doc(reviewerTeamTestsRef, testID).withConverter(new ReviewerTeamTestConverter());
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
        throw new NotFoundError("Reviewer team test '" + testID + "' not found");
    }
    return docSnap.data();
}

export async function saveReviewerTeamTest(reviewerTeamTest: ReviewerTeamTest): Promise<ReviewerTeamTest> {
    updateEntityMetadata(reviewerTeamTest.metadata);
    if (!reviewerTeamTest.id) reviewerTeamTest.id = generateUniqueID(UniqueIDPrefix.ReviewerTeamTest);
    const docRef = doc(reviewerTeamTestsRef, reviewerTeamTest.id)
        .withConverter(new ReviewerTeamTestConverter());
    await setDoc(docRef, reviewerTeamTest);
    return reviewerTeamTest;
}

class ReviewerTeamTestConverter extends ObjectableConverter<ReviewerTeamTest> {
    constructor() {
        super(() => new ReviewerTeamTest());
    }
}