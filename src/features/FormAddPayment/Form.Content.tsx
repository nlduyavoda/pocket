import {
  ExpenseCategories,
  Expenses_keys,
  MonthlyExpenses,
} from "@utils/variables";
import { Form, Input, Typography } from "antd";
import { Controller, useFormContext } from "react-hook-form";
import { FormSubContent } from "./Form.SubContent";
import { InputWithLabel } from "@components/Form/Input";

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
  const hidenFields = ["total_expenses", "id", "date_added"];

  if (hidenFields.includes(categoryKeys)) return false;
  return (
    <Form.Item>
      <Typography.Title className="text-white capitalize" level={3}>
        {ExpenseCategories[categoryKeys]}
      </Typography.Title>
      {typeof subValues === "object" ? (
        subKeys.map((subKeys: keyof MonthlyExpenses[Expenses_keys], idx) => {
          return (
            <FormSubContent
              key={categoryKeys + idx}
              keys={categoryKeys}
              subKeys={subKeys}
            />
          );
        })
      ) : (
        <Controller
          control={methods.control}
          name={categoryKeys}
          render={({ field }) => {
            return (
              <InputWithLabel
                level={1}
                title={categoryKeys}
                value={field.value}
              />
            );
          }}
        />
      )}
    </Form.Item>
  );
};

