import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { clientConfig } from "./config/firebase.config";
import { getAuth } from "firebase/auth";

export const app = initializeApp(clientConfig);
export const db = getFirestore(app);
