import type {AuthProvider, UserCredential, User} from "firebase/auth";
import type {UserID} from "@/datastore/models/users/UserProfile";
import {UserProfile} from "@/datastore/models/users/UserProfile";
import {
    getAuth, GoogleAuthProvider, signInWithPopup,
    createUserWithEmailAndPassword as fbCreateUserWithEmailAndPassword,
    signInWithEmailAndPassword as fbSignInUserWithEmailAndPassword,
} from "firebase/auth";
import {getUserAuditionRoles, getUserProfile, setUserProfile} from "@/datastore/services/UsersDao";
import {NotFoundError} from "@/datastore/services/Common";
import type {AuditionID} from "@/datastore/models/audition/Audition";
import type {UserAuditionRole} from "@/datastore/models/users/UserAuditionRole";

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

export function signInUserWithEmailAndPassword(email: string, password: string) : Promise<SignInResult> {
    return fbSignInUserWithEmailAndPassword(getAuth(), email, password).then(userInfo => {
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
            setCurrentUser(userInfo.user, userProfile);
            setUserProfile(userProfile)
                .then((result) => {
                    console.log("User profile saved successfully:", result);
                })
                .catch((err) => {
                    console.log("Could not save user profile; error: " + err);
                });
            return Promise.resolve(new SignInResult(userProfile, true));
        }
        return Promise.reject(err);
    });
}

export function signOut() : Promise<void> {
    return getAuth().signOut();
}

export function addCurrentUserChangedListener(listener: CurrentUserChangedListener) {
    currentUserChangedListeners.push(listener);
}

function notifyCurrentUserChangedListeners(user: LoggedInUser | null) {
    for (let listener of currentUserChangedListeners) {
        listener(user);
    }
}

export type CurrentUserChangedListener = (user: LoggedInUser | null) => void;

const currentUserChangedListeners: CurrentUserChangedListener[] = [];

export class LoggedInUser {
    user?: User;
    private _profile: UserProfile | null = null;
    private _auditionRoles: Map<AuditionID, UserAuditionRole> | null = null;

    get profile(): UserProfile | null {
        if (this._profile) return this._profile;
        getUserProfile(this.user?.uid as string)
            .then(profile => this._profile = profile)
            .catch(err => console.log("Could not get user profile for '" + this.user?.uid + "':", err));
        return this._profile;
    }

    set profile(profile: UserProfile | null) {
        this._profile = profile;
    }

    get auditionRoles(): Map<AuditionID, UserAuditionRole> | null {
        if (this._auditionRoles != null) return this._auditionRoles;
        getUserAuditionRoles(this.user?.uid as string)
            .then(roles => {
                this._auditionRoles = new Map();
                roles.forEach(role => this._auditionRoles?.set(role.auditionID, role));
                console.log("Current user audition roles:", this._auditionRoles);
            })
            .catch(err => console.log("Could not get user audition roles: " + err));
        return this._auditionRoles;
    }
}

let loggedInUser: LoggedInUser | null = null;

export function getCurrentUser() : LoggedInUser | null {
    return loggedInUser;
}

function setCurrentUser(user: User, profile: UserProfile | null = null) {
    console.log("Setting current user:", profile);
    const newLoggedInUser = new LoggedInUser();
    newLoggedInUser.user = user;
    newLoggedInUser.profile = profile;
    loggedInUser = newLoggedInUser;
    notifyCurrentUserChangedListeners(loggedInUser);
}

getAuth().onAuthStateChanged((user) => {
    console.log("Auth state changed:", user?.uid);
    if (user == null) {
        loggedInUser = null;
        notifyCurrentUserChangedListeners(null);
        return;
    }
    if (loggedInUser == null) {
        setCurrentUser(user);
    }
})