import { TableOverview } from "@components/Table";
import { ColumnsType } from "antd/es/table";
import { useState } from "react";
import { paymentColumns } from "./PaymentColumns";
import { Bill, CustomType, FirebaseSource } from "@types/FirebaseSource";
import { withFireBaseSource } from "@hocs/withFireBaseSource";
import { CreateFormModal } from "@features/Metronic/BillCreate";
import { Button } from "antd";
import { addCollection } from "@services/FireBaseMethods";
import { FieldValues } from "react-hook-form";
import { groupBy } from "lodash";

export const OverviewTable = (props: Partial<FirebaseSource>) => {
  const { bills, categories, events } = props;
  console.log("props: ", props);
  const [isAddingField, setIsAddingField] = useState(false);
  const columns: ColumnsType<CustomType> = paymentColumns({
    bills,
    categories,
    events,
  });
  const handleAddPayment = async (data: FieldValues) => {
    await addCollection({
      data,
      collectionName: "bills",
      documentName: "bills",
    });
  };

  return (
    <>
      <TableOverview
        dataSource={bills}
        columns={columns}
        bordered
        title={() => {
          return (
            <Button onClick={() => setIsAddingField(true)}>Add Field</Button>
          );
        }}
      />
      {/* <CreateFormModal
        title="Craete new payment"
        onClose={() => setIsAddingField(false)}
        open={isAddingField}
        categories={categories}
        events={events}
        onSubmit={handleAddPayment}
        modalProps={{
          okButtonProps: {
            type: "primary",
          },
        }}
      /> */}
    </>
  );
};

export const OverviewWithDataSource = withFireBaseSource(OverviewTable);
