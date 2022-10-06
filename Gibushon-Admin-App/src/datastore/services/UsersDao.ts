import type {UserID} from "@/datastore/models/users/UserProfile";
import {UserProfile} from "@/datastore/models/users/UserProfile";
import {collection, doc, getDoc, setDoc, getDocs, query, where} from "firebase/firestore";
import type {FirestoreDataConverter, QueryDocumentSnapshot, SnapshotOptions, DocumentData} from "firebase/firestore";
import {db} from "@/services/FirebaseService";
import {NotFoundError} from "@/datastore/services/Common";
import {UserAuditionRole} from "@/datastore/models/users/UserAuditionRole";
import {getCurrentUser} from "@/services/AuthService";

const userProfilesRef = collection(db, "user_profiles");

export function getUserProfile(userID: UserID): Promise<UserProfile> {
    const docRef = doc(userProfilesRef, userID).withConverter(new UserProfileConverter());
    return getDoc(docRef).then((docSnap) => {
        if (!docSnap.exists()) {
            return Promise.reject(new NotFoundError("User profile for user '" + userID + "' not found"));
        }
        return Promise.resolve(docSnap.data());
    }).catch((err) => {
        return Promise.reject(err);
    });
}

export function setUserProfile(userProfile: UserProfile): Promise<UserProfile> {
    const profile = getCurrentUser()?.profile;
    if (profile) userProfile.metadata.update(profile);
    const docRef = doc(userProfilesRef, userProfile.userID).withConverter(new UserProfileConverter());
    return setDoc(docRef, userProfile).then(() => {
        return Promise.resolve(userProfile);
    }).catch((err) => {
        return Promise.reject(err);
    });
}

class UserProfileConverter implements FirestoreDataConverter<UserProfile> {
    fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): UserProfile {
        const data = snapshot.data(options);
        const userProfile = new UserProfile();
        userProfile.fromObject(data);
        return userProfile;
    }

    toFirestore(userProfile: UserProfile): DocumentData {
        const data: DocumentData = {};
        userProfile.toObject(data);
        return data;
    }
}

// ----- User Audition Roles -----

const userAuditionRolesRef = collection(db, "user_audition_roles");

export function getUserAuditionRoles(userID: UserID): Promise<Array<UserAuditionRole>> {
    const q = query(userAuditionRolesRef,
        where("userID", "==", userID))
        .withConverter(new UserAuditionRoleConverter());
    return getDocs(q).then((querySnap) => {
        const result: Array<UserAuditionRole> = [];
        querySnap.forEach(qDocSnap => result.push(qDocSnap.data()))
        return Promise.resolve(result);
    }).catch((err) => {
        return Promise.reject(err);
    });
}

export function setUserAuditionRole(userAuditionRole: UserAuditionRole): Promise<UserAuditionRole> {
    const profile = getCurrentUser()?.profile;
    if (profile) userAuditionRole.metadata.update(profile);
    const docID = userAuditionRole.userID + "_" + userAuditionRole.auditionID;
    const docRef = doc(userAuditionRolesRef, docID).withConverter(new UserAuditionRoleConverter());
    return setDoc(docRef, userAuditionRole).then(() => {
        return Promise.resolve(userAuditionRole);
    }).catch((err) => {
        return Promise.reject(err);
    });
}

class UserAuditionRoleConverter implements FirestoreDataConverter<UserAuditionRole> {
    fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): UserAuditionRole {
        const data = snapshot.data(options);
        const userAuditionRole = new UserAuditionRole();
        userAuditionRole.fromObject(data);
        return userAuditionRole;
    }

    toFirestore(userAuditionRole: UserAuditionRole): DocumentData {
        const data: DocumentData = {};
        userAuditionRole.toObject(data);
        return data;
    }
}