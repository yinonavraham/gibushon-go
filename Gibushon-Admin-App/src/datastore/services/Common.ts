import type {Objectable} from "@/datastore/models/common/Objectable";
import type {DocumentData, FirestoreDataConverter, QueryDocumentSnapshot, SnapshotOptions} from "firebase/firestore";
import type {EntityMetadata} from "@/datastore/models/common/Entity";
import {getCurrentUser} from "@/services/AuthService";

export class NotFoundError extends Error {
    constructor(message: string) {
        super(message);
    }
}

export function updateEntityMetadata(metadata: EntityMetadata) : void {
    const profile = getCurrentUser()?.profile;
    if (profile) metadata.update(profile);
}

export class ObjectableConverter<T extends Objectable> implements FirestoreDataConverter<T> {
    newT: (() => T) | undefined;

    constructor(newT: () => T) {
        this.newT = newT;
    }

    fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): T {
        const data = snapshot.data(options);
        const newT = this.newT as (() => T);
        const value: T = newT();
        value.fromObject(data);
        return value;
    }

    toFirestore(value: T): DocumentData {
        const data: DocumentData = {};
        value.toObject(data);
        return data;
    }
}

export enum UniqueIDPrefix {
    AuditionDefinition = "auddef",
    Audition = "aud",
    Unit = "unt",
    Team = "tem",
    Reviewer = "rev",
    ReviewerCandidate = "revcan",
    ReviewerTeamTest = "revtemtst",
    ReviewerCandidateTest = "revcantst",
    Candidate = "can",
}