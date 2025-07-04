// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { Constant } from "../../constants/Constant"; // adjust the path if needed

const app = initializeApp(Constant.firebaseConfig);

export const auth = getAuth(app);
