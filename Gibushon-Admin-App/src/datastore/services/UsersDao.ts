import type {UserID} from "@/datastore/models/users/UserProfile";
import {UserProfile} from "@/datastore/models/users/UserProfile";
import {collection, doc, getDoc, setDoc, getDocs, query, where} from "firebase/firestore";
import {db} from "@/services/FirebaseService";
import {NotFoundError, ObjectableConverter, updateEntityMetadata} from "@/datastore/services/Common";
import {UserAuditionRole} from "@/datastore/models/users/UserAuditionRole";
import type {AuditionID} from "@/datastore/models/audition/Audition";

const userProfilesRef = collection(db, "user_profiles");

export async function fetchUserProfile(userID: UserID): Promise<UserProfile> {
    const docRef = doc(userProfilesRef, userID).withConverter(new UserProfileConverter());
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
        throw new NotFoundError("User profile for user '" + userID + "' not found");
    }
    return docSnap.data();
}

export async function saveUserProfile(userProfile: UserProfile): Promise<UserProfile> {
    updateEntityMetadata(userProfile.metadata);
    const docRef = doc(userProfilesRef, userProfile.userID).withConverter(new UserProfileConverter());
    await setDoc(docRef, userProfile);
    return userProfile;
}

class UserProfileConverter extends ObjectableConverter<UserProfile> {
    constructor() {
        super(() => new UserProfile());
    }
}

// ----- User Audition Roles -----

const userAuditionRolesRef = collection(db, "user_audition_roles");

export async function fetchUserAuditionRoles(userID: UserID): Promise<Array<UserAuditionRole>> {
    const q = query(userAuditionRolesRef,
        where("userID", "==", userID))
        .withConverter(new UserAuditionRoleConverter());
    const querySnap = await getDocs(q);
    const result: Array<UserAuditionRole> = [];
    querySnap.forEach(qDocSnap => result.push(qDocSnap.data()));
    return result;
}

export async function saveUserAuditionRole(userAuditionRole: UserAuditionRole): Promise<UserAuditionRole> {
    updateEntityMetadata(userAuditionRole.metadata);
    const docID = userAuditionRoleID(userAuditionRole.userID, userAuditionRole.auditionID);
    const docRef = doc(userAuditionRolesRef, docID).withConverter(new UserAuditionRoleConverter());
    await setDoc(docRef, userAuditionRole);
    return userAuditionRole;
}

function userAuditionRoleID(userID: UserID, auditionID: AuditionID) : string {
    return `${auditionID}_${userID}`
}

class UserAuditionRoleConverter extends ObjectableConverter<UserAuditionRole> {
    constructor() {
        super(() => new UserAuditionRole());
    }
}