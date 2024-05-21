import { Tag } from "antd";
import { Dayjs } from "dayjs";

export const getListData = (value: Dayjs) => {
  let listData;
  switch (value.date()) {
    case 8:
      listData = [
        { type: "warning", content: "This is warning event." },
        { type: "success", content: "This is usual event." },
      ];
      break;
    case 10:
      listData = [
        { type: "warning", content: "This is warning event." },
        { type: "success", content: "This is usual event." },
        { type: "error", content: "This is error event." },
      ];
      break;
    case 15:
      listData = [
        { type: "warning", content: "This is warning event" },
        { type: "success", content: "This is very long usual event......" },
        { type: "error", content: "This is error event 1." },
        { type: "error", content: "This is error event 2." },
        { type: "error", content: "This is error event 3." },
        { type: "error", content: "This is error event 4." },
      ];
      break;
    default:
  }
  return listData || [];
};

export const getMonthData = (value: unknown) => {
  const date = value as Dayjs;
  if (date.month() === 8) {
    return 1394;
  }
};

export const monthCellRender = (value: unknown): React.ReactNode => {
  const date = value as Dayjs;
  const num = getMonthData(date);
  return num ? (
    <div className="notes-month">
      <section>{num}</section>
      <span>Backlog number</span>
    </div>
  ) : null;
};

export const dateCellRender = (payments: any): React.ReactNode => {
  const total = payments.reduce((acc, payment) => {
    return acc + parseInt(payment.value) * 1000;
  }, 0);

  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  const formatted = formatter.format(total); // "50,000.00 ₫"
  return (
    payments.length && (
      <Tag className="inline-flex w-full p-[8px] text-[18px]" color="magenta">
        <div>{formatted}</div>
      </Tag>
    )
  );
};
