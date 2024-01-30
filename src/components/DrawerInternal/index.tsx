import { Drawer, DrawerProps } from "antd";
import { DrawerType } from "./Types";

export const DrawerInternal = ({
  onClose,
  open,
  onSubmit,
  title = "",
  children,
  ...props
}: DrawerType & DrawerProps) => {
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
      {...props}
    >
      {children}
    </Drawer>
  );
};
