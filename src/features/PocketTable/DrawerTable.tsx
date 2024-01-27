import { DrawerInternal } from "@components/DrawerInternal";
import { Expenses_keys, MonthlyExpenses } from "@utils/variables";
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
    <DrawerInternal title="Detail" open={open} onClose={onClose}>
      {selectedPayment && paymentKeys.length > 0 ? (
        <DrawerTableContent payment={selectedPayment} />
      ) : (
        "loading"
      )}
    </DrawerInternal>
  );
};
