import type {UserID} from "@/datastore/models/users/UserProfile";
import {UserProfile} from "@/datastore/models/users/UserProfile";
import {collection, doc, getDoc, setDoc} from "firebase/firestore";
import type {FirestoreDataConverter, QueryDocumentSnapshot, SnapshotOptions, DocumentData} from "firebase/firestore";
import {db} from "@/services/FirebaseService";
import {NotFoundError} from "@/datastore/services/Common";

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
        userProfile.userID = data.userID;
        userProfile.firstName = data.firstName;
        userProfile.lastName = data.lastName;
        userProfile.email = data.email;
        userProfile.photoUrl = data.photoUrl;
        userProfile.admin = data.admin;
        return userProfile;
    }

    toFirestore(userProfile: UserProfile): DocumentData {
        return {
            userID: userProfile.userID,
            firstName: userProfile.firstName,
            lastName: userProfile.lastName,
            email: userProfile.email,
            photoUrl: userProfile.photoUrl,
            admin: userProfile.admin,
        };
    }

}