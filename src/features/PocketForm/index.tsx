import { Expenses_keys } from "@utils/variables";
import { Form } from "antd";
import { FieldValues, useFormContext } from "react-hook-form";
import { FormContent } from "./FormContent";

export const PocketForm = () => {
  const methods = useFormContext();
  const formValues: FieldValues = methods.getValues();
  const formKeys = Object.keys(formValues) as Expenses_keys[];

  return (
    <Form
      name="basic"
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
