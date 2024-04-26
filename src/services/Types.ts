import { MonthlyExpenses } from "@utils/variables";

export type AddCollection = {
  collectionName?: string;
  documentName: string;
  data: any;
};

export type GetCollection = {
  collectionName?: string;
  documentName?: string;
};

export type AddDocumentType = {
  documentName: string;
  data: unknown;
  message: string;
};

export type FetchResType = {
  status: "ok" | "fail";
  data: unknown;
  message?: string;
};

export interface DocumentType extends MonthlyExpenses {}
