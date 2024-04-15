import { Button, Table } from "antd";

export const Payment = (props: any) => {
  return (
    <div className="flex-wrap w-full">
      <div className="flex w-full justify-between">
        <div className="flex-wrap">
          <p className="text-lg">Agents Stats</p>
          <p className="text-sm">More than 400+ new members</p>
        </div>
        <div className="flex w-[200px] align-middle justify-between">
          <Button>New report</Button>
          <Button>Create</Button>
        </div>
      </div>
      <div>
        <TablePayment />
      </div>
    </div>
  );
};

const TablePayment = () => {
  const dataSource = [
    {
      key: "1",
      product: "Mike",
      earnings: 32,
      company: "10 Downing Street",
    },
    {
      key: "2",
      product: "John",
      earnings: 42,
      company: "10 Downing Street",
    },
  ];

  const columns = [
    {
      title: "Product",
      dataIndex: "product",
      key: "product",
    },
    {
      title: "EARNINGS",
      dataIndex: "earnings",
      key: "earnings",
    },
    {
      title: "COMPANY",
      dataIndex: "company",
      key: "company",
    },
  ];

  return <Table dataSource={dataSource} columns={columns} />;
};
