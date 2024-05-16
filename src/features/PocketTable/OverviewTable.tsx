import { TableOverview } from "@components/Table";
import { withFireBaseSource } from "@hocs/withFireBaseSource";
import { RequiredProps } from "@hocs/withFormModal";
import usePaymentMutate from "@hooks/usePaymentMutate";
import { deletePayment } from "@services/PaymentMethods";
import { CustomType, FirebaseSource } from "@types/FirebaseSource";
import { ColumnType, ColumnsType } from "antd/es/table";
import { TableColumns, TableColumnsCoppy } from "./TableColumns";
import { Payment } from "@api/type";
import { ActionColumn, InitialColumn } from "./TableColumns/Column";

type TableProps = RequiredProps & FirebaseSource & { selectedDate: string };
const initialPayment: Payment = {
  id: "xtm8prEhj623qU54IZ6J",
  value: "600",
  key: "test11",
  createAt: "05/14/2024",
  eventId: "YPX1sLPLDtmJReYuXLjU",
  categoryId: "4EIUjeguk2ATTulGcMbT",
};
const columnsSchema = {
  name: "key",
  category: "categoryId",
  event: "eventId",
  price: "value",
  action: "action",
};

export const OverviewTable = (props: TableProps) => {
  const { mutate, data, isLoading, error } = usePaymentMutate();
  const handleDelete = (paymentId: string) => mutate(paymentId, deletePayment);
  const { categories, events, bills } = props;
  const columns: ColumnsType<CustomType> = Object.entries(columnsSchema).map(
    (colSchema) => {
      const [key, paymentKey] = colSchema;
      const defaultColumn: ColumnType<CustomType> = {
        dataIndex: key,
        key: key,
        title: key,
        width: 100,
        render: () => <>...</>,
      };
      if (key === "category") {
        return {
          ...defaultColumn,
          render: (text: any, record: Payment) => {
            const category: string =
              categories.find((ele) => ele?.id === record.categoryId)?.key ||
              "";
            return <InitialColumn text={category} />;
          },
        };
      }
      if (key === "event") {
        return {
          ...defaultColumn,
          render: (text: any, record: Payment) => {
            const event =
              events.find((ele) => ele?.id === record.eventId)?.title || "";
            return <InitialColumn text={event} />;
          },
        };
      }
      if (key === "action") {
        return {
          ...defaultColumn,
          render: (text: any, record: Payment) => (
            <ActionColumn id={record.id} onConfirm={handleDelete} />
          ),
        };
      }
      return {
        dataIndex: key,
        key: key,
        title: key,
        width: 100,
        render: (text: any, record: Payment) => {
          return <InitialColumn text={record[paymentKey]} />;
        },
      };
    }
  );

  return (
    <TableOverview
      dataSource={bills.filter(
        ({ createAt }) => createAt === props.selectedDate
      )}
      columns={columns}
      bordered
    />
  );
};

export const OverviewWithDataSource = withFireBaseSource<TableProps>(
  OverviewTable,
  ["categories", "events"]
);
