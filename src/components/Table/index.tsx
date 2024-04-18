import { Table } from "antd";

export const TableOverview = ({ dataSource, columns, ...props }) => {
  return <Table dataSource={dataSource} columns={columns} {...props} />;
};
