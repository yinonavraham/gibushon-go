import type {AuditionID} from "@/datastore/models/audition/Audition";
import type {RoleType} from "@/datastore/models/auth/RoleType";

export class JoinCode {
    code : string = "";
    auditionID? : AuditionID;
    roles : Map<RoleType, any> = new Map();
}