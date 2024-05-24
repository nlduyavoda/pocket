import { getPaymentSource } from "@api/getPaymentSource";
import Loading from "@components/Spin";
import useFirebaseSource from "@hooks/useFirebaseSource";

export const withFireBaseSource = <T,>(
  Component: (props: T) => JSX.Element,
  documents: string[]
) => {
  return (props: any) => {
    const { data, isLoading, isError } = useFirebaseSource(() =>
      getPaymentSource(documents)
    ) as { data: unknown; isLoading: boolean; isError: boolean };

    if (isLoading) return <Loading />;
    if (isError) return <div>error</div>;

    return (
      <div className="flex-wrap overflow-auto">
        <Component {...props} />
      </div>
    );
  };
};
