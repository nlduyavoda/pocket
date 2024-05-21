import { Payment } from "./IPayment";

export type CustomType = {
  dataIndex: string;
  fixed: "left" | undefined;
  key: string;
  title: string;
  width: number;
};

export type Category = { id: string; key: string };

export type EventPayment = {
  endDate: string;
  startDate: string;
  id: string;
  title: string;
};

export type Bill = {
  id?: string;
  categoryId: string;
  createAt: Date;
  eventId: string;
  value: string;
  key: string;
};

export type FirebaseSource = {
  dataSource: Payment[] | null;
  categories: Category[];
  events: EventPayment[];
};
