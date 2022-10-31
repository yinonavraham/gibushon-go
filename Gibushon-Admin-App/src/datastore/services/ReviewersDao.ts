import {collection, doc, getDoc, setDoc, getDocs, query, where} from "firebase/firestore";
import {db} from "@/services/FirebaseService";
import {NotFoundError, ObjectableConverter, updateEntityMetadata} from "@/datastore/services/Common";
import type {AuditionID} from "@/datastore/models/audition/Audition";
import {Reviewer} from "@/datastore/models/audition/Reviewer";
import type {ReviewerID} from "@/datastore/models/audition/Reviewer";

export const auditionReviewersRef = collection(db, "audition_reviewers");

export async function fetchAuditionReviewers(auditionID: AuditionID): Promise<Array<Reviewer>> {
    const q = query(auditionReviewersRef,
        where("auditionID", "==", auditionID))
        .withConverter(new ReviewerConverter());
    const querySnap = await getDocs(q);
    const result: Array<Reviewer> = [];
    querySnap.forEach(qDocSnap => result.push(qDocSnap.data()));
    return result;
}

export async function fetchReviewer(reviewerID: ReviewerID): Promise<Reviewer> {
    const docRef = doc(auditionReviewersRef, reviewerID).withConverter(new ReviewerConverter());
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
        throw new NotFoundError("Reviewer '" + reviewerID + "' not found");
    }
    return docSnap.data();
}

export async function saveReviewer(reviewer: Reviewer): Promise<Reviewer> {
    updateEntityMetadata(reviewer.metadata);
    if (!reviewer.id) reviewer.id = `${reviewer.auditionID}_${reviewer.userID}`;
    const docRef = doc(auditionReviewersRef, reviewer.id).withConverter(new ReviewerConverter());
    await setDoc(docRef, reviewer);
    return reviewer;
}

class ReviewerConverter extends ObjectableConverter<Reviewer> {
    constructor() {
        super(() => new Reviewer());
    }
}