import { DrawerInternal } from "@components/DrawerInternal";
import { MonthlyExpenses } from "@utils/variables";
import { Button, Form, Table } from "antd";
import { ColumnType, ColumnsType } from "antd/es/table";
import { useState } from "react";
import { PocketColumn, flattenObject, getTableColumns } from "./utils";
import { DrawerTable } from "./DrawerTable";

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

  const dateColumn = (col: ColumnType<PocketColumn>) => {
    return {
      ...col,
      render: (val: string, record: MonthlyExpenses) => {
        return (
          <div>
            {val}
            <Button
              onClick={() => {
                handleSelect(record?.id);
              }}
            >
              detail
            </Button>
          </div>
        );
      },
    };
  };
  const columnsFilter = tableColumns
    .map((col: ColumnType<PocketColumn>) => {
      if (col.key === "id") return false;
      return col.key !== "date_added" ? col : dateColumn(col);
    })
    .filter(Boolean) as ColumnsType<any>;

  return (
    <>
      <Table
        dataSource={tableData}
        columns={columnsFilter}
        bordered
        scroll={{ x: 600, y: 300 }}
      />
      <DrawerTable
        selectedPayment={selectedPayment}
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
};
