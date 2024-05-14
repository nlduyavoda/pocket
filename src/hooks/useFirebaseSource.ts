import { useEffect, useState } from "react";

const useFirebaseSource = (
  onGetFirebaseSource: any,
  dependencies: unknown[] = []
) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    async function fetchData() {
      try {
        const dataSource = await onGetFirebaseSource();
        setIsLoading(false);
        if (dataSource.status === "ok") {
          setData(dataSource.data);
        } else {
          setIsError(true);
        }
      } catch (error) {
        console.log("useFirebaseSource - error", error);
      }
    }
    fetchData();
  }, dependencies);

  return {
    data,
    isLoading,
    isError,
  };
};

export default useFirebaseSource;
