import { Category, EventPayment } from "Types/FirebaseSource";
import { Payment } from "Types/IPayment";
import { ReactNode } from "react";

const TextColumn = ({ children }: { children: ReactNode }) => {
  return <p className="text-[24px]">{children}</p>;
};

function formatCurrency(price: number) {
  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  return formatter.format(price);
}

const renderName = (_: any, record: Payment) => {
  return <TextColumn>{String(record["key" as keyof Payment])}</TextColumn>;
};

const renderPrice = (_: any, record: Payment) => {
  return (
    <TextColumn>
      {formatCurrency(Number(record["value" as keyof Payment] || 0) * 1000)}
    </TextColumn>
  );
};

const renderEvent = (_: any, record: Payment) => {
  const text = record["event" as keyof Payment] as EventPayment;
  return <TextColumn>{text?.title || ""}</TextColumn>;
};

const renderCategory = (_: any, record: Payment) => {
  const text = record["category" as keyof Payment] as Category;
  return <TextColumn>{text?.key || ""}</TextColumn>;
};

export const columns = [
  {
    dataIndex: "key",
    key: "key",
    title: "name",
    width: 100,
    editTable: true,
    render: renderName,
  },
  {
    dataIndex: "value",
    key: "value",
    title: "value",
    width: 100,
    editTable: true,
    render: renderPrice,
  },
  {
    dataIndex: "event",
    key: "event",
    title: "event",
    width: 100,
    editTable: true,
    render: renderEvent,
  },
  {
    dataIndex: "category",
    key: "category",
    title: "category",
    width: 100,
    editTable: true,
    render: renderCategory,
  },
  {
    dataIndex: "action",
    key: "action",
    title: "actions",
    width: 100,
    editTable: false,
  },
];
