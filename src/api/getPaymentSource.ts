import { RequestType, SourceType } from "./type";
import { fetchDataSource } from "./useDataSource";

export const getPaymentSource = async (sourceNames: string[]) => {
  const requests: RequestType[] = sourceNames.map((sourceName: string) =>
    fetchDataSource(sourceName)
  );

  const response: SourceType[] = await Promise.all(requests);
  let result: { [key: string]: any } = {}; // Add index signature to the result object
  for (let item of response) {
    result[item.sourceName] = item.data;
  }
  return { status: "ok", data: result }; // Return the result object directly
};
