import {Entity} from "@/datastore/models/common/Entity";

export type UserID = string;

export class UserProfile extends Entity {
    userID: UserID = "";
    firstName: string = "";
    lastName: string = "";
    email: string = "";
    photoUrl: string | undefined;
    admin: boolean = false;

    toObject(obj: any) {
        super.toObject(obj);
        obj.userID = this.userID;
        obj.firstName = this.firstName;
        obj.lastName = this.lastName;
        obj.email = this.email;
        obj.photoUrl = this.photoUrl;
        obj.admin = this.admin;
    }

    fromObject(obj: any) {
        super.fromObject(obj);
        this.userID = obj.userID;
        this.firstName = obj.firstName;
        this.lastName = obj.lastName;
        this.email = obj.email;
        this.photoUrl = obj.photoUrl;
        this.admin = obj.admin;
    }
}