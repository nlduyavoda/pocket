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
        <div>
          <Form
            name="basic"
            layout="vertical"
            initialValues={{ remember: true }}
            onFinish={methods.handleSubmit(onSubmit)}
            autoComplete="off"
            style={{
              maxWidth: 300,
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
                  {typeof subValues === "object" ? (
                    subKeys.map(
                      (
                        nestedKey: keyof MonthlyExpenses[Expenses_keys],
                        idx
                      ) => {
                        const fieldName = `${subKey}.${nestedKey}` as never;
                        const nestedLabel = ExpenseProperties[nestedKey];
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
                                    {nestedLabel}
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
                    )
                  ) : (
                    <Controller
                      control={methods.control}
                      name={subKey}
                      render={({ field }) => {
                        return (
                          <Fragment>
                            <Input
                              placeholder={ExpenseCategories[subKey]}
                              value={field.value}
                              onChange={field.onChange}
                            />
                          </Fragment>
                        );
                      }}
                    />
                  )}
                </Form.Item>
              );
            })}
          </Form>
        </div>
        <div className="max-w-screen-lg">{/* <PocketTable /> */}</div>
      </FormProvider>
    </ConfigProvider>
  );
};
