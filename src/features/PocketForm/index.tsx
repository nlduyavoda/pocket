"use client";
import { PocketTable } from "@features/PocketTable";
import {
  ExpenseCategories,
  ExpenseProperties,
  Expenses_keys,
  MonthlyExpenses,
  antDesignProviderTheme,
  defaultMonthlyExpenses,
} from "@utils/variables";
import { ConfigProvider, Form, Input, Typography } from "antd";
import { Fragment } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import PocketModal from "./PocketModal";
import { FormContent } from "./FormContent";

export const PocketForm = () => {
  const methods = useForm<MonthlyExpenses>({
    defaultValues: defaultMonthlyExpenses,
  });

  const onSubmit = (params: MonthlyExpenses) => {};

  const formValues: MonthlyExpenses = methods.getValues();
  const formKeys = Object.keys(formValues) as Expenses_keys[];

  return (
    <ConfigProvider theme={antDesignProviderTheme}>
      <FormProvider {...methods}>
        <PocketModal>
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
