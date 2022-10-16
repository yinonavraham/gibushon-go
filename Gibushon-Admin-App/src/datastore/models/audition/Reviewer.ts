import type {EntityID} from "@/datastore/models/common/Entity";
import type {UnitID} from "@/datastore/models/audition/Unit";
import type {UserID} from "@/datastore/models/users/UserProfile";
import type {TeamID} from "@/datastore/models/audition/Team";
import type {RoleType} from "@/datastore/models/auth/RoleType";
import {newIllegalNumberOfArgsError} from "@/datastore/models/common/Errors";
import type {AuditionID} from "@/datastore/models/audition/Audition";
import {Entity} from "@/datastore/models/common/Entity";

export type ReviewerID = EntityID

export class Reviewer extends Entity {
    id: ReviewerID = "";
    auditionID: AuditionID = "";
    userID: UserID = "";
    name: string = "";
    unitID: UnitID = "";
    role: RoleType | "" = "";
    watcher: boolean = false;
    teamID: TeamID = "";

    constructor();
    constructor(userID : UserID, name : string);
    constructor(...args : any[]) {
        super();
        if (args.length == 0) return;
        if (args.length == 2) {
            this.userID = args[0] as UserID;
            this.name = args[1] as string;
            return;
        }
        throw newIllegalNumberOfArgsError(args);
    }

    toObject(obj: any) {
        super.toObject(obj);
        obj.id = this.id;
        obj.auditionID = this.auditionID;
        obj.userID = this.userID;
        obj.name = this.name;
        obj.unitID = this.unitID;
        obj.role = this.role;
        obj.watcher = this.watcher;
        obj.teamID = this.teamID;
    }

    fromObject(obj: any) {
        super.fromObject(obj);
        this.id = obj.id;
        this.auditionID = obj.auditionID;
        this.userID = obj.userID;
        this.name = obj.name;
        this.unitID = obj.unitID;
        this.role = obj.role;
        this.watcher = obj.watcher;
        this.teamID = obj.teamID;
    }
}