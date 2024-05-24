import { withFireBaseSource } from "@hocs/withFireBaseSource";
import { withModal } from "@hocs/withModal";
import { TableModalProps } from "Types/IPayment";
import { UpdateForm } from "./TableColumns/UpdateForm";
import Loading from "@components/Spin";

export default withModal<TableModalProps>(({ dataSource }: TableModalProps) => {
  if (!dataSource) {
    return <Loading />;
  }
  return (
    <UpdateForm
      defaultValues={{
        payments: dataSource,
      }}
    />
  );
});
