import { OverviewTable } from "@features/PocketTable/OverviewTable";
import { TransactionDetail } from "@features/TransactionDetail";
import { Button } from "antd";
import { useNavigate, useParams } from "react-router-dom";

export const Payment = () => {
  const navigate = useNavigate();
  const { transactionId } = useParams();
  const handleNavigate = (route: string) => navigate(route);

  return (
    <div className="flex-wrap w-full overflow-auto">
      <div className="flex w-full justify-between">
        <div className="flex-wrap">
          <p className="text-lg">Agents Stats</p>
          <p className="text-sm">More than 400+ new members</p>
        </div>
        <div className="flex w-[200px] align-middle justify-between">
          {transactionId && (
            <Button onClick={() => handleNavigate("/")}>Back</Button>
          )}
          <Button>Create</Button>
        </div>
      </div>
      {transactionId ? (
        <TransactionDetail id={transactionId} />
      ) : (
        <OverviewTable />
      )}
    </div>
  );
};
