import { Payment } from "@api/type";
import { TableOverview } from "@components/Table";
import { withFireBaseSource } from "@hocs/withFireBaseSource";
import usePaymentMutate from "@hooks/usePaymentMutate";
import { deletePayment } from "@services/PaymentMethods";
import { ColumnsType } from "antd/es/table";
import { getTableColumns } from "./TableColumns";
import { TableProps } from "./types";
import { columnsSchema } from "./utils";

export const OverviewTable = ({
  categories,
  events,
  bills,
  selectedDate,
}: TableProps) => {
  const { mutate, data, isLoading, error } = usePaymentMutate();
  const dataSource = bills?.filter(
    ({ createAt }: Pick<Payment, "createAt">) => createAt === selectedDate
  );
  const handleDelete = (paymentId: string) => mutate(paymentId, deletePayment);
  const columns: ColumnsType<Payment> = Object.entries(columnsSchema).map(
    (value: any) => getTableColumns(value, categories, events, handleDelete)
  );

  return <TableOverview dataSource={dataSource} columns={columns} bordered />;
};

export const OverviewWithDataSource = withFireBaseSource<TableProps>(
  OverviewTable,
  ["categories", "events"]
);
