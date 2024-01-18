import {
  ExpenseCategories,
  ExpenseProperties,
  Expenses_keys,
  MonthlyExpenses,
  NestedKeys,
} from "@utils/variables";
import { ColumnType, ColumnsType } from "antd/es/table";
import { format } from "date-fns";

export const dataSource = [
  {
    key: "1",
    name: "John Doe",
    age: 30,
    address: "123 Main St",
  },
  {
    key: "2",
    name: "Jane Doe",
    age: 25,
    address: "456 Oak St",
  },
  // Add more data as needed
];
export type PocketColumn = { title: string; dataIndex: string; key: string };

export const columns: PocketColumn[] = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
];

export const defaultTableData = [
  {
    title: "Company Address",
    dataIndex: "companyAddress",
    key: "companyAddress",
    width: 200,
  },
];

const onCheckNested = (props: MonthlyExpenses[Expenses_keys]): boolean => {
  return typeof props === "object" && Object.keys(props).length > 0;
};

export const getTableColumns = (
  props: any,
  parentKey?: string
): ColumnsType<object> => {
  const propKeys = Object.keys(props) as string[];
  const columns = propKeys.map((singleKey: Expenses_keys | NestedKeys) => {
    const isNestedField: boolean = onCheckNested(props[singleKey]);
    const titleKeys: { [key: string]: string } = { ...ExpenseCategories };
    const subTitleKeys: { [key: string]: string } = { ...ExpenseProperties };

    const title = parentKey ? subTitleKeys[singleKey] : titleKeys[singleKey];

    const tableColumns = {
      title,
      dataIndex: parentKey ? `${parentKey}.${singleKey}` : singleKey,
      key: parentKey ? `${parentKey}.${singleKey}` : singleKey,
      width: 150,
      children: isNestedField
        ? getTableColumns(props[singleKey], singleKey)
        : [],
    } as ColumnType<object>;
    if (singleKey === "date_added") {
      return {
        ...tableColumns,
        width: 150,
        fixed: "left",
      } as ColumnType<object>;
    } else {
      return tableColumns;
    }
  });

  return columns;
};

type FlattenedExpense = {
  [key: string]: number | string;
};

const formatDatePicker = (date: string) => {
  return format(date, "dd/MMM/yyyy");
};

export const flattenObject = (
  obj: Record<string, any>,
  parentKey = ""
): FlattenedExpense => {
  let result: FlattenedExpense = {};

  for (const key in obj) {
    if (typeof obj[key] === "object" && obj[key] !== null) {
      const flattenedObject = flattenObject(
        obj[key],
        parentKey ? `${parentKey}.${key}` : key
      );
      result = { ...result, ...flattenedObject };
    } else {
      const newKey = parentKey ? `${parentKey}.${key}` : key;
      switch (key) {
        case "date_added":
          result[newKey] = formatDatePicker(obj[key]);
          break;
        default:
          result[newKey] = obj[key];
      }
    }
  }

  return result;
};
