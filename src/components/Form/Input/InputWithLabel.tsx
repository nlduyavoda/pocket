import { Input, InputProps, Typography } from "antd";

export const InputWithLabel = ({
  level,
  title,
  ...inputProps
}: {
  title: string;
  level: 1 | 5 | 2 | 3 | 4 | undefined;
} & InputProps) => {
  return (
    <div>
      <Typography.Title className="capitalize" level={level || 5}>
        {title || "This is label"}
      </Typography.Title>
      <Input defaultValue="Hello, antd!" {...inputProps} />
    </div>
  );
};
