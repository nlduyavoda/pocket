import { Payment } from "@api/type";
import { RequiredProps } from "@hocs/withFormModal";
import { FirebaseSource } from "@types/FirebaseSource";

export type SchemaKey = "name" | "category" | "event" | "price" | "action";
export type SchemaValue = keyof Payment | "action";
export type TableProps = RequiredProps & FirebaseSource & { selectedDate: string };
export type ColumnRenderType = {
  [k in SchemaKey]: (text: any, record: Payment) => JSX.Element;
};