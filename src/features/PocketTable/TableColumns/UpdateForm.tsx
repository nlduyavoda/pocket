import { withHookForm } from "@hocs/withHookForm";
import { Table } from "antd";
import { useFormContext } from "react-hook-form";
import { getTableColumns } from ".";
import { Payment } from "Types/IPayment";
import { ColumnsType } from "antd/es/table";
import { EditableCell } from "./EdittingCell";
import { useState } from "react";
import usePaymentMutate from "@hooks/usePaymentMutate";
import { updatePayment } from "@services/FireBaseMethods";
import { deletePayment } from "@services/PaymentMethods";
import Loading from "@components/Spin";

export const UpdateForm = withHookForm(() => {
  const methods = useFormContext();
  const { mutate } = usePaymentMutate();
  const [editingKey, setEditingKey] = useState("");
  const handleUpdate = (id: string) => {
    setEditingKey(id);
  };
  const handleDelete = async (paymentId: string) => {
    await mutate(paymentId, deletePayment);
  };
  const handleSubmit = methods.handleSubmit(async (data) => {
    const newPayment =
      data.payments.find((item: Payment) => item.id === editingKey) || null;

    if (!!newPayment) {
      const input: Payment = {
        id: newPayment.id,
        key: newPayment.key,
        value: newPayment.value + "",
        eventId: newPayment.event?.id || null,
        categoryId: newPayment.category.id || null,
        createAt: newPayment.createAt,
      };
      const result = await mutate(
        { docId: editingKey, data: input },
        updatePayment
      );
      console.log(result);
      setEditingKey("");
    }
  });
  const columns: ColumnsType<Payment> = getTableColumns(
    // categories,
    // events,
    handleDelete,
    handleUpdate,
    editingKey,
    handleSubmit
  );

  return methods.getValues("payments") ? (
    <Table
      dataSource={methods.getValues("payments")}
      columns={columns}
      bordered
      style={{ minHeight: "400px" }}
      components={{
        body: {
          cell: EditableCell,
        },
      }}
      scroll={{
        y: 400,
      }}
    />
  ) : (
    <Loading />
  );
});
