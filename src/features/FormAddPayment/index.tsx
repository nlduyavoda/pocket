import { PlusOutlined } from "@ant-design/icons";
import { DrawerInternal } from "@components/DrawerInternal";
import {
  MonthlyExpenses,
  antDesignProviderTheme,
  defaultMonthlyExpenses,
} from "@utils/variables";
import { Button, ConfigProvider, DrawerProps } from "antd";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FormAdd } from "./Form.Container";
import { DrawerType } from "@components/DrawerInternal/Types";
import { DrawerHeader, FormFooter } from "./Components/Drawer";
import { drawerStyles } from "./Variables";

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

  const handleClose = () => {
    setOpen(false);
  };

  const onsubmit = (payment: MonthlyExpenses) => {
    // onAddPayment(payment);
    // onClose();
    console.log("payment", payment);
  };

  const drawerProps: DrawerType & DrawerProps = {
    title: <DrawerHeader label="date" date={methods.getValues("date_added")} />,
    open,
    onClose: handleClose,
    closable: false,
    footer: (
      <FormFooter
        onClose={handleClose}
        onSubmit={methods.handleSubmit(onsubmit)}
      />
    ),
    styles: drawerStyles,
  };

  return (
    <ConfigProvider theme={antDesignProviderTheme}>
      <FormProvider {...methods}>
        <Button onClick={showDrawer} icon={<PlusOutlined />}>
          Add Payment
        </Button>
        <DrawerInternal {...drawerProps}>
          <FormAdd />
        </DrawerInternal>
      </FormProvider>
    </ConfigProvider>
  );
};

export default PaymentAdd;
