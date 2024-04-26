import { useEffect, useState } from "react";

const useFirebaseSource = (onGetFirebaseSource: any) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    async function fetchData() {
      const dataSource = await onGetFirebaseSource();
      setIsLoading(false);
      if (dataSource.status === "ok") {
        setData(dataSource.data);
      } else {
        setIsError(true);
      }
    }
    fetchData();
  }, []);
  return {
    data,
    isLoading,
    isError,
  };
};

export default useFirebaseSource;
