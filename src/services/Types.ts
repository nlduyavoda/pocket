import { MonthlyExpenses } from "@utils/variables";

export type AddCollection = {
  collectionName?: string;
  documentName: string;
  data: any;
};

export type GetCollection = {
  collectionName?: string;
  documentName: string;
};

export type FetchResType = {
  status: "ok" | "fail";
  data: unknown;
};

export interface DocumentType extends MonthlyExpenses {}
