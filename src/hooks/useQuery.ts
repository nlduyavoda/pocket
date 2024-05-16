import { useState, useEffect } from "react";

type QueryResult<T> = {
  data: T | null;
  loading: boolean;
  error: Error | null;
};

function useQuery<T, PropsType>(
  dataProps: PropsType,
  fetchFunction: (props: PropsType) => Promise<T>
): QueryResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchFunction(dataProps);
        setData(response);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dataProps, fetchFunction]);

  return { data, loading, error };
}

export default useQuery;
