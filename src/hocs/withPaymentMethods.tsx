import { LoadingLarge } from "@components/Spin";
import usePaymentMutate from "@hooks/usePaymentMutate";
import useQuery from "@hooks/useQuery";
import { handleMonthChange } from "@services/FireBaseMethods";
import { createPayment } from "@services/PaymentMethods";
import { DATE_TIME_FORMAT, formatDate } from "@utils/DateTime";
import { IWithPaymentMethodsProps, Payment } from "Types/IPayment";
import { format } from "date-fns";
import React, { ComponentType, useId, useState } from "react";

const fetchingPayments = async (selectedDate: string) => {
  const month = new Date(selectedDate).getMonth() + 1;
  const year = new Date(selectedDate).getFullYear();
  const { status, data } = await handleMonthChange({ month, year });
  if (status === "ok") {
    for (let payment of data) {
      const date = format(
        new Date(payment.createAt.toDate()),
        DATE_TIME_FORMAT
      );
      payment.createAt = date;
    }
    return data;
  } else return [];
};

const currentDate = new Date().toISOString();

const withPaymentMethods =
  <P extends object>(
    Component: ComponentType<P>
  ): React.FC<P & IWithPaymentMethodsProps> =>
  (props) => {
    const { mutate, isLoading } = usePaymentMutate();
    // const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [paymentFiltered, setPaymentFiltered] = useState<any>({
      selectedDate: null,
      dataSource: [],
    });
    const { data, loading, error, setQueryData } = useQuery<
      Payment[] | [],
      string
    >(currentDate, fetchingPayments);
    const id = useId();

    const onFilterSourceById = (prevPayment: any) => {
      return {
        ...prevPayment,
        dataSource: prevPayment.dataSource.filter(
          (payment: Payment) => payment.id !== id
        ),
      };
    };

    const handleUpdate = (newPayment: unknown) => {
      if (data && newPayment) {
        const updatePayment = { id, ...newPayment };
        const updatedData = [...data, updatePayment as Payment];
        setQueryData(updatedData);
        setPaymentFiltered((prevPayment: any) => ({
          ...prevPayment,
          dataSource: [updatePayment, ...prevPayment.dataSource],
        }));
      }
    };
    const handleCreate = async (newPayment: unknown) => {
      const data = await mutate(newPayment, createPayment);
      if (data && !isLoading && !error) {
        handleUpdate(newPayment);
      }
    };

    const handeDelete = (id: string) => {
      if (id) {
        const updatedData = data.filter((payment) => payment.id !== id);
        setQueryData(updatedData);
        setPaymentFiltered(onFilterSourceById);
      }
    };

    const handleSelectDate = (date: string) => {
      // setSelectedDate(date);
      if (data && data.length > 0) {
        const dataSource = data.filter(
          (payment) => formatDate(payment.createAt) === date
        );
        setPaymentFiltered((prev: any) => ({
          ...prev,
          selectedDate: date,
          dataSource,
        }));
      }
    };

    if (loading) return <LoadingLarge />;
    if (error) return <div>Error</div>;
    if (data && data.length < 0) return <div>empty payment</div>;

    return (
      <Component
        {...props}
        onCreate={handleCreate}
        onDelete={handeDelete}
        onSelect={handleSelectDate}
        // selectedDate={selectedDate}
        calendarData={data}
        dataSourceFilterByDate={paymentFiltered}
      />
    );
  };

export default withPaymentMethods;
