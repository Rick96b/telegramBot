import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyClkIS4SyIju7n6p3jjHlAfxRa6EsAd0V4",
  authDomain: "telegrambot-5fe07.firebaseapp.com",
  projectId: "telegrambot-5fe07",
  storageBucket: "telegrambot-5fe07.appspot.com",
  messagingSenderId: "990108207136",
  appId: "1:990108207136:web:982cfe884993ff9f7bd445",
  measurementId: "G-5YC50HTMR0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);