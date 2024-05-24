import { Payment } from "Types/IPayment";
import { useEffect, useState } from "react";

const useDateMethods = ({ dataSource }) => {
  const [selectedDataSource, setSelectedDataSource] = useState<Payment[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const handleDelete = (id: string) => {};
  const handleCreate = (newPayment: Payment) =>
    setSelectedDataSource([newPayment, ...selectedDataSource]);
  const handleUpdate = (payment: Payment) => {};
  const handleSelect = (date: string | null) => setSelectedDate(date);

  useEffect(() => {
    if (dataSource) {
      const selectedSource = dataSource.filter(
        (item: Payment) => item.createAt === selectedDate
      );
      console.log(selectedSource);
      if (selectedSource.length) {
        setSelectedDataSource(selectedSource);
      }
    }
  }, [dataSource, selectedDate]);

  return {
    selectedDate,
    selectedDataSource,
    handleDelete,
    handleCreate,
    handleUpdate,
    handleSelect,
  };
};

export default useDateMethods;
