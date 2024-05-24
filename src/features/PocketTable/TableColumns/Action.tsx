import { btnSuccessStyles } from "@components/Button";
import { Popconfirm } from "antd";

export const Action = ({
  id,
  onConfirm,
  Icon,
}: {
  id: string;
  onConfirm: (id: string) => void;
  Icon: JSX.Element;
}) => {
  return (
    <Popconfirm
      title={id}
      onConfirm={() => onConfirm(id)}
      onOpenChange={() => console.log("open change")}
      okText="OK"
      cancelText="Cancel"
      cancelButtonProps={{ danger: true }}
      okButtonProps={{ style: btnSuccessStyles }}
    >
      {Icon}
    </Popconfirm>
  );
};
