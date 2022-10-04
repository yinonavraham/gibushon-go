export type UserID = string;

export class UserProfile {
    uid: UserID | undefined;
    firstName: string | undefined;
    lastName: string | undefined;
    email: string | undefined;
    photoUrl: string | undefined;
    admin: boolean = false;
}