import { PocketColumn } from "@features/PocketTable/utils";
import { Table, Tag } from "antd";
import { ColumnType, ColumnsType } from "antd/es/table";

export const TableOverview = ({ dataSource, columns, ...props }) => {
  const renderColumns = columns
    .map(
      (col: ColumnType<PocketColumn>) =>
        col?.key !== "id" && {
          ...col,
          render: (record: string) => <Tag>{record}</Tag>,
        }
    )
    .filter(Boolean) as ColumnsType<any>;

  return <Table dataSource={dataSource} columns={renderColumns} {...props} />;
};
