import { MonthlyExpenses } from "@utils/variables";
import { Button, Table } from "antd";
import { ColumnType, ColumnsType } from "antd/es/table";
import { PocketColumn, flattenObject, getTableColumns } from "./utils";

export const PocketTable = (props: { data: MonthlyExpenses[] }) => {
  const { data } = props;
  const tableData = data.map((ele: MonthlyExpenses) => flattenObject(ele));
  const tableColumns: ColumnsType<any> = getTableColumns(data[0]);
  const dateColumn = (col: ColumnType<PocketColumn>) => {
    return {
      ...col,
      render: (val: string) => {
        return (
          <div>
            {val}
            <Button>detail</Button>
          </div>
        );
      },
    };
  };

  const columnsFilter = tableColumns.map((col: ColumnType<PocketColumn>) =>
    col.dataIndex !== "date_added" ? col : dateColumn(col)
  ) as ColumnsType<any>;

  return (
    <Table
      dataSource={tableData}
      columns={columnsFilter}
      bordered
      scroll={{ x: 600, y: 300 }}
    />
  );
};
