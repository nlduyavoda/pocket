import { Form, Input, Typography } from "antd";

export const SubContent = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: () => void;
}) => {
  return (
    <Form.Item>
      <Typography.Title className="text-white capitalize" level={5}>
        {label}
      </Typography.Title>
      <Input placeholder={label} value={value} onChange={onChange} />
    </Form.Item>
  );
};
