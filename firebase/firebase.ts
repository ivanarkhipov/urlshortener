import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: move to .env
const firebaseConfig = {
  apiKey: "AIzaSyDDFMBYWcKQAxSpXDxprlb5vUlMtSQjj4Q",
  authDomain: "urlshortener-dcd72.firebaseapp.com",
  projectId: "urlshortener-dcd72",
  storageBucket: "urlshortener-dcd72.appspot.com",
  messagingSenderId: "321714732917",
  appId: "1:321714732917:web:5ea56662d0b095e4465d3c",
  measurementId: "G-Z4H4JK56P4"
};

const app = initializeApp(firebaseConfig);
const database = getFirestore(app);

export default database;