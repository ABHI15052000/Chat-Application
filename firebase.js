import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBcCRIkP8E1Sq8STWFhJGf31yLt6ivN_mQ",
  authDomain: "chat-adda-62ba2.firebaseapp.com",
  projectId: "chat-adda-62ba2",
  storageBucket: "chat-adda-62ba2.appspot.com",
  messagingSenderId: "906968723810",
  appId: "1:906968723810:web:7e7c838f0cbfcb29223c3b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();
export { auth, db, app};
