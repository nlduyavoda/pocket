export type SourceType = {
  sourceName: string;
  status?: string;
  data: any;
};

export type RequestType = Promise<SourceType>;

export type Payment = {
  categoryId: string;
  createAt: Date | string | null;
  eventId: string;
  id: string;
  key: string;
  value: string;
};
