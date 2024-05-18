import { OverviewWithDataSource } from "@features/PocketTable/OverviewTable";
import { RequiredProps, withFormModal } from "@hocs/withFormModal";
import { Bill, FirebaseSource } from "@types/FirebaseSource";
import { ModalProps } from "antd";

export type TableModalProps = { bills: Bill[] | null } & Partial<FirebaseSource> & {
    selectedDate: string;
  } & RequiredProps &
  ModalProps;
  
export default withFormModal<TableModalProps>(OverviewWithDataSource);
