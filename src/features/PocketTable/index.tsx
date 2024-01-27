import { MonthlyExpenses } from "@utils/variables";
import { Table, Tag } from "antd";
import { ColumnType, ColumnsType } from "antd/es/table";
import { useState } from "react";
import { DrawerTable } from "./DrawerTable";
import { PocketColumn, flattenObject, getTableColumns } from "./utils";

export const PocketTable = (props: { data: MonthlyExpenses[] }) => {
  const { data } = props;
  const [selectedPayment, setSelectedPayment] =
    useState<MonthlyExpenses | null>(null);
  const [open, setOpen] = useState(false);
  const tableData = data.map((ele: MonthlyExpenses) => flattenObject(ele));
  const tableColumns: ColumnsType<any> = getTableColumns(data[0]);

  const handleSelect = (paymentId: string) => {
    setOpen(true);
    const result: MonthlyExpenses | null =
      data.find((payment) => payment.id === paymentId) || null;
    setSelectedPayment(result);
  };

  const columnsFilter = tableColumns
    .map((col: ColumnType<PocketColumn>) => {
      if (col?.key === "id") return false;
      else {
        return {
          ...col,
          render: (record: string) => <Tag>{record}</Tag>,
        };
      }
    })
    .filter(Boolean) as ColumnsType<any>;

  return (
    <>
      <Table
        dataSource={tableData}
        columns={columnsFilter}
        bordered
        scroll={{ x: 600, y: 300 }}
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
  );
};
