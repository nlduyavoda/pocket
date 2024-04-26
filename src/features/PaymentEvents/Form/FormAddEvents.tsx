import { PlusOutlined } from "@ant-design/icons";
import { DrawerInternal } from "@components/DrawerInternal";
import {
  antDesignProviderTheme,
  defaultEventProperties,
  formatDate,
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
import { EventType } from "../EventTypes";
import { format } from "date-fns";
import { FetchResType } from "@services/Types";

const handleDate = (date: any) => {
  // Combine seconds and nanoseconds into a single timestamp
  const timestamp = date.seconds + date.nanoseconds / 1e9;

  // Convert to a Date object
  return new Date(timestamp * 1000); // JavaScript uses milliseconds, so multiply by 1000
};

export const FormAddEvent = ({
  onSetEvent,
}: {
  onSetEvent: (newEvent: Omit<EventType, "id">) => void;
}) => {
  const methods = useForm<any>({
    defaultValues: defaultEventProperties,
  });
  const [open, setOpen] = useState<boolean>(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const handleClose = () => {
    console.log("closing");
    setOpen(false);
  };

  const onSubmit = async (props: SubmitHandler<any>) => {
    const { status, data } = (await addDocument_({
      data: props,
      documentName: EVENTS,
    })) as { data: string } & Omit<FetchResType, "data">;

    if (status === "ok") {
      const responseData = JSON.parse(data) as EventType;
      const { startDate, endDate, title } = responseData;
      const event = {
        title,
        startDate: startDate,
        endDate: endDate,
      };
      onSetEvent(event);
      handleClose();
    } else {
      console.log("onSubmit fail");
    }
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
