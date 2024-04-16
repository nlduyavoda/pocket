import { TableOverview } from "@components/Table";
import { usePayment } from "./usePayment";
import { useTable } from "./useTable";
import Loading from "@components/Spin";

export const OverviewTable = () => {
  const { payment } = usePayment();
  const { tableData, tableColumns } = useTable({
    data: payment,
    initialColumns: ["ngày", "tổng chi phí"],
  });

  return (
    <div className="flex w-full justify-center items-center">
      {payment.length > 0 ? (
        <TableOverview
          dataSource={tableData}
          columns={tableColumns}
          bordered
          scroll={{ y: 320 }}
        />
      ) : (
        <Loading />
      )}
    </div>
  );
};
