// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDgFDmQKX0Rs7V5VmyWYwt_6uuxNpzG2VU",
  authDomain: "netflixgpt-33abb.firebaseapp.com",
  projectId: "netflixgpt-33abb",
  storageBucket: "netflixgpt-33abb.firebasestorage.app",
  messagingSenderId: "359762922480",
  appId: "1:359762922480:web:a495fa81153f16c449ab35",
  measurementId: "G-MJVEHY5VT8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);