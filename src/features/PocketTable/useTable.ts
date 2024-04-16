import { MonthlyExpenses } from "@utils/variables";
import { flattenObject, getTableColumns } from "./utils";

export const useTable = ({
  data,
  initialColumns,
}: {
  data: MonthlyExpenses[];
  initialColumns: string[];
}) => {
  const tableData = data.map((ele: MonthlyExpenses) => flattenObject(ele));
  const tableColumns: ColumnsType<any> =
    data.length > 0 ? getTableColumns(data[0]) : [];

  const filterColumdns = tableColumns
    .map((ele: ColumnsType) =>
      initialColumns.includes(ele.title) ? ele : null
    )
    .filter(Boolean) as ColumnsType[];
  return { tableData, tableColumns: filterColumdns };
};

type ColumnsType = {
  dataIndex: string;
  fixed: string;
  key: string;
  title: string;
  width: number;
};
