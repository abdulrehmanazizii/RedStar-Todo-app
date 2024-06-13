// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJCeEFKVRxeJNu2E7Mqarmrr0e5aYLTxE",
  authDomain: "todo-app-5a91c.firebaseapp.com",
  projectId: "todo-app-5a91c",
  storageBucket: "todo-app-5a91c.appspot.com",
  messagingSenderId: "63394668462",
  appId: "1:63394668462:web:00816b0e938f812a3c723f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);