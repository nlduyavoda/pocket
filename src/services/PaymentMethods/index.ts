import { addBills, removeDocument } from "@services/FireBaseMethods";
import { FetchResType } from "@services/Types";

export const createPayment = async (values: unknown) => {
  const response = await addBills({
    data: values,
    documentName: "bills",
  });
  const { data, status } = response as { data: string } & FetchResType;
  if (status === "ok") {
    return JSON.parse(data);
  } else {
    return [];
  }
};

export const deletePayment = async (paymentID) => {
  const response = await removeDocument({
    collectionName: "bills",
    docId: paymentID,
  });
  const { data, status } = response as { data: string } & FetchResType;
  if (status === "ok") {
    return JSON.parse(data);
  } else {
    return [];
  }
};
