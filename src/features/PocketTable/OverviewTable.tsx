import { TableOverview } from "@components/Table";
import { withFireBaseSource } from "@hocs/withFireBaseSource";
import { RequiredProps } from "@hocs/withFormModal";
import { CustomType, FirebaseSource } from "@types/FirebaseSource";
import { ColumnsType } from "antd/es/table";
import { paymentColumns } from "./PaymentColumns";

type TableProps = RequiredProps & FirebaseSource & { selectedDate: string };

export const OverviewTable = (props: TableProps) => {
  const { categories, events, bills } = props;

  const columns: ColumnsType<CustomType> = paymentColumns({
    categories,
    events,
  });

  return (
    <TableOverview
      dataSource={bills.filter(
        ({ createAt }) => createAt === props.selectedDate
      )}
      columns={columns}
      bordered
    />
  );
};

export const OverviewWithDataSource = withFireBaseSource<TableProps>(
  OverviewTable,
  ["categories", "events"]
);
