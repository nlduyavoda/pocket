import { withFireBaseSource } from "@hocs/withFireBaseSource";
import { FirebaseSource } from "@types/FirebaseSource";
import type { CalendarProps } from "antd";
import { Calendar } from "antd";
import type { Dayjs } from "dayjs";
import { useState } from "react";
import TableModal from "./TableModal";

const PaymentCalendar = ({ categories, events }: FirebaseSource) => {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);

  const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>["mode"]) => {
    console.log(value.format("YYYY-MM-DD"), mode);
  };
  const handleSelect = async (dateProps: any) => {
    setSelectedDate(dateProps);
    setOpen(true);
  };
  const handleAddPayment = (params: any) => {
    return;
  };

  return (
    <>
      <Calendar onPanelChange={onPanelChange} onSelect={handleSelect} />;
      <TableModal
        title="List of payments"
        onClose={() => setOpen(false)}
        open={open}
        selectedDate={selectedDate}
        categories={categories}
        events={events}
        onSubmit={handleAddPayment}
        modalProps={{
          width: 1000,
          okButtonProps: {
            type: "primary",
          },
        }}
      />
    </>
  );
};

export default withFireBaseSource(PaymentCalendar);
