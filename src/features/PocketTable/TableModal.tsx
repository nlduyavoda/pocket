import { withFireBaseSource } from "@hocs/withFireBaseSource";
import usePaymentMutate from "@hooks/usePaymentMutate";
import { deletePayment } from "@services/PaymentMethods";
import Table, { ColumnsType } from "antd/es/table";
import { getTableColumns } from "./TableColumns";
import { columnsSchema } from "./utils";
import { withFormModal } from "@hocs/withFormModal";
import { Payment, TableModalProps } from "Types/IPayment";

export const TableModal = withFireBaseSource(
  ({
    categories,
    events,
    bills,
    selectedDate,
    onDeletePayment,
  }: TableModalProps) => {
    const { mutate } = usePaymentMutate();
    const dataSource = bills?.filter(
      ({ createAt }: Pick<Payment, "createAt">) => createAt === selectedDate
    );
    const handleDelete = async (paymentId: string) => {
      await mutate(paymentId, deletePayment);
      onDeletePayment(paymentId);
    };

    const columns: ColumnsType<Payment> = Object.entries(columnsSchema).map(
      (value: any) => getTableColumns(value, categories, events, handleDelete)
    );

    return <Table dataSource={dataSource} columns={columns} bordered />;
  },
  ["categories", "events"]
);

export default withFormModal<TableModalProps>(TableModal);
