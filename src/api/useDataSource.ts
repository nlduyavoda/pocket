import { useEffect, useState } from "react";

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
