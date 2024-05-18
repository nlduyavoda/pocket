import { useState } from "react";

const usePaymentMutate = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState<unknown>(null);
  const mutatePayment = async (props, onMutate) => {
    try {
      setIsLoading(true);
      const response: unknown = await onMutate(props);
      setData(response);
      setIsLoading(false);
      return response;
    } catch (err) {
      setIsLoading(false);
      setError(err);
    }
  };

  return {
    isLoading,
    error,
    data,
    mutate: mutatePayment,
  };
};

export default usePaymentMutate;
