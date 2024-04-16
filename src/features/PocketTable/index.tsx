import PaymentAdd from "@features/FormAddPayment";
import { MonthlyExpenses } from "@utils/variables";
import { Table, Tag } from "antd";
import { ColumnType, ColumnsType } from "antd/es/table";
import { useState } from "react";
import { DrawerTable } from "./DrawerTable";
import { usePayment } from "./usePayment";
import { useTable } from "./useTable";
import { PocketColumn } from "./utils";
import { TableOverview } from "@components/Table";

export const PocketTable = () => {
  const { payment, addPayment } = usePayment();
  const { tableData, tableColumns } = useTable(payment);
  const [selectedPayment, setSelectedPayment] =
    useState<MonthlyExpenses | null>(null);
  const [open, setOpen] = useState(false);

  const handleSelect = (paymentId: string) => {
    setOpen(true);
    const result: MonthlyExpenses | null =
      payment.find((payment) => payment.id === paymentId) || null;
    setSelectedPayment(result);
  };

  return (
    <div>
      {payment.length > 0 ? (
        <>
          <TableOverview
            dataSource={tableData}
            columns={tableColumns}
            onSelect={handleSelect}
          />
          <Table
            dataSource={tableData}
            columns={
              tableColumns
                .map((col: ColumnType<PocketColumn>) => {
                  if (col?.key === "id") return false;
                  else {
                    return {
                      ...col,
                      render: (record: string) => <Tag>{record}</Tag>,
                    };
                  }
                })
                .filter(Boolean) as ColumnsType<any>
            }
            bordered
            scroll={{ y: 120 }}
            onRow={(record, rowIndex) => {
              return {
                onClick: (event) => {
                  handleSelect(record?.id);
                },
              };
            }}
          />
          <DrawerTable
            selectedPayment={selectedPayment}
            open={open}
            onClose={() => setOpen(false)}
          />
        </>
      ) : (
        "loading"
      )}
      <PaymentAdd onAddPayment={addPayment} />
    </div>
  );
};
