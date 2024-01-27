import { Expenses_keys, defaultMonthlyExpenses } from "@utils/variables";
import { Form } from "antd";
import { FieldValues, useForm } from "react-hook-form";
import { FormContent } from "./Form.Content";

export const FormAdd = () => {
  const methods = useForm({ defaultValues: defaultMonthlyExpenses });
  const formValues: FieldValues = methods.getValues();
  const formKeys = Object.keys(formValues) as Expenses_keys[];
  return (
    <Form
      name="formAdd"
      layout="vertical"
      initialValues={{ remember: true }}
      autoComplete="off"
    >
      {formKeys.map((subKey: Expenses_keys) => (
        <FormContent key={subKey} categoryKeys={subKey} />
      ))}
    </Form>
  );
};
