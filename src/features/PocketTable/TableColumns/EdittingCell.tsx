import { Payment } from "Types/IPayment";
import { Input, InputNumber } from "antd";
import { Controller, useFormContext } from "react-hook-form";

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: "number" | "text";
  record: Payment;
  index: number;
}

const FieldName = ({ field }) => {
  return <Input {...field} onChange={field.onChange} />;
};

const FieldPrice = ({ field }) => {
  return <InputNumber {...field} />;
};

const FieldEvent = ({ field }) => {
  return <Input {...field} value={field.value?.title} />;
};

const FieldCategory = ({ field }) => {
  return <Input {...field} value={field.value?.key} />;
};

const formFields: { [k in string]: (props: any) => JSX.Element } = {
  key: FieldName,
  value: FieldPrice,
  event: FieldEvent,
  category: FieldCategory,
};

export const EditableCell: React.FC<React.PropsWithChildren<EditableCellProps>> = (
  props
) => {
  const {
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  } = props;
  const { control } = useFormContext();

  return (
    <td {...restProps}>
      {editing ? (
        <Controller
          control={control}
          name={`payments[${index}].${dataIndex}`}
          render={({ field }) => formFields[dataIndex]({ field })}
        />
      ) : (
        children
      )}
    </td>
  );
};
