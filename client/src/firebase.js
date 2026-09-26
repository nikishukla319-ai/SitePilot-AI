// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth, GoogleAuthProvider} from "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "sitepilot-ai-76961.firebaseapp.com",
  projectId: "sitepilot-ai-76961",
  storageBucket: "sitepilot-ai-76961.firebasestorage.app",
  messagingSenderId: "890258343110",
  appId: "1:890258343110:web:ba0cd883f18fc54a87c3c7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app)

const provider=new GoogleAuthProvider()

export {auth,provider}