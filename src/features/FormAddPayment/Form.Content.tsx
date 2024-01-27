import {
  ExpenseCategories,
  Expenses_keys,
  MonthlyExpenses,
} from "@utils/variables";
import { Form, Input } from "antd";
import { Controller, useFormContext } from "react-hook-form";
import { FormSubContent } from "./Form.SubContent";

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
    categoryKeys !== "id" && (
      <Form.Item label={ExpenseCategories[categoryKeys]}>
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
                <Form.Item>
                  <Input
                    placeholder={ExpenseCategories[categoryKeys]}
                    value={field.value}
                    onChange={field.onChange}
                  />
                </Form.Item>
              );
            }}
          />
        )}
      </Form.Item>
    )
  );
};
