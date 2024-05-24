import { DATE_TIME_FORMAT, formatDate } from "@utils/DateTime";
import { Payment } from "Types/IPayment";
import { Calendar } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { dateCellRender, monthCellRender } from "./Calendar.subInterfaces";

const CalendarInternal = ({
  onSelect,
  dataSource,
}: {
  onSelect: (date: string) => void;
  dataSource: Payment[] | null;
}) => {
  const handleRenderCell = (date: unknown, info: any) => {
    if (info.type === "date" && dataSource) {
      return dateCellRender(
        dataSource.filter((payment: Payment) => {
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
