"use client";
import { MonthlyExpenses, defaultMonthlyExpenses } from "@utils/variables";
import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { flattenObject, getTableColumns } from "./utils";

export const PocketTable = () => {
  const data: MonthlyExpenses = { ...defaultMonthlyExpenses };
  const tableData = flattenObject(data);
  const tableColumns: ColumnsType<any> = getTableColumns(data);
  return (
    <Table
      dataSource={[tableData]}
      columns={tableColumns}
      bordered
      scroll={{ x: 600, y: 300 }}
    />
  );
};
