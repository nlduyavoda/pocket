import { DrawerInternal } from "@components/DrawerInternal";
import { Expenses_keys, MonthlyExpenses } from "@utils/variables";
import { Form } from "antd";
import { DrawerTableContent } from "./DrawerTableContent";

export const DrawerTable = ({
  selectedPayment,
  open,
  onClose,
}: {
  selectedPayment: MonthlyExpenses | null;
  open: boolean;
  onClose: () => void;
}) => {
  const paymentKeys =
    ((selectedPayment
      ? Object.keys(selectedPayment)
      : []) as Expenses_keys[]) || [];
  return (
    <DrawerInternal
      title={`ID: ${selectedPayment?.id}`}
      open={open}
      onClose={onClose}
    >
      {selectedPayment && paymentKeys.length > 0 ? (
        <Form>
          <DrawerTableContent payment={selectedPayment} />
        </Form>
      ) : (
        "loading"
      )}
    </DrawerInternal>
  );
};
