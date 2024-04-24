import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD8fYw6gwWhHpmzTxEKlFCppsBf21BfUkw",
  authDomain: "triprider-337e6.firebaseapp.com",
  projectId: "triprider-337e6",
  storageBucket: "triprider-337e6.appspot.com",
  messagingSenderId: "63112872928",
  appId: "1:63112872928:web:1fd4e8b49e053c5550e185",
  measurementId: "G-ZYV0E7PRFQ"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore()
export const storage = getStorage();



