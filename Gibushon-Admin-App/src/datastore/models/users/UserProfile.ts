export type UserID = string;

export class UserProfile {
    userID: UserID = "";
    firstName: string = "";
    lastName: string = "";
    email: string = "";
    photoUrl: string | undefined;
    admin: boolean = false;
}