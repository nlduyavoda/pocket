import { DATE_TIME_FORMAT, formatDate } from "@utils/DateTime";
import { Calendar } from "antd";
import dayjs, { Dayjs } from "dayjs";
import type { CellRenderInfo } from "rc-picker/lib/interface";
import { dateCellRender, monthCellRender } from "./Calendar.subInterfaces";
import { Payment } from "Types/IPayment";

const CalendarInternal = ({
  onSelect,
  payments,
}: {
  onSelect: (date: Dayjs, selectInfo: CellRenderInfo<Dayjs>) => void;
  payments: Payment[] | null;
}) => {
  const handleRenderCell = (date: Dayjs, info: CellRenderInfo<Dayjs>) => {
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

  return (
    <Calendar
      onPanelChange={(date, _) => dayjs(date).format(DATE_TIME_FORMAT)}
      onSelect={onSelect}
      cellRender={handleRenderCell}
    />
  );
};

export default CalendarInternal;
