// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBuhdoMKNw8NxuRbOHYKpA8atg9UjHb_RU",
  authDomain: "team-6-aightnow.firebaseapp.com",
  projectId: "team-6-aightnow",
  storageBucket: "team-6-aightnow.appspot.com",
  messagingSenderId: "1063313464450",
  appId: "1:1063313464450:web:38ce09321ecac5b794689b",
  measurementId: "G-Y34SFGBHB8",
};

// Initialize Firebase
const firebasedb = initializeApp(firebaseConfig);

export default firebasedb;
