import * as React from "react";
import {
  Expenses_keys,
  MonthlyExpenses,
  antDesignProviderTheme,
  defaultMonthlyExpenses,
} from "@utils/variables";
import { ConfigProvider, Form } from "antd";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { FormContent } from "./FormContent";
import PocketModal from "./PocketModal";

export const PocketForm = ({
  onAddPayment,
}: {
  onAddPayment: (payment: MonthlyExpenses) => void;
}) => {
  const methods = useForm<MonthlyExpenses>({
    defaultValues: defaultMonthlyExpenses,
  });

  const onSubmit = (payment: FieldValues) => {
    const paymentCloned = { ...payment } as MonthlyExpenses;
    onAddPayment(paymentCloned);
  };

  const formValues: MonthlyExpenses = methods.getValues();
  const formKeys = Object.keys(formValues) as Expenses_keys[];

  return (
    <ConfigProvider theme={antDesignProviderTheme}>
      <FormProvider {...methods}>
        <PocketModal onSubmit={methods.handleSubmit(onSubmit)}>
          <Form
            name="basic"
            layout="vertical"
            initialValues={{ remember: true }}
            onFinish={methods.handleSubmit(onSubmit)}
            autoComplete="off"
            style={{
              alignContent: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div className="max-h-96 overflow-scroll">
              {formKeys.map((subKey: Expenses_keys, idx) => (
                <FormContent key={subKey} categoryKeys={subKey} />
              ))}
            </div>
          </Form>
        </PocketModal>
      </FormProvider>
    </ConfigProvider>
  );
};
