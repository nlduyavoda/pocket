import { Form, Typography } from "antd";
import { ReactNode } from "react";

export const Content = ({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) => {
  return (
    <Form.Item>
      <Typography.Title className="text-white capitalize" level={3}>
        {label}
      </Typography.Title>
      {children}
    </Form.Item>
  );
};
