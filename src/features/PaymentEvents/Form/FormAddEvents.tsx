import { PlusOutlined } from "@ant-design/icons";
import { DrawerInternal } from "@components/DrawerInternal";
import {
  antDesignProviderTheme,
  defaultEventProperties,
} from "@utils/variables";
import { Button, ConfigProvider, DrawerProps } from "antd";
import { useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { DrawerType } from "@components/DrawerInternal/Types";
import { drawerStyles } from "@features/FormAddPayment/Variables";
import { FormFooter as Footer } from "@components/Form/Footer";
import { FormAdd } from "./FormAdd";
import { addDocument_ } from "@services/FireBaseMethods";
import { EVENTS } from "@services/utils";

export const FormAddEvent = () => {
  const methods = useForm<any>({
    defaultValues: defaultEventProperties,
  });
  const [open, setOpen] = useState<boolean>(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = (props: SubmitHandler<any>) => {
    addDocument_({
      data: props,
      documentName: EVENTS,
    });
    // onClose();
  };

  const drawerProps: DrawerType & DrawerProps = {
    title: <>Add Event</>,
    open,
    onClose: handleClose,
    closable: false,
    footer: (
      <Footer
        onClose={handleClose}
        onSubmit={methods.handleSubmit(onSubmit)}
      ></Footer>
    ),
    styles: drawerStyles,
  };

  return (
    <ConfigProvider theme={antDesignProviderTheme}>
      <FormProvider {...methods}>
        <Button onClick={showDrawer} icon={<PlusOutlined />}>
          Add Event
        </Button>
        <DrawerInternal {...drawerProps}>
          <FormAdd />
        </DrawerInternal>
      </FormProvider>
    </ConfigProvider>
  );
};
