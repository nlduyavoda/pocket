import { addCollection, getCollection } from "@services/FireBaseMethods";
import { TRANSACTIONS } from "@services/utils";
import { onFilterPayment } from "@utils/PaymentController/Transactions";
import { MonthlyExpenses } from "@utils/variables";
import { useEffect, useState } from "react";

export const usePayment = () => {
  const [payment, setPayment] = useState<MonthlyExpenses[]>([]);
  useEffect(() => {
    async function getAsyncCollection() {
      const response = (await getCollection({
        documentName: TRANSACTIONS,
      })) as { status: "fail" | "ok"; data: MonthlyExpenses[] };
      const { status, data } = response;
      if (status === "ok" && data) {
        const filterData: MonthlyExpenses[] = data.map((payment) => {
          return onFilterPayment(payment);
        });
        setPayment(filterData);
      } else {
        console.log("getCollection fail");
      }
    }
    getAsyncCollection();
  }, []);

  const onAddPaymentToFireBase = async (paymentProps: MonthlyExpenses) => {
    const dataCloned = [...payment];
    dataCloned.unshift(paymentProps);
    const { status } = await addCollection({
      documentName: TRANSACTIONS,
      data: paymentProps,
    });
    if (status === "ok") {
      setPayment(dataCloned);
    } else {
      console.log("fail");
    }
  };

  return { payment, addPayment: onAddPaymentToFireBase };
};
