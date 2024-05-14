import { Badge, BadgeProps, Tag } from "antd";
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

const getDayTotalPrice = (payments) => {
  return 200;
};

export const getMonthData = (value: Dayjs) => {
  if (value.month() === 8) {
    return 1394;
  }
};

export const monthCellRender = (value: Dayjs) => {
  const num = getMonthData(value);
  return num ? (
    <div className="notes-month">
      <section>{num}</section>
      <span>Backlog number</span>
    </div>
  ) : null;
};

type Payment = {
  categoryId: string;
  createAt: {
    seconds: number;
    nanoseconds: number;
  };
  eventId: string;
  id: string;
  key: string;
  value: string;
};

export const dateCellRender = (
  value: Dayjs,
  selectedDate: Date,
  payment: any
) => {
  return (
    payment && (
      <Tag className="inline-flex w-full p-[8px] text-[18px]" color="magenta">
        <div>{payment.value},000đ</div>
      </Tag>
    )
  );
};
