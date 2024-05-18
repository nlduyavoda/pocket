import { ColumnType } from "antd/es/table";
import { ColumnRenderType, SchemaKey, SchemaValue } from "../types";
import { Payment } from "@api/type";
import { Popconfirm } from "antd";
import { DeleteTwoTone } from "@ant-design/icons";
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
      <p className="text-[24px]">{record[schemaKey as keyof Payment] + ""}</p>
    ),
    price: (_: any, record: Payment) => (
      <p className="text-[24px]">
        {formatCurrency(+(record[schemaKey as keyof Payment] || 0) * 1000)}
      </p>
    ),
    action: (_: any, record: Payment) => (
      <Actions id={record.id} onConfirm={() => onConfirm(record.id)} />
    ),
    category: (_: any, record: Payment) => {
      const category: string =
        categories.find((ele: { id: string }) => ele?.id === record.categoryId)
          ?.key || "";
      return <p className="text-[24px]">{category}</p>;
    },
    event: (_: any, record: Payment) => {
      const event =
        events.find((ele: { id: string }) => ele?.id === record.eventId)
          ?.title || "";
      return <p className="text-[24px]">{event}</p>;
    },
  };

  return {
    ...defaultColumns,
    render: customColumns[key],
  };
};

export const Actions = ({
  id,
  onConfirm,
}: {
  id: string;
  onConfirm: (id: string) => void;
}) => {
  return (
    <div>
      <Popconfirm
        title="Title"
        description={`Open Popconfirm with Promise ID: ${id}`}
        onConfirm={() => onConfirm(id)}
        onOpenChange={() => console.log("open change")}
      >
        <DeleteTwoTone
          style={{
            fontSize: "24px",
          }}
          twoToneColor="#eb2f96"
        />
      </Popconfirm>
    </div>
  );
};
