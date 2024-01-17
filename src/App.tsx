import { PocketForm } from "@features/PocketForm";
import { PocketTable } from "@features/PocketTable";
import { MonthlyExpenses, defaultMonthlyExpenses } from "@utils/variables";
import { useState } from "react";

function App() {
  const [data, setData] = useState<MonthlyExpenses[]>([
    defaultMonthlyExpenses,
    defaultMonthlyExpenses,
  ]);
  const handleAddPayment = (payment: MonthlyExpenses) => {
    const dataCloned = [...data];
    dataCloned.unshift(payment);
    setData(dataCloned);
  };

  return (
    <div className="App">
      <PocketTable data={data} />
      <PocketForm onAddPayment={handleAddPayment} />
    </div>
  );
}

export default App;
