import { InputWithLabel } from "@components/Form/Input";
import { Form } from "antd";
import { Controller, useFormContext } from "react-hook-form";

export const FormAdd = () => {
  const { control } = useFormContext();
  return (
    <Form
      name="formAdd"
      layout="vertical"
      initialValues={{ remember: true }}
      autoComplete="off"
    >
      <Controller
        name="title"
        control={control}
        render={({ field }) => {
          return <InputWithLabel {...field} label="Event name" level={5} />;
        }}
      />
      <Controller
        name="startDate"
        control={control}
        render={({ field }) => {
          return <InputWithLabel {...field} label="start date" level={5} />;
        }}
      />
      <Controller
        name="endDate"
        control={control}
        render={({ field }) => {
          return <InputWithLabel {...field} label="end date" level={5} />;
        }}
      />
    </Form>
  );
};
