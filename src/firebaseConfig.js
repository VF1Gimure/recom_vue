// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
    authDomain: "recommendsvd.firebaseapp.com",
    databaseURL: "https://recommendsvd-default-rtdb.firebaseio.com",
    projectId: "recommendsvd",
    storageBucket: "recommendsvd.firebasestorage.app",
    messagingSenderId: "36779011872",
    appId: "1:36779011872:web:feb5241332d7824b473145"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
