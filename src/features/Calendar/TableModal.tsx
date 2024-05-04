import Loading from "@components/Spin";
import { OverviewTable } from "@features/PocketTable/OverviewTable";
import { RequiredProps, withFormModal } from "@hocs/withFormModal";
import useFirebaseSource from "@hooks/useFirebaseSource";
import { findDocumentsByDate } from "@services/FireBaseMethods";
import { FirebaseSource } from "@types/FirebaseSource";
import { format } from "date-fns";

const TableModal = (
  props: Partial<FirebaseSource> & { selectedDate: string }
) => {
  const { data, isLoading, isError } = useFirebaseSource(
    () =>
      findDocumentsByDate({
        collectionName: "bills",
        date: format(new Date(props.selectedDate), "dd/MM/yyy"),
      }),
    props.selectedDate
  );
  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <div>Something went wrong</div>;
  }
  return <OverviewTable {...props} bills={data} />;
};
export default withFormModal<
  Partial<FirebaseSource> & RequiredProps & { selectedDate: string }
>(TableModal);
