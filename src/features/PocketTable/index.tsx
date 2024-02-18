import { MonthlyExpenses } from "@utils/variables";
import { Table, Tag } from "antd";
import { ColumnType, ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { DrawerTable } from "./DrawerTable";
import { PocketColumn, flattenObject, getTableColumns } from "./utils";
import { addCollection, getCollection } from "@services/FireBaseMethods";
import { TRANSACTIONS } from "@services/utils";
import { onFilterPayment } from "@utils/PaymentController/Transactions";
import PaymentAdd from "@features/FormAddPayment";

export const PocketTable = () => {
  const [payment, setPayment] = useState<MonthlyExpenses[]>([]);
  const [selectedPayment, setSelectedPayment] =
    useState<MonthlyExpenses | null>(null);
  const [open, setOpen] = useState(false);
  const tableData = payment.map((ele: MonthlyExpenses) => flattenObject(ele));
  const tableColumns: ColumnsType<any> =
    payment.length > 0 ? getTableColumns(payment[0]) : [];

  const handleSelect = (paymentId: string) => {
    setOpen(true);
    const result: MonthlyExpenses | null =
      payment.find((payment) => payment.id === paymentId) || null;
    setSelectedPayment(result);
  };

  const columnsFilter = tableColumns
    .map((col: ColumnType<PocketColumn>) => {
      if (col?.key === "id") return false;
      else {
        return {
          ...col,
          render: (record: string) => <Tag>{record}</Tag>,
        };
      }
    })
    .filter(Boolean) as ColumnsType<any>;

  const onAddPaymentToFireBase = async (paymentProps: MonthlyExpenses) => {
    const dataCloned = [...payment];
    dataCloned.unshift(paymentProps);
    const { status } = await addCollection({
      documentName: TRANSACTIONS,
      data: paymentProps,
    });
    if (status === "ok") {
      setPayment(dataCloned);
    } else {
      console.log("fail");
    }
  };

  useEffect(() => {
    async function getAsyncCollection() {
      const response = (await getCollection({
        documentName: TRANSACTIONS,
      })) as { status: "fail" | "ok"; data: MonthlyExpenses[] };
      const { status, data } = response;
      if (status === "ok" && data) {
        const filterData: MonthlyExpenses[] = data.map((payment) => {
          return onFilterPayment(payment);
        });
        setPayment(filterData);
      } else {
        console.log("getCollection fail");
      }
    }
    getAsyncCollection();
  }, []);
  return (
    <>
      {payment.length > 0 ? (
        <>
          <Table
            dataSource={tableData}
            columns={columnsFilter}
            bordered
            scroll={{ x: 600, y: 300 }}
            onRow={(record, rowIndex) => {
              return {
                onClick: (event) => {
                  handleSelect(record?.id);
                },
              };
            }}
          />
          <DrawerTable
            selectedPayment={selectedPayment}
            open={open}
            onClose={() => setOpen(false)}
          />
        </>
      ) : (
        "loading"
      )}
      <PaymentAdd onAddPayment={onAddPaymentToFireBase} />
    </>
  );
};
