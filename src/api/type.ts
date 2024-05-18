export type SourceType = {
  sourceName: string;
  status?: string;
  data: any;
};

export type RequestType = Promise<SourceType>;

