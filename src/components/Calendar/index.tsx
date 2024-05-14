import { Calendar, CalendarProps } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { dateCellRender, monthCellRender } from "./Calendar.subInterfaces";
import { DATE_TIME_FORMAT, formatDate } from "@utils/DateTime";

const CalendarInternal = ({
  onSelect,
  selectedDate,
  payments,
}: {
  onSelect: unknown;
  selectedDate: Date;
  payments: {
    createAt: any;
  }[];
}) => {
  const cellRender: CalendarProps<Dayjs>["cellRender"] = (
    current: Date,
    info
  ) => {
    if (info.type === "date") {
      return dateCellRender(
        current,
        selectedDate,
        payments.find((payment) => {
          return payment.createAt === formatDate(current);
        }) || null
      );
    }
    if (info.type === "month") return monthCellRender(current);
    return info.originNode;
  };
  const handlePanelChange: CalendarProps<Dayjs>["onPanelChange"] = (
    date,
    mode
  ) => {
    return dayjs(date).format(DATE_TIME_FORMAT);
  };
  return (
    <Calendar
      onPanelChange={handlePanelChange}
      onSelect={onSelect}
      cellRender={cellRender}
    />
  );
};

export default CalendarInternal;
