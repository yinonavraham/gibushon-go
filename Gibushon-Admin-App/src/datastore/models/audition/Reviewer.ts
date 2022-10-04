import type {EntityID} from "@/datastore/models/common/EntityID";
import type {UnitID} from "@/datastore/models/audition/Unit";
import type {UserID} from "@/datastore/models/users/UserProfile";
import type {TeamID} from "@/datastore/models/audition/Team";
import type {RoleType} from "@/datastore/models/auth/RoleType";

export class Reviewer {
    userID: UserID = "";
    name: string = "";
    unitID: UnitID = "";
    role: RoleType | "" = "";
    watcher: boolean = false;
    teamID: TeamID = "";

    constructor();
    constructor(userID : UserID, name : string);
    constructor(...args : any[]) {
        if (args.length == 0) return;
        if (args.length == 2) {
            this.userID = args[0] as UserID;
            this.name = args[1] as string;
            return;
        }
        throw new Error("BUG: Illegal number of arguments: " + args.length + " [" + Array.from(args) + "]");
    }
}