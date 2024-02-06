import { Typography } from "antd";
import { InputWithLabel } from "@components/Form/Input";

export const GroupFields = ({ groupTitle }: { groupTitle: string }) => {
  const content = [1, 2, 3, 4, 5];
  return (
    <div>
      <Typography.Title level={3}>{groupTitle}</Typography.Title>
      <div className="ml-4">
        {content.length > 0 &&
          content.map((ele) => {
            return <InputWithLabel title={`Input ${ele}`} level={5} />;
          })}
      </div>
    </div>
  );
};
