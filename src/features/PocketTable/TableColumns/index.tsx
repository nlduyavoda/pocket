import { ColumnType } from "antd/es/table";
import { ActionsColumn, BaseColumn } from "./Column.components";
import { ColumnRenderType, SchemaKey, SchemaValue } from "../types";
import { Payment } from "@api/type";
function formatCurrency(price: number) {
  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  return formatter.format(price);
}
export const getTableColumns = (
  column: [SchemaKey, SchemaValue],
  categories: any,
  events: any,
  onConfirm: (paymentId: string) => void
): ColumnType<Payment> => {
  const [key, schemaKey] = column;
  const defaultColumns = {
    dataIndex: key,
    key,
    title: key,
    width: 100,
  };
  const customColumns: ColumnRenderType = {
    name: (_: any, record: Payment) => (
      <BaseColumn text={record[schemaKey as keyof Payment] + ""} />
    ),
    price: (_: any, record: Payment) => (
      <BaseColumn
        text={formatCurrency(+(record[schemaKey as keyof Payment] || 0) * 1000)}
      />
    ),
    action: (_: any, record: Payment) => (
      <ActionsColumn id={record.id} onConfirm={() => onConfirm(record.id)} />
    ),
    category: (_: any, record: Payment) => {
      const category: string =
        categories.find((ele: { id: string }) => ele?.id === record.categoryId)
          ?.key || "";
      return <BaseColumn text={category} />;
    },
    event: (_: any, record: Payment) => {
      const event =
        events.find((ele: { id: string }) => ele?.id === record.eventId)
          ?.title || "";
      return <BaseColumn text={event} />;
    },
  };

  return {
    ...defaultColumns,
    render: customColumns[key],
  };
};

export const TableColumns = ({
  categories,
  events,
  colSchema,
  onConfirm,
  record,
}: any) => {
  const [key, paymentKey] = colSchema;
  if (key === "action") {
    return (
      <ActionsColumn id={record.id} onConfirm={() => onConfirm(record.id)} />
    );
  }
  if (key === "category") {
    const category: string =
      categories.find((ele: { id: string }) => ele?.id === record.categoryId)
        ?.key || "";
    return <BaseColumn text={category} />;
  }
  if (key === "event") {
    const event =
      events.find((ele: { id: string }) => ele?.id === record.eventId)?.title ||
      "";
    return <BaseColumn text={event} />;
  }
  return <BaseColumn text={record[paymentKey]} />;
};
