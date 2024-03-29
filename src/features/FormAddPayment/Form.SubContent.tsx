import {
  ExpenseProperties,
  Expenses_keys,
  MonthlyExpenses,
} from "@utils/variables";
import { Controller, useFormContext } from "react-hook-form";
import { InputWithLabel } from "@components/Form/Input";

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
          <InputWithLabel
            level={4}
            title={nestedLabel}
            value={field.value}
            onChange={field.onChange}
          />
        );
      }}
    />
  );
};
