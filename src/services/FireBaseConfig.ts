import { initializeApp } from "firebase/app";
import {
  collection,
  doc,
  getDoc,
  getFirestore,
  setDoc,
} from "firebase/firestore";

export const firebaseConfig = {
  apiKey: "AIzaSyDyYLRF6Hv6EEPcfIyzv94tWjAkTIoUAQo",
  authDomain: "dailypaid.firebaseapp.com",
  projectId: "dailypaid",
  storageBucket: "dailypaid.appspot.com",
  messagingSenderId: "741154149574",
  appId: "1:741154149574:web:79fe83525797e3d0ccf3c7",
};

const defaultCollection = "DailyPayment";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

type AddCollection = {
  collectionName?: string;
  documentName: string;
  data: any;
};

type GetCollection = {
  collectionName?: string;
  documentName: string;
};

export type GetCollectionResponse = {
  status: "ok" | "fail";
  data: unknown;
};

export const addCollection = async ({
  collectionName = defaultCollection,
  documentName,
  data,
}: AddCollection) => {
  try {
    const citiesRef = collection(db, collectionName);
    return await setDoc(doc(citiesRef, documentName), data);
  } catch (error) {
    return error;
  }
};

export const getCollection = async ({
  collectionName = defaultCollection,
  documentName,
}: GetCollection): Promise<GetCollectionResponse> => {
  const docRef = doc(db, collectionName, documentName);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return {
      status: "ok",
      data: docSnap.data(),
    };
  } else {
    // docSnap.data() will be undefined in this case
    return {
      status: "fail",
      data: null,
    };
  }
};
