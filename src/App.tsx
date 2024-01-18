import { PocketForm } from "@features/PocketForm";
import { PocketTable } from "@features/PocketTable";
import { MonthlyExpenses } from "@utils/variables";
import { useEffect, useState } from "react";
import {
  GetCollectionResponse,
  getCollection,
} from "./services/FireBaseConfig";

function App() {
  // TODO: Replace the following with your app's Firebase project configuration

  const [payment, setPayment] = useState<MonthlyExpenses[]>([]);
  const handleAddPayment = (paymentProps: MonthlyExpenses) => {
    const dataCloned = [...payment];
    dataCloned.unshift(paymentProps);
    setPayment(dataCloned);
  };

  useEffect(() => {
    async function getAsyncCollection() {
      const { status, data } = (await getCollection({
        documentName: "transactions",
      })) as GetCollectionResponse;
      if (status === "ok" && data) {
        const newPayment = [...payment] as MonthlyExpenses[];
        const newData = { ...data } as MonthlyExpenses;
        newPayment.unshift(newData);
        setPayment(newPayment);
      } else {
        console.log("set data fail");
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
