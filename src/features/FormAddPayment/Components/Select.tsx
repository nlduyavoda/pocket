import { Form, InputProps, Select, SelectProps } from "antd";

type Option = {
  value: string | null;
  label: string;
};

type SelectType = {
  label: string;
  options: any;
};

const defaultOptions = [{ value: null, label: "..." }];

export const SelectField = ({
  label,
  options = defaultOptions,
  ...selectProps
}: Partial<SelectType>) => {
  return (
    <Form.Item label={label}>
      <Select {...selectProps} placeholder="item">
        {!!options &&
          options.length > 0 &&
          options.map((ele: any) => {
            const item = ele as Option;
            return (
              <Select.Option key={item.value} value={item.value}>
                {item.label}
              </Select.Option>
            );
          })}
      </Select>
    </Form.Item>
  );
};
