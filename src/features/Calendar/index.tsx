import Calendar from "@components/Calendar";
import { LoadingLarge } from "@components/Spin";
import useQuery from "@hooks/useQuery";
import { handleMonthChange } from "@services/FireBaseMethods";
import { DATE_TIME_FORMAT, formatDate } from "@utils/DateTime";
import { format } from "date-fns";
import { useId, useState } from "react";
import { Footer } from "./Footer";
import TableModal from "@features/PocketTable/TableModal";
import { Payment } from "Types/IPayment";

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

const PaymentCalendar = () => {
  const id = useId();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const { data, loading, error, setQueryData } = useQuery<
    Payment[] | [],
    string
  >(currentDate, fetchingPayments);
  const handleUpdatePayment = (newPayment: unknown) => {
    if (data && newPayment) {
      const updatedData = [...data, { id, ...newPayment } as Payment];
      setQueryData(updatedData);
    }
  };
  const handeDeletePayment = (id: string) => {
    if (id) {
      const updatedData = data.filter((payment) => payment.id !== id) || data;
      setQueryData(updatedData);
    }
  };
  if (loading) return <LoadingLarge />;
  if (error) return <div>Error</div>;
  return data && data.length < 0 ? (
    <div>empty payment</div>
  ) : (
    <div>
      <Calendar
        onSelect={(dateProps: any) => {
          setSelectedDate(dateProps);
        }}
        payments={data}
      />
      {selectedDate && (
        <TableModal
          bills={data}
          onClose={() => setSelectedDate(null)}
          open={!!selectedDate}
          selectedDate={formatDate(selectedDate)}
          onDeletePayment={handeDeletePayment}
          modalProps={{
            width: 1000,
            okButtonProps: {
              type: "primary",
            },
            title: (
              <h1>
                Current date: {format(new Date(selectedDate), DATE_TIME_FORMAT)}
              </h1>
            ),
            footer: (
              <Footer
                selectedDate={format(new Date(selectedDate), DATE_TIME_FORMAT)}
                updatePayment={handleUpdatePayment}
              />
            ),
          }}
        />
      )}
    </div>
  );
};

export default PaymentCalendar;
