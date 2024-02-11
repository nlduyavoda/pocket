import { Typography } from "antd";
import { InputWithLabel } from "../Input";

export const GroupFields = ({
  title,
  groupItems,
}: {
  title: string;
  groupItems: { label: string; value: string }[] | null;
}) => {
  return (
    <div>
      <Typography.Title level={3}>{title}</Typography.Title>
      <div className="ml-4">
        {groupItems &&
          groupItems.map((item) => {
            const { label, value } = item;
            return (
              <InputWithLabel
                key={label}
                title={label}
                level={5}
                value={value}
              />
            );
          })}
      </div>
    </div>
  );
};
