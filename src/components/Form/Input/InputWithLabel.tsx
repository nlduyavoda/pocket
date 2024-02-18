import { Form, FormItemProps, Input, InputProps, Typography } from "antd";

export type InputWithLabelPropsType = {
  label: string;
  errorMessage?: string;
  level: 1 | 5 | 2 | 3 | 4 | undefined;
} & InputProps &
  FormItemProps;

export const InputWithLabel = ({
  level,
  label,
  errorMessage,
  ...inputProps
}: InputWithLabelPropsType) => {
  const formItemProps: FormItemProps = {
    validateStatus: errorMessage ? "error" : "",
    help: errorMessage && "Should be combination of numbers & alphabets",
  };
  return (
    <Form.Item {...formItemProps}>
      <Typography.Title className="capitalize" level={level || 5}>
        {label || "This is label"}
      </Typography.Title>
      <Input defaultValue="Hello, antd!" {...inputProps} />
    </Form.Item>
  );
};
