// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAZsju-SY0L-GLzrmHQhSM5jKdQCI6AMHM",
  authDomain: "officeapp-6dcf7.firebaseapp.com",
  projectId: "officeapp-6dcf7",
  storageBucket: "officeapp-6dcf7.appspot.com",
  messagingSenderId: "432297652147",
  appId: "1:432297652147:web:3c4f44fc49c75c45ada5c6"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
