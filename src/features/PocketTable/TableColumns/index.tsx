import { ColumnsType } from "antd/es/table";
import { Popconfirm } from "antd";
import { DeleteTwoTone } from "@ant-design/icons";
import { Category, EventPayment } from "Types/FirebaseSource";
import {
  Payment,
  ColumnRenderType,
  SchemaKey,
  SchemaValue,
  IColumnSchemaObject,
} from "Types/IPayment";
import { ReactNode } from "react";

function formatCurrency(price: number) {
  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  return formatter.format(price);
}

export const getTableColumns = (
  columns: IColumnSchemaObject,
  categories: Category[] | undefined,
  events: EventPayment[] | undefined,
  onConfirm: (paymentId: string) => void
): ColumnsType<Payment> =>
  Object.entries(columns).map(([key, schemaKey]) => {
    const defaultColumns = {
      dataIndex: key,
      key,
      title: key,
      width: 100,
    };

    const customColumns: ColumnRenderType = {
      name: (_, record: Payment) => (
        <p className="text-[24px]">
          {String(record[schemaKey as keyof Payment])}
        </p>
      ),
      price: (_, record: Payment) => (
        <p className="text-[24px]">
          {formatCurrency(
            Number(record[schemaKey as keyof Payment] || 0) * 1000
          )}
        </p>
      ),
      action: (_, record: Payment) => (
        <Actions
          id={record.id}
          onConfirm={() => onConfirm(record.id)}
          icon={
            <DeleteTwoTone
              style={{ fontSize: "24px" }}
              twoToneColor="#3699ff"
            />
          }
        />
      ),
      category: (_, record: Payment) => {
        const category =
          categories?.find((cat) => cat.id === record.categoryId)?.key || "";
        return <p className="text-[24px]">{category}</p>;
      },
      event: (_, record: Payment) => {
        const event =
          events?.find((evt) => evt.id === record.eventId)?.title || "";
        return <p className="text-[24px]">{event}</p>;
      },
    };

    return {
      ...defaultColumns,
      render: customColumns[key as keyof ColumnRenderType],
    };
  });

export const Actions = ({
  id,
  onConfirm,
  icon,
}: {
  id: string;
  onConfirm: (id: string) => void;
  icon: ReactNode;
}) => {
  return (
    <Popconfirm
      title="Title"
      description={`Open Popconfirm with Promise ID: ${id}`}
      onConfirm={() => onConfirm(id)}
      onOpenChange={() => console.log("open change")}
    >
      {icon}
    </Popconfirm>
  );
};
