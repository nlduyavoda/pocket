import { RequiredProps } from "@hocs/withFormModal";
import { Category, EventPayment, FirebaseSource } from "./FirebaseSource";
import { ModalProps } from "antd";

export type SchemaKey = "name" | "category" | "event" | "price" | "action";
export type SchemaValue = keyof Payment | "action";
export type TableProps = RequiredProps &
  FirebaseSource & { selectedDate: string };
export type ColumnRenderType = {
  [k in SchemaKey]: (text: any, record: Payment) => JSX.Element;
};

export type Payment = {
  categoryId: string;
  createAt: Date | string | null;
  eventId: string;
  id: string;
  key: string;
  value: string;
};

export type TableModalProps = Partial<FirebaseSource> & {
  selectedDate: string;
  onDeletePayment: (id: string) => void;
} & RequiredProps &
  ModalProps;

export type IColumnSchemaObject = { [K in SchemaKey]: SchemaValue };

export type IFormHookProps = {
  categories: Category[];
  events: EventPayment[];
  onClose: () => void;
  onSubmit: (data: any) => void;
  defaultValues: Record<string, any>;
};

export interface IWithPaymentMethodsProps {
  onCreate: (newPayment: unknown) => void;
  onDelete: (id: string) => void;
  onSelect: (date: string | null) => void;
  // selectedDate: string | null;
  calendarData: Payment[] | [];
}