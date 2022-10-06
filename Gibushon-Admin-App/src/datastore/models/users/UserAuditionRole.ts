import type {UserID} from "@/datastore/models/users/UserProfile";
import type {AuditionID} from "@/datastore/models/audition/Audition";
import type {RoleType} from "@/datastore/models/auth/RoleType";
import {toUTC} from "@/utils/DateTime";
import {Entity} from "@/datastore/models/common/Entity";
import {mapFromObjectValue, mapToObjectValue} from "@/datastore/models/common/Objectable";

export class UserAuditionRole extends Entity {
    userID: UserID = "";
    auditionID: AuditionID = "";
    auditionName: string = "";
    auditionCreatedAt: Date = toUTC(new Date());
    roles: Map<RoleType, any> = new Map();

    toObject(obj: any) {
        super.toObject(obj);
        obj.userID = this.userID;
        obj.auditionID = this.auditionID;
        obj.auditionName = this.auditionName;
        obj.auditionCreatedAt = this.auditionCreatedAt;
        obj.roles = mapToObjectValue(this.roles);
    }

    fromObject(obj: any) {
        super.fromObject(obj);
        this.userID = obj.userID;
        this.auditionID = obj.auditionID;
        this.auditionName = obj.auditionName;
        this.auditionCreatedAt = obj.auditionCreatedAt;
        this.roles = mapFromObjectValue(obj.roles);
    }
}