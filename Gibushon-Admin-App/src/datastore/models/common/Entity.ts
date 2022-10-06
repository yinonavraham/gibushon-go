import type {UniqueID} from "@/utils/UniqueID";
import {toUTC} from "@/utils/DateTime";
import {newIllegalNumberOfArgsError} from "@/datastore/models/common/Errors";
import type {UserProfile} from "@/datastore/models/users/UserProfile";
import type {Objectable} from "@/datastore/models/common/Objectable";
import {dateFromObjectValue, dateToObjectValue} from "@/datastore/models/common/Objectable";

export type EntityID = UniqueID;

export class Entity implements Objectable {
    metadata: EntityMetadata = new EntityMetadata();

    toObject(obj: any) {
        obj.metadata = {};
        this.metadata.toObject(obj.metadata);
    }

    fromObject(obj: any) {
        this.metadata.fromObject(obj.metadata);
    }
}

export class EntityMetadata implements Objectable {
    createdBy: string = "";
    createdAt : Date = toUTC(new Date());
    updatedBy: string = "";
    updatedAt : Date = toUTC(new Date());

    constructor();
    constructor(createdBy: string, createdAt: Date, updatedBy: string, updatedAt: Date);
    constructor(...args: any[]) {
        if (args.length == 0) return;
        if (args.length == 4) {
            this.createdBy = args[0] as string;
            this.createdAt = args[1] as Date;
            this.updatedBy = args[2] as string;
            this.updatedAt = args[3] as Date;
            return;
        }
        throw newIllegalNumberOfArgsError(args);
    }

    update(updatedByUser?: UserProfile) {
        const updatedBy = updatedByUser?.firstName + " " + updatedByUser?.lastName + " (id: " + updatedByUser?.userID + ")";
        let now = toUTC(new Date());
        if (!this.createdBy) {
            this.createdBy = updatedBy;
            this.createdAt = now;
        }
        this.updatedBy = updatedBy;
        this.updatedAt = now;
    }

    toObject(obj: any) {
        obj.createdBy = this.createdBy;
        obj.createdAt = dateToObjectValue(this.createdAt);
        obj.updatedBy = this.updatedBy;
        obj.updatedAt = dateToObjectValue(this.updatedAt);
    }

    fromObject(obj: any) {
        this.createdBy = obj.createdBy;
        this.createdAt = dateFromObjectValue(obj.createdAt);
        this.updatedBy = obj.updatedBy;
        this.updatedAt = dateFromObjectValue(obj.updatedAt);
    }
}