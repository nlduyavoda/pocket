import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig } from "./utils";

export const fireBaseInitialApp = initializeApp(firebaseConfig);
export const fireStore = getFirestore(fireBaseInitialApp);



