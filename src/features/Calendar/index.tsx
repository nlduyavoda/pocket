import { PlusOutlined } from "@ant-design/icons";
import Calendar from "@components/Calendar";
import { LoadingLarge } from "@components/Spin";
import FormCreate from "@features/Metronic/FormCreate.bill";
import useQuery from "@hooks/useQuery";
import { Bill } from "@types/FirebaseSource";
import { handleMonthChange } from "@services/FireBaseMethods";
import { DATE_TIME_FORMAT, formatDate } from "@utils/DateTime";
import { Button } from "antd";
import { format } from "date-fns";
import { useState } from "react";
import TableModal from "./TableModal";

const fetchingPayments = async (selectedDate: string) => {
  const month = new Date(selectedDate).getMonth() + 1;
  const year = new Date(selectedDate).getFullYear();
  const { status, data } = await handleMonthChange(month, year);
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
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const { data, loading, error } = useQuery<Bill[], string>(
    currentDate,
    fetchingPayments
  );

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
          onSubmit={(params: unknown) => {
            return;
          }}
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
              />
            ),
          }}
        />
      )}
    </div>
  );
};

const Footer = ({ selectedDate }: { selectedDate: string }) => {
  const [isCreate, setIsCreate] = useState<boolean>(false);
  return (
    <div>
      {isCreate ? (
        <FormCreate
          selectedDate={selectedDate}
          onClose={() => setIsCreate(false)}
        />
      ) : (
        <div className="flex w-full justify-between">
          <div>
            <Button icon={<PlusOutlined />} onClick={() => setIsCreate(true)}>
              Add payment
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentCalendar;
