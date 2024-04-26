import { OverviewTable } from "@features/PocketTable/OverviewTable";
import { TransactionDetail } from "@features/TransactionDetail";
import { OverviewLayout } from "@layouts/MetronicLayout/PaymentLayout";
import { END_POINTS } from "@routers/Endpoint";
import { Button } from "antd";
import { useLoaderData, useNavigate } from "react-router-dom";
import { FormFields } from "./FormField";

export const Payment = () => {
  const { overviewContext = "overview", transactionId = "" } =
    useLoaderData() as {
      overviewContext: string;
      transactionId: string;
    };
  const navigate = useNavigate();
  const handleNavigate = (route: string) => navigate(route);

  // if (transactionId) {
  //   return (
  //     <OverviewLayout
  //       renderControl={() => DetailControl({ onNavigate: handleNavigate })}
  //     >
  //       {() => PaymentDetail({ transactionId })}
  //     </OverviewLayout>
  //   );
  // }
  return paymentChildren.map((payment) => {
    return (
      payment.key === overviewContext && (
        <OverviewLayout
          key={payment.key}
          renderControl={() =>
            payment.renderControl({ onNavigate: handleNavigate })
          }
        >
          {payment.children}
        </OverviewLayout>
      )
    );
  });
};

const PaymentOverview = () => {
  return <OverviewTable />;
};

const PaymentDetail = ({ transactionId }: { transactionId: string }) => {
  return <TransactionDetail id={transactionId} />;
};

const PaymentForm = () => {
  return <FormFields />;
};

const OverViewControl_ = ({
  onNavigate,
}: {
  onNavigate: (url: string) => void;
}) => {
  return (
    <Control>
      <Button onClick={() => onNavigate(END_POINTS.TRANSACTIONS_NEW)}>
        Create
      </Button>
    </Control>
  );
};

const DetailControl = ({
  onNavigate,
}: {
  onNavigate: (url: string) => void;
}) => {
  return (
    <Control>
      <Button onClick={() => onNavigate(END_POINTS.HOME)}>Back</Button>
      <Button onClick={() => onNavigate(END_POINTS.TRANSACTIONS_NEW)}>
        Create
      </Button>
    </Control>
  );
};

const FormControl = ({ onNavigate }: { onNavigate: (url: string) => void }) => {
  return (
    <Control>
      <Button onClick={() => onNavigate(END_POINTS.HOME)}>Back</Button>
    </Control>
  );
};

const paymentChildren = [
  {
    key: "overview",
    children: PaymentOverview,
    renderControl: OverViewControl_,
  },
  {
    key: "detail",
    children: PaymentDetail,
    renderControl: DetailControl,
  },
  {
    key: "form",
    children: FormFields,
    renderControl: FormControl,
  },
];

const Control = ({ children }) => {
  return (
    <div className="flex w-full justify-between">
      <div className="flex-wrap">
        <p className="text-lg">Agents Stats</p>
        <p className="text-sm">More than 400+ new members</p>
      </div>
      <div className="flex w-[200px] align-middle justify-between">
        {children}
      </div>
    </div>
  );
};
