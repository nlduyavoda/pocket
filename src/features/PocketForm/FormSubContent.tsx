"use client";
import {
  ExpenseProperties,
  Expenses_keys,
  MonthlyExpenses,
} from "@utils/variables";
import { Input, Typography } from "antd";
import { Fragment } from "react";
import { Controller, useFormContext } from "react-hook-form";

export const FormSubContent = ({
  keys,
  subKeys,
}: {
  keys: Expenses_keys;
  subKeys: keyof MonthlyExpenses[Expenses_keys];
}) => {
  const methods = useFormContext();
  const fieldName = `${keys}.${subKeys}` as never;
  const nestedLabel = ExpenseProperties[subKeys];
  return (
    <Controller
      control={methods.control}
      name={fieldName}
      render={({ field }) => {
        return (
          <Fragment>
            <Typography.Title className="text-white capitalize" level={5}>
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
};
