import { DeleteTwoTone, EditOutlined } from "@ant-design/icons";
import { ButtonCancel, ButtonSuccess } from "@components/Button";
import { Payment } from "Types/IPayment";
import { ColumnsType } from "antd/es/table";
import { Action } from "./Action";
import { columns } from "./columns";

export const getTableColumns = (
  handleDelete: (paymentId: string) => void,
  handleUpdate: (id: string) => void,
  editingKey: string,
  handleSubmit: () => void
): ColumnsType<Payment> => {
  const isEditing = (record: Payment) => record.id === editingKey;
  return columns.map((col, index) => {
    if (col.editTable) {
      return {
        ...col,
        onCell: (record: Payment, rowIndex) => ({
          index: rowIndex,
          record,
          inputType: col.dataIndex === "age" ? "number" : "text",
          dataIndex: col.dataIndex,
          title: col.title,
          editing: isEditing(record),
        }),
      };
    }
    if (col.key === "action") {
      col.render = (_: any, record: Payment) => {
        const editable = isEditing(record);
        return editable ? (
          <div className="flex">
            <ButtonSuccess onClick={handleSubmit}>Save</ButtonSuccess>
            <ButtonCancel onClick={() => handleUpdate("")}>Cancel</ButtonCancel>
          </div>
        ) : (
          <>
            <Action
              id={record.id}
              onConfirm={() => handleDelete(record.id)}
              Icon={
                <DeleteTwoTone
                  style={{ fontSize: "24px" }}
                  twoToneColor="#3699ff"
                />
              }
            />
            <Action
              id={record.id}
              onConfirm={() => handleUpdate(record.id)}
              Icon={
                <EditOutlined
                  style={{ fontSize: "24px" }}
                  twoToneColor="#3699ff"
                />
              }
            />
          </>
        );
      };
    }
    return { index, ...col };
  });
};
