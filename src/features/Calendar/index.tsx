import { PlusOutlined } from "@ant-design/icons";
import Calendar from "@components/Calendar";
import Loading from "@components/Spin";
import FormCreate from "@features/Metronic/FormCreate.bill";
import { handleMonthChange } from "@services/FireBaseMethods";
import { Bill } from "@types/FirebaseSource";
import { DATE_TIME_FORMAT, formatDate } from "@utils/DateTime";
import { Button } from "antd";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import TableModal from "./TableModal";

const PaymentCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString()
  );
  const [payments, setPayments] = useState<Bill[]>([]);
  const [open, setOpen] = useState<boolean>(false);

  const handleSelect = async (dateProps: any) => {
    setSelectedDate(dateProps);
    setOpen(true);
  };
  useEffect(() => {
    async function getPayment() {
      const { data } = await handleMonthChange(
        new Date(selectedDate).getMonth() + 1,
        new Date(selectedDate).getFullYear()
      );
      for (const payment of data) {
        const date = format(
          new Date(payment.createAt.toDate()),
          DATE_TIME_FORMAT
        );
        payment.createAt = date;
      }
      setPayments(data);
    }
    getPayment();
  }, [selectedDate]);
  console.log(payments);
  return (
    <>
      {payments.length > 0 ? (
        <Calendar
          onSelect={handleSelect}
          selectedDate={selectedDate}
          payments={payments}
        />
      ) : (
        <Loading />
      )}
      {selectedDate && (
        <TableModal
          bills={payments}
          onClose={() => setOpen(false)}
          open={open}
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
    </>
  );
};

const Footer = ({ selectedDate }) => {
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
          {/* <div>
            <Button onClick={() => setIsCreate(false)}>Close</Button>
            <Button onClick={() => setIsCreate(false)}>Submit</Button>
          </div> */}
        </div>
      )}
    </div>
  );
};

export default PaymentCalendar;
