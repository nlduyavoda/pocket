import { DeleteTwoTone } from "@ant-design/icons";
import { Button, Popconfirm } from "antd";

export const BaseColumn = ({ text }: { text: string }) => {
  return <p className="text-[24px]">{text}</p>;
};

export const ActionsColumn = ({
  id,
  onConfirm,
}: {
  id: string;
  onConfirm: (id: string) => void;
}) => {
  return (
    <div>
      <Popconfirm
        title="Title"
        description={`Open Popconfirm with Promise ID: ${id}`}
        onConfirm={() => onConfirm(id)}
        onOpenChange={() => console.log("open change")}
      >
        <DeleteTwoTone
          style={{
            fontSize: "24px",
          }}
          twoToneColor="#eb2f96"
        />
      </Popconfirm>
    </div>
  );
};
