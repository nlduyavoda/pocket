import { getCollection } from "@services/FireBaseMethods";
import { useEffect, useState } from "react";
import { RequestType } from "./type";

export const useDataSource = (sourceProps, onfetch, sourceName) => {
  const [dataSource, setDataSource] = useState<any>(null);
  const [isloading, setIsloading] = useState(true);
  useEffect(() => {
    async function onfetchDataSource() {
      const response = await onfetch(sourceProps);
      setIsloading(false);
      setDataSource(response);
    }
    onfetchDataSource();
  }, []);
  return { [`${sourceName}`]: dataSource, isloading };
};

export async function fetchDataSource(sourceName: string): RequestType {
  const response = await getCollection({
    collectionName: sourceName,
  });
  return {
    sourceName: sourceName,
    data: response.status === "ok" ? response.data : [],
  };
}
