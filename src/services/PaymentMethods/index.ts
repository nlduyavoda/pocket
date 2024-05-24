import { removeDocument } from "@services/FireBaseMethods";
import { FetchResType } from "@services/Types";

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
