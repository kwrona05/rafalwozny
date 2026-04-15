// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD_aZ82CD17UJrTClncE0rAa91zm4HWZFg",
    authDomain: "rafalwozny.firebaseapp.com",
    projectId: "rafalwozny",
    storageBucket: "rafalwozny.firebasestorage.app",
    messagingSenderId: "851711318158",
    appId: "1:851711318158:web:760fa15bc2f5b0f19a51df",
    measurementId: "G-ZLDVM54ZX8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;
const db = getFirestore(app);
const storage = getStorage(app);

export { app, db, storage, analytics };