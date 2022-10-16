import type {EntityID} from "@/datastore/models/common/Entity";
import type {Validatable} from "@/datastore/models/common/Validatable";
import type {UserID} from "@/datastore/models/users/UserProfile";
import type {Objectable} from "@/datastore/models/common/Objectable";
import type {ReviewerID} from "@/datastore/models/audition/Reviewer";

export type TeamID = EntityID;

export class Team implements Validatable, Objectable {
    id : TeamID = "";
    number: number = 0;
    leaderID: ReviewerID = "";

    validate(): Error | null {
        if (!this.id) return Error("BUG: Team ID is not defined");
        if (this.number <= 0) return Error("BUG: Team number is not defined");
        return null;
    }

    toObject(obj: any) {
        obj.id = this.id;
        obj.number = this.number;
        obj.leaderID = this.leaderID;
    }

    fromObject(obj: any) {
        this.id = obj.id;
        this.number = obj.number;
        this.leaderID = obj.leaderID;
    }
}