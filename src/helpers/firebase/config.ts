import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyD7lVg3a4HDZRIsv7PrqnUgUqAOjodMRLM",
  authDomain: "shipp-7a2b7.firebaseapp.com",
  projectId: "shipp-7a2b7",
  storageBucket: "shipp-7a2b7.appspot.com",
  messagingSenderId: "717408975875",
  appId: "1:717408975875:web:8dca17301a05a51adba236",
  measurementId: "G-MH1L5C26K0",
};


const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);