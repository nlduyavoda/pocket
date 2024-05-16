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
      // Perform your payment mutation logic here
      // e.g. make an API call to process the payment
      // const response = await api.post('/payments', paymentData);
      // Handle the response accordingly

      setIsLoading(false);
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
