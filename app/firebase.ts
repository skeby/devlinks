import { initializeApp } from "firebase/app";
import { clientConfig } from "./config/firebase.config";

export const app = initializeApp(clientConfig);
