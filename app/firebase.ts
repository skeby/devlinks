import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { clientConfig } from "./config/firebase.config";
import { getStorage } from "firebase/storage";

export const app = initializeApp(clientConfig);
export const db = getFirestore(app);
export const storage = getStorage(app, "devlinks-skeby.appspot.com");
