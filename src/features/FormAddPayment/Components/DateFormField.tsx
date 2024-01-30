import { DateField } from "@components/Date";
import { Divider, Typography } from "antd";

export const DateFormField = ({
  title,
  date,
}: {
  title: string;
  date: string;
}) => {
  return (
    <div className="inline-flex flex-col w-full">
      <div className="inline-flex items-center align-middle justify-between">
        <div className="flex self-center">
          <Typography.Title className="capitalize" level={3}>
            {title}
          </Typography.Title>
        </div>
        <div className="flex self-center">
          <DateField date={date} />
        </div>
      </div>
      <div className="inline-flex">
        <Divider />
      </div>
    </div>
  );
};
