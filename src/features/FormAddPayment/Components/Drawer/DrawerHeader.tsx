import { format } from "date-fns";

export const DrawerHeader = ({
  label,
  date,
}: {
  label: string;
  date: string;
}) => {
  return <div className="inline-flex">{format(date, "dd / MMM / yyy")}</div>;
};
