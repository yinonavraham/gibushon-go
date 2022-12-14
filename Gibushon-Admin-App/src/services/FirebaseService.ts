// Import the functions you need from the SDKs you need
import { initializeApp } from "@firebase/app";
import { getFirestore } from  "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC3hWp5hTB7cYz5_2zNS71s1PC6aqQhIg8",
    authDomain: "gibushon-experiment1.firebaseapp.com",
    projectId: "gibushon-experiment1",
    storageBucket: "gibushon-experiment1.appspot.com",
    messagingSenderId: "483914638052",
    appId: "1:483914638052:web:cacabfd70a8e7069b582f1"
};

// Initialize Firebase
export const fbApp = initializeApp(firebaseConfig);
export const db = getFirestore(fbApp);