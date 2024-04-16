import { OverviewTable } from "@features/PocketTable/OverviewTable";
import { Button } from "antd";

export const Payment = () => {
  return (
    <div className="flex-wrap w-full">
      <div className="flex w-full justify-between">
        <div className="flex-wrap">
          <p className="text-lg">Agents Stats</p>
          <p className="text-sm">More than 400+ new members</p>
        </div>
        <div className="flex w-[200px] align-middle justify-between">
          <Button>New report</Button>
          <Button>Create</Button>
        </div>
      </div>
      <OverviewTable />
    </div>
  );
};
