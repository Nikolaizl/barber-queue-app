// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDjTbl0WcHKp0thikbxeaI0Dys-pc8ItvI",
  authDomain: "barber-queue-app.firebaseapp.com",
  projectId: "barber-queue-app",
  storageBucket: "barber-queue-app.firebasestorage.app",
  messagingSenderId: "53742095142",
  appId: "1:53742095142:web:69952d2df33ea34bd60fe7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Create Firestore instance
export const db = getFirestore(app);
export const auth = getAuth(app);
