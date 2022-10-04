import type {UserID} from "@/datastore/models/users/UserProfile";
import type {AuditionID} from "@/datastore/models/audition/Audition";
import type {RoleType} from "@/datastore/models/auth/RoleType";

export class UserAuditionRole {
    userID: UserID = "";
    auditionID: AuditionID = "";
    roles: Map<RoleType, any> = new Map();
}