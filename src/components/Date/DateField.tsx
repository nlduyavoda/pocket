import { Typography } from "antd";
import { format } from "date-fns";

export const DateField = ({ date }: { date: string }) => {
  return (
    <Typography.Title className="capitalize" level={3}>
      {format(date, "dd / MMM / yyy")}
    </Typography.Title>
  );
};
