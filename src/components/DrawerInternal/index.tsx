import { Button, Drawer, Space } from "antd";
import { ReactNode } from "react";

export const DrawerInternal = ({
  onClose,
  open,
  onSubmit,
  title = "",
  children,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title: string;
  children: ReactNode;
}) => {
  return (
    <Drawer
      title={title}
      width={720}
      onClose={onClose}
      open={open}
      styles={{
        body: {
          paddingBottom: 80,
        },
      }}
      extra={
        <Space>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={onSubmit}>Submit</Button>
        </Space>
      }
    >
      {children}
    </Drawer>
  );
};
