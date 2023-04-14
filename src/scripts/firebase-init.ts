// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCWJtEFkuQb9BK4jH1WKI0osyKnXnlB4mE",
  authDomain: "fabric-finesse.firebaseapp.com",
  projectId: "fabric-finesse",
  storageBucket: "fabric-finesse.appspot.com",
  messagingSenderId: "1032571613019",
  appId: "1:1032571613019:web:04ebb31cf21b89e3b7747e",
  measurementId: "G-5H2M7EDQLL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app

