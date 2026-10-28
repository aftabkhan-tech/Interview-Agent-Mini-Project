
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
 authDomain: "miniproject-aa656.firebaseapp.com",
  projectId: "miniproject-aa656",
  storageBucket: "miniproject-aa656.firebasestorage.app",
  messagingSenderId: "653994381853",
  appId: "1:653994381853:web:0ad22f3a29f16e3266ecf4"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

const provider = new GoogleAuthProvider()

export {auth , provider}




