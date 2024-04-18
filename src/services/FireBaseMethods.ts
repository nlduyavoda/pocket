import { formatDate } from "@utils/variables";
import {
  DocumentData,
  DocumentReference,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocFromCache,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { fireStore } from "./FireBaseConfig";
import {
  AddCollection,
  AddDocumentType,
  DocumentType,
  FetchResType,
  GetCollection,
} from "./Types";
import { EVENTS, TRANSACTIONS } from "./utils";

const formatDocumentSnap = (snap: any) => {
  const result: Array<unknown> = [];
  snap.forEach((doc: any) => {
    console.log("doc", doc);
    if (doc.id) {
      const data = doc.data();
      result.push({ id: doc.id, ...data });
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
};

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
        const data = doc.data();
        result.push({ id: doc.id, ...data });
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
    const paymentRef = doc(fireStore, collectionName);
    const result = await setDoc(paymentRef, data);
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

const getRefDocument = async (
  docRef: DocumentReference<unknown, DocumentData>
): Promise<FetchResType> => {
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { status: "ok", data: JSON.stringify(docSnap.data()) };
  } else {
    return { status: "fail", data: null };
  }
};

type RefDocResponseType = Omit<FetchResType, "data"> & {
  data: string;
};

export const addDocument_ = async ({
  documentName,
  data,
}: Partial<AddDocumentType>): Promise<FetchResType> => {
  try {
    const formatData = {
      ...data,
      startDate: formatDate(data.startDate),
      endDate: formatDate(data.endDate),
    };
    const docRef = await addDoc(collection(fireStore, EVENTS), formatData);
    const res = await getRefDocument(docRef);
    const { data: result, status } = res as RefDocResponseType;
    return {
      status,
      data: result,
    };
  } catch (error) {
    const failResult: FetchResType = {
      status: "fail",
      data: null,
    };
    if (!documentName) {
      return await {
        ...failResult,
        message: "document's name is required",
      };
    }
    return failResult;
  }
};

export const findDocumentById_ = async ({
  documentName = EVENTS,
  id,
}: {
  documentName: string;
  id: string;
}): Promise<FetchResType> => {
  try {
    const docRef = doc(fireStore, documentName, id);

    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return {
        status: "ok",
        data: docSnap.data(),
      };
    } else {
      // docSnap.data() will be undefined in this case
      return {
        status: "ok",
        data: [],
        message: "No such document!",
      };
    }
  } catch (error) {
    return { status: "fail", data: null, message: "Error getting document" };
  }
};

export const findDocumentById = async ({
  documentName = EVENTS,
  eventId,
}: {
  documentName: string;
  eventId: string;
}): Promise<FetchResType> => {
  try {
    const docRef = doc(fireStore, documentName, eventId);

    const res = await getRefDocument(docRef);
    console.log("res", res);
    return res;
  } catch (error) {
    return { status: "fail", data: null, message: "Error getting document" };
  }
};
