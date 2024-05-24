import { MonthlyExpenses } from "@utils/variables";

export type AddCollection = {
  collectionName?: string;
  documentName?: string;
  data: any;
};

export type GetCollection = {
  collectionName?: string;
  documentName?: string;
};

export type AddDocumentType = {
  documentName: string;
  data: {[key: string]: any}[] | never[];
  message: string;
  docId?: string;
};

export type FetchResType = {
  status: "ok" | "fail";
  data: { [key: string]: any }[] | never[];
  message?: string | unknown;
};

export interface DocumentType extends MonthlyExpenses {}
