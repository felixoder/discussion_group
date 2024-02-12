// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBe2NS0g-bCORFRBVgehrEar9HpPIc3Flo",
  authDomain: "felix-underflow.firebaseapp.com",
  projectId: "felix-underflow",
  storageBucket: "felix-underflow.appspot.com",
  messagingSenderId: "591762930562",
  appId: "1:591762930562:web:647de9a2fccdd3c94bed9b",
  measurementId: "G-XX8VMXPP3C"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
