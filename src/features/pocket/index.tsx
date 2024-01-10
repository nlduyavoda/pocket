"use client";
import { defaultMonthlyExpenses, MonthlyExpenses } from "@utils/variables";
import { Fragment } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import {
  Button,
  Checkbox,
  ConfigProvider,
  Form,
  Input,
  Typography,
} from "antd";

export const PocketForm = () => {
  const methods = useForm<MonthlyExpenses>({
    defaultValues: defaultMonthlyExpenses,
  });

  const onSubmit = (params: MonthlyExpenses) => {};

  console.log(methods.getValues());
  const formValues: MonthlyExpenses = methods.getValues();
  const formKeys = Object.keys(formValues) as (keyof MonthlyExpenses)[];
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
          {formKeys.map((ele: keyof MonthlyExpenses, idx) => {
            return (
              <Form.Item key={idx}>
                <Typography.Title className="text-white" level={3}>
                  {ele}
                </Typography.Title>
                <Controller
                  control={methods.control}
                  name={ele}
                  render={({ field }) => {
                    const fieldValues = field.value as Partial<MonthlyExpenses>;
                    const fieldKeys = Object.keys(
                      fieldValues
                    ) as (keyof MonthlyExpenses)[];
                    return (
                      <>
                        {fieldKeys.map((subKey: keyof MonthlyExpenses, idx) => {
                          const subValues = fieldValues[subKey];
                          console.log(
                            "subValues?.toString()",
                            subValues?.toString()
                          );
                          return (
                            <Fragment key={subKey}>
                              <Typography.Title
                                className="text-white"
                                level={5}
                              >
                                {subKey}
                              </Typography.Title>
                              <Input
                                placeholder={subKey}
                                value={subValues?.toString()}
                              />
                            </Fragment>
                          );
                        })}
                      </>
                    );
                  }}
                />
              </Form.Item>
            );
          })}
        </Form>
      </FormProvider>
    </ConfigProvider>
  );
};
