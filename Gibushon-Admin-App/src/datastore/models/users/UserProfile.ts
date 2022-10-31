import {Entity} from "@/datastore/models/common/Entity";

export type UserID = string;

export class UserProfile extends Entity {
    userID: UserID = "";
    firstName: string = "";
    lastName: string = "";
    email: string = "";
    phoneNumber: string = "";
    photoUrl: string | undefined;

    toObject(obj: any) {
        super.toObject(obj);
        obj.userID = this.userID;
        obj.firstName = this.firstName;
        obj.lastName = this.lastName;
        obj.email = this.email;
        obj.phoneNumber = this.phoneNumber;
        obj.photoUrl = this.photoUrl;
    }

    fromObject(obj: any) {
        super.fromObject(obj);
        this.userID = obj.userID;
        this.firstName = obj.firstName;
        this.lastName = obj.lastName;
        this.email = obj.email;
        this.phoneNumber = obj.phoneNumber;
        this.photoUrl = obj.photoUrl;
    }
}