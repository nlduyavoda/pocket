import Loading from "@components/Spin";
import { TableOverview } from "@components/Table";
import { PocketColumn } from "@features/PocketTable/utils";
import { Tag } from "antd";
import { ColumnType, ColumnsType } from "antd/es/table";
import { usePayment } from "./usePayment";
import { useTable } from "./useTable";
import { useNavigate } from "react-router";
export const OverviewTable = () => {
  const { payment } = usePayment();
  const navigate = useNavigate();
  const { tableData, tableColumns } = useTable({
    data: payment,
    initialColumns: ["ngày", "tổng chi phí"],
  });

  const columns = tableColumns
    .map((col: ColumnType<PocketColumn>) => ({
      ...col,
      render: (record: string, item: any) => (
        <Tag
          onClick={() => {
            navigate(`/transactions/${item.id}`);
            // onSet(item.id);
          }}
        >
          {record}
        </Tag>
      ),
    }))
    .filter(Boolean) as ColumnsType<any>;

  return (
    <div className="flex w-full justify-center items-center">
      {payment.length > 0 ? (
        <TableOverview dataSource={tableData} columns={columns} bordered />
      ) : (
        <Loading />
      )}
    </div>
  );
};
