import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import {getFirestore} from "@firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDOoyvFTPhDltg-_h0cdajyM0JW2SjIksg",
  authDomain: "atelierdelsol-87b30.firebaseapp.com",
  projectId: "atelierdelsol-87b30",
  storageBucket: "atelierdelsol-87b30.appspot.com",
  messagingSenderId: "422566481218",
  appId: "1:422566481218:web:0846696efa12b097bb0cdb",
  measurementId: "G-H7S3BF15GY"
};

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app);
export const db = getFirestore(app)