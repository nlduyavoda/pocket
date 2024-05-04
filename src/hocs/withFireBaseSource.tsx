import { getPaymentSource } from "@api/getPaymentSource";
import Loading from "@components/Spin";
import useFirebaseSource from "@hooks/useFirebaseSource";
import { FirebaseSource } from "@types/FirebaseSource";

export const withFireBaseSource = (
  Component: (props: FirebaseSource) => JSX.Element
) => {
  return (props: any) => {
    const { data, isLoading, isError } = useFirebaseSource(() =>
      getPaymentSource(["bills", "categories", "events"])
    ) as { data: unknown; isLoading: boolean; isError: boolean };
    if (isLoading) return <Loading />;
    if (isError) return <div>error</div>;
    const { bills = [], categories = [], events = [] } = data as FirebaseSource;
    return bills.length && categories.length ? (
      <div className="flex-wrap overflow-auto">
        <Component
          {...props}
          bills={bills}
          categories={categories}
          events={events}
        />
      </div>
    ) : (
      <>empty data</>
    );
  };
};
