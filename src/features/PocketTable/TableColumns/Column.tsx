import { Button, Popconfirm } from "antd";

export const InitialColumn = ({ text }: { text: string }) => {
  return <p className="text-[14px]">{text}</p>;
};

export const ActionColumn = ({ id, onConfirm }) => {
  return (
    <div>
      <Popconfirm
        title="Title"
        description={`Open Popconfirm with Promise ID: ${id}`}
        onConfirm={() => onConfirm(id)}
        onOpenChange={() => console.log("open change")}
      >
        <Button>delete</Button>
      </Popconfirm>
    </div>
  );
};
