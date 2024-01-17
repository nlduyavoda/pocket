"use client";
import { MonthlyExpenses, defaultMonthlyExpenses } from "@utils/variables";
import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { flattenObject, getTableColumns } from "./utils";

export const PocketTable = (props: { data: MonthlyExpenses[] }) => {
  const { data } = props;
  const tableData = data.map((ele: MonthlyExpenses) => flattenObject(ele));
  const tableColumns: ColumnsType<any> = getTableColumns(data[0]);
  return (
    <Table
      dataSource={tableData}
      columns={tableColumns}
      bordered
      scroll={{ x: 600, y: 300 }}
    />
  );
};
