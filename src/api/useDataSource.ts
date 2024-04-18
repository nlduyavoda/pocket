import { useEffect, useState } from "react";

export const useDataSource = ({ documentName, id }, onfetch, sourceName) => {
  const [dataSource, setDataSource] = useState<any>(null);
  const [isloading, setIsloading] = useState(true);
  useEffect(() => {
    async function onfetchDataSource() {
      const response = await onfetch({ documentName, id });
      setIsloading(false);
      setDataSource(response);
    }
    onfetchDataSource();
  }, []);

  return { [`${sourceName}`]: dataSource, isloading };
};
