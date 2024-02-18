import { InputWithLabel } from "@components/Form/Input";
import { DatePicker, Form } from "antd";
import { Controller, useFormContext } from "react-hook-form";

const { RangePicker } = DatePicker;
export const FormAdd = () => {
  const { control, setValue } = useFormContext();
  const handleChangeEventDate = (dates: [Date, Date]) => {
    const [start, end] = dates;
    setValue("startDate", start);
    setValue("endDate", end);
  };

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
      <RangePicker
        picker="date"
        id={{
          start: "startInput",
          end: "endInput",
        }}
        onChange={handleChangeEventDate}
      />
    </Form>
  );
};
