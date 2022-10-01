import type {EntityID} from "@/datastore/models/common/EntityID";
import type {CandidateID} from "@/datastore/models/audition/CandidateStatus";
import type {Validatable} from "@/datastore/models/common/Validatable";
import type {UserID} from "@/datastore/models/users/UserProfile";

export type TeamID = EntityID;

export class Team implements Validatable {
    id : TeamID = "";
    number: number = 0;
    leaderID: UserID = "";
    reviewerIDs: Set<UserID> = new Set();
    candidateIDs: Set<CandidateID> = new Set();

    validate(): Error | null {
        if (!this.id) return Error("BUG: Team ID is not defined");
        if (this.number <= 0) return Error("BUG: Team number is not defined");
        return null;
    }
}