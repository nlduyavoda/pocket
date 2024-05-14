import { CustomType } from "@types/FirebaseSource";
import { ColumnsType } from "antd/es/table";
const columnSchema = ["name", "category", "event", "price"];

const handleRenderColumn = (record, keyval, categories, events) => {
  const { categoryId, createAt, eventId, id, key, value } = record;
  const schema = {
    name: key,
    category:
      categories.find((ele: { id?: string }) => ele?.id === categoryId)?.key ||
      "",
    event:
      events.find((ele: { id?: string }) => ele?.id === eventId)?.title || "",
    price: value,
  };
  return <p className="text-[14px]">{schema[keyval]}</p>;
};

export const paymentColumns = ({ categories, events }) => {
  const columns: ColumnsType<CustomType> = columnSchema.map((key) => {
    return {
      dataIndex: key,
      key,
      title: key,
      width: 100,
      render: (value, record, index) =>
        handleRenderColumn(record, key, categories, events),
    };
  });
  return columns;
};
