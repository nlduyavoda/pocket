"use client";
import {
    ExpenseCategories,
    ExpenseProperties,
    Expenses_keys,
    MonthlyExpenses,
    defaultMonthlyExpenses
} from "@utils/variables";
import {
    ConfigProvider,
    Form,
    Input,
    Typography
} from "antd";
import { Fragment } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";

export const PocketForm = () => {
  const methods = useForm<MonthlyExpenses>({
    defaultValues: defaultMonthlyExpenses,
  });

  const onSubmit = (params: MonthlyExpenses) => {};

  const formValues: MonthlyExpenses = methods.getValues();
  const formKeys = Object.keys(formValues) as Expenses_keys[];
  console.log(methods.watch());
  return (
    <ConfigProvider
      theme={{
        components: {
          Typography: {
            colorPrimary: "#fff",
          },
          Button: {
            colorPrimary: "#00b96b",
            algorithm: true, // Enable algorithm
          },
          Input: {
            colorPrimary: "#eb2f96",
            algorithm: true, // Enable algorithm
          },
        },
      }}
    >
      <FormProvider {...methods}>
        <Form
          name="basic"
          className="p-10"
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={methods.handleSubmit(onSubmit)}
          autoComplete="off"
          style={{
            maxWidth: 600,
            alignContent: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {formKeys.map((subKey: Expenses_keys, idx) => {
            const subValues = formValues[
              subKey
            ] as MonthlyExpenses[Expenses_keys];
            const subKeys = Object.keys(
              subValues
            ) as (keyof MonthlyExpenses[Expenses_keys])[];
            return (
              <Form.Item key={idx}>
                <Typography.Title className="text-white capitalize" level={3}>
                  {ExpenseCategories[subKey]}
                </Typography.Title>
                {subKeys.map(
                  (nestedKey: keyof MonthlyExpenses[Expenses_keys], idx) => {
                    const fieldName = `${subKey}.${nestedKey}` as never;
                    return (
                      <Controller
                        key={nestedKey}
                        control={methods.control}
                        name={fieldName}
                        render={({ field }) => {
                          return (
                            <Fragment>
                              <Typography.Title
                                className="text-white capitalize"
                                level={5}
                              >
                                {ExpenseProperties[field.name]}
                              </Typography.Title>
                              <Input
                                placeholder={ExpenseProperties[field.name]}
                                value={field.value}
                                onChange={field.onChange}
                              />
                            </Fragment>
                          );
                        }}
                      />
                    );
                  }
                )}
              </Form.Item>
            );
          })}
        </Form>
      </FormProvider>
    </ConfigProvider>
  );
};
