import { QueryResult } from "Types/FirebaseSource";
import { useEffect, useState } from "react";

const defaultDataSources = {
  data: {
    bills: null,
    categories: [],
    events: [],
  },
  loading: true,
  error: null,
};

const useQueries = (queries: any[]) => {
  const [results, setResults] = useState<QueryResult>(defaultDataSources);
  useEffect(() => {
    const fetchData = async () => {
      const promises = queries.map(async (query) => {
        const { sourceName, fetchFunction } = query;
        try {
          const response = await fetchFunction();
          return response;
        } catch (error) {
          return { data: null };
        }
      });

      const [bills, categories, events] = await Promise.all(promises);
      setResults({
        data: {
          bills,
          categories,
          events,
        },
        loading: false,
        error: null,
      });
    };

    fetchData();
  }, []);

  return results;
};

export default useQueries;
