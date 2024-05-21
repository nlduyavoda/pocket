import { DATE_TIME_FORMAT, formatDate } from "@utils/DateTime";
import { Payment } from "Types/IPayment";
import { Calendar } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { dateCellRender, monthCellRender } from "./Calendar.subInterfaces";

const CalendarInternal = ({
  onSelect,
  payments,
}: {
  onSelect: (date: string) => void;
  payments: Payment[] | null;
}) => {
  const handleRenderCell = (date: unknown, info: any) => {
    if (info.type === "date" && payments) {
      return dateCellRender(
        payments.filter((payment: Payment) => {
          return formatDate(payment.createAt) === formatDate(date);
        }) || null
      );
    }
    if (info.type === "month") return monthCellRender(date);
    return info.originNode;
  };
  const handleSelectDate = (date: unknown, selectInfo: any) => {
    const dateFormat = formatDate(date);
    return onSelect(dateFormat);
  };

  return (
    <Calendar
      onPanelChange={(date: unknown, _) => {
        return dayjs(date as Dayjs).format(DATE_TIME_FORMAT);
      }}
      onSelect={handleSelectDate}
      cellRender={handleRenderCell}
    />
  );
};

export default CalendarInternal;
