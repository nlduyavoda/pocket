"use client";
import {
  ExpenseCategories,
  Expenses_keys,
  MonthlyExpenses,
} from "@utils/variables";
import { Form, Input, Typography } from "antd";
import { Fragment } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FormSubContent } from "./FormSubContent";

export const FormContent = ({
  categoryKeys,
}: {
  categoryKeys: Expenses_keys;
}) => {
  const methods = useFormContext();
  const formValues = methods.getValues();
  const subValues = formValues[categoryKeys] as MonthlyExpenses[Expenses_keys];
  const subKeys = Object.keys(
    subValues
  ) as (keyof MonthlyExpenses[Expenses_keys])[];
  return (
    <Form.Item>
      <Typography.Title className="text-white capitalize" level={3}>
        {ExpenseCategories[categoryKeys]}
      </Typography.Title>
      {typeof subValues === "object" ? (
        subKeys.map((subKeys: keyof MonthlyExpenses[Expenses_keys], idx) => {
          return <FormSubContent keys={categoryKeys} subKeys={subKeys} />;
        })
      ) : (
        <Controller
          control={methods.control}
          name={categoryKeys}
          render={({ field }) => {
            return (
              <Fragment>
                <Input
                  placeholder={ExpenseCategories[categoryKeys]}
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
};
