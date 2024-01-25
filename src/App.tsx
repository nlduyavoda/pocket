import { PocketForm } from "@features/PocketForm";
import { PocketTable } from "@features/PocketTable";
import { MonthlyExpenses } from "@utils/variables";
import { useEffect, useState } from "react";
import { addCollection, getCollection } from "./services/FireBaseMethods";
import { TRANSACTIONS } from "./services/utils";
import { onFilterPayment } from "@utils/PaymentController/Transactions";

function App() {
  // TODO: Replace the following with your app's Firebase project configuration
  const [payment, setPayment] = useState<MonthlyExpenses[]>([]);
  const handleAddPayment = async (paymentProps: MonthlyExpenses) => {
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

  useEffect(() => {
    async function getAsyncCollection() {
      const { status, data } = (await getCollection({
        documentName: TRANSACTIONS,
      })) as { status: "fail" | "ok"; data: MonthlyExpenses[] };
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

  return (
    <div className="App">
      {payment.length > 0 ? <PocketTable data={payment} /> : "loading"}
      <PocketForm onAddPayment={handleAddPayment} />
    </div>
  );
}

export default App;
