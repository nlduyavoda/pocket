import { PlusOutlined } from "@ant-design/icons";
import { DrawerInternal } from "@components/DrawerInternal";
import {
  MonthlyExpenses,
  antDesignProviderTheme,
  defaultMonthlyExpenses,
} from "@utils/variables";
import { Button, ConfigProvider } from "antd";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FormAdd } from "./Form.Container";

const PaymentAdd = ({
  onAddPayment,
}: {
  onAddPayment: (paymentProps: MonthlyExpenses) => void;
}) => {
  const methods = useForm<MonthlyExpenses>({
    defaultValues: defaultMonthlyExpenses,
  });
  const [open, setOpen] = useState<boolean>(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onsubmit = (payment: MonthlyExpenses) => {
    onAddPayment(payment);
    onClose();
  };

  return (
    <ConfigProvider theme={antDesignProviderTheme}>
      <FormProvider {...methods}>
        <Button onClick={showDrawer} icon={<PlusOutlined />}>
          New account
        </Button>
        <DrawerInternal
          title="Create new"
          open={open}
          onClose={onClose}
          onSubmit={methods.handleSubmit((formValues) => onsubmit(formValues))}
        >
          <FormAdd />
        </DrawerInternal>
      </FormProvider>
    </ConfigProvider>
  );
};

export default PaymentAdd;
