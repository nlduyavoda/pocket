import {
  ExpenseCategories,
  ExpenseProperties,
  Expenses_keys,
  MonthlyExpenses,
  NestedKeys,
} from "@utils/variables";
import { flattenObject } from "./utils";
import { ColumnType, ColumnsType } from "antd/es/table";

const fixedColumns = ["total_expenses", "date_added"];

const getColumns = (
  col: Expenses_keys | NestedKeys,
  key?: string
): ColumnType<Columns_> => {
  const ExpenseCategoriesClone: { [key: string]: string } = {
    ...ExpenseCategories,
  };
  const ExpensePropertiesClone: { [key: string]: string } = {
    ...ExpenseProperties,
  };
  const title = key ? ExpensePropertiesClone[col] : ExpenseCategoriesClone[col];
  const tableColumns = {
    title,
    dataIndex: key ? `${key}.${col}` : col,
    key: key ? `${key}.${col}` : col,
    width: 150,
    children: [],
    fixed: fixedColumns.includes(col) ? "left" : undefined,
  } as ColumnType<Columns_>;

  return tableColumns;
};

export const useTable = ({
  data,
  initialColumns,
}: {
  data: MonthlyExpenses[];
  initialColumns: string[];
}) => {
  const tableData = data.map((ele: MonthlyExpenses) => flattenObject(ele));
  const tableColumns: ColumnsType<Columns_> =
    data.length > 0 ? Object.keys(data[0]).map((col) => getColumns(col)) : [];

  const filterColumdns = tableColumns
    .map((ele: any) => (initialColumns.includes(ele?.title) ? ele : null))
    .filter(Boolean);

  return { tableData, tableColumns: filterColumdns };
};

type Columns_ = {
  dataIndex: string;
  fixed: string;
  key: string;
  title: string;
  width: number;
};
