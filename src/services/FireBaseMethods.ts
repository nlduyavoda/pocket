import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { fireStore } from "./FireBaseConfig";
import {
  AddCollection,
  DocumentType,
  FetchResType,
  GetCollection,
} from "./Types";
import { TRANSACTIONS } from "./utils";

export const addCollection = async ({
  collectionName = TRANSACTIONS,
  data,
}: AddCollection): Promise<FetchResType> => {
  try {
    const citiesRef = collection(fireStore, collectionName);
    const result = await setDoc(doc(citiesRef), data);
    return { status: "ok", data: result };
  } catch (error) {
    return { status: "ok", data: null };
  }
};

export const getCollection = async ({
  collectionName = TRANSACTIONS,
}: GetCollection): Promise<FetchResType> => {
  try {
    const transactionRef = collection(fireStore, collectionName);

    const docSnap = await getDocs(transactionRef);
    const result: Array<unknown> = [];
    docSnap.forEach((doc) => {
      if (doc.id) {
        result.push(doc.data());
      }
    });

    if (result.length > 0) {
      return {
        status: "ok",
        data: result,
      };
    } else {
      return {
        status: "fail",
        data: [],
      };
    }
  } catch (error) {
    return {
      status: "fail",
      data: [],
    };
  }
};

export const addDocument = async ({
  collectionName = TRANSACTIONS,
  data,
}: GetCollection & {
  data: DocumentType;
}): Promise<FetchResType> => {
  try {
    console.log({
      collectionName,
      data,
    });
    const paymentRef = doc(fireStore, collectionName);
    const result = await setDoc(paymentRef, data);
    console.log("result", result);
    return {
      status: "ok",
      data: result,
    };
  } catch (error) {
    return {
      status: "fail",
      data: null,
    };
  }
};
