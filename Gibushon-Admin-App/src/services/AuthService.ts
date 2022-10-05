import type {AuthProvider, UserCredential, User} from "firebase/auth";
import type {UserID} from "@/datastore/models/users/UserProfile";
import {UserProfile} from "@/datastore/models/users/UserProfile";
import {getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword as fbCreateUserWithEmailAndPassword} from "firebase/auth";
import {getUserProfile, setUserProfile} from "@/datastore/services/UsersDao";
import {NotFoundError} from "@/datastore/services/Common";

export class SignInResult {
    userProfile: UserProfile = new UserProfile();
    newlyCreated: boolean = false;

    constructor(userProfile: UserProfile, newlyCreated: boolean) {
        this.userProfile = userProfile;
        this.newlyCreated = newlyCreated;
    }
}

function signInWithProvider(provider: AuthProvider) : Promise<SignInResult> {
    return signInWithPopup(getAuth(), provider).then((userInfo) => {
        return getOrCreateUserProfile(userInfo);
    }).catch((err) => {
        return Promise.reject(err);
    });
}

export function signInWithGoogle() : Promise<SignInResult> {
    return signInWithProvider(new GoogleAuthProvider());
}

export function createUserWithEmailAndPassword(email: string, password: string) : Promise<SignInResult> {
    return fbCreateUserWithEmailAndPassword(getAuth(), email, password).then(userInfo => {
        return getOrCreateUserProfile(userInfo);
    }).catch(err => {
        return Promise.reject(err);
    });
}

function getOrCreateUserProfile(userInfo: UserCredential) : Promise<SignInResult> {
    let userID: UserID = userInfo.user.uid;
    return getUserProfile(userID).then((user) => {
        setCurrentUser(userInfo.user, user);
        return Promise.resolve(new SignInResult(user, false));
    }).catch((err) => {
        console.log("getUserProfile for '" + userID + "' returned an error:", err);
        if (err instanceof NotFoundError) {
            console.log("Creating user profile for user with ID:", userID);
            const userProfile = new UserProfile();
            userProfile.userID = userID;
            userProfile.email = userInfo.user.email ?? "";
            userProfile.photoUrl = userInfo.user.photoURL ?? "";
            const displayName = userInfo.user.displayName ?? "";
            const split = displayName.search(" ");
            userProfile.firstName = split > 0 ? displayName.substring(0, split) : displayName;
            userProfile.lastName = split > 0 && split+1 < displayName.length ? displayName.substring(split+1) : "";
            userProfile.admin = false;
            console.log("Created user profile:", userProfile);
            setUserProfile(userProfile)
                .then((result) => {
                    console.log("User profile saved successfully:", result);
                })
                .catch((err) => {
                    console.log("Could not save user profile; error: " + err);
                });
            setCurrentUser(userInfo.user, userProfile);
            return Promise.resolve(new SignInResult(userProfile, true));
        }
        return Promise.reject(err);
    });
}

export class LoggedInUser {
    user?: User;
    profile: UserProfile = new UserProfile();
}

let loggedInUser: LoggedInUser | null = null;

export function getCurrentUser() : LoggedInUser | null {
    return loggedInUser;
}

function setCurrentUser(user: User, profile: UserProfile) {
    const newLoggedInUser = new LoggedInUser();
    newLoggedInUser.user = user;
    newLoggedInUser.profile = profile;
    loggedInUser = newLoggedInUser;
}

getAuth().onAuthStateChanged((user) => {
    if (user == null) {
        loggedInUser = null;
        return;
    }
})