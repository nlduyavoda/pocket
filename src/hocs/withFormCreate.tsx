import usePaymentMutate from "@hooks/usePaymentMutate";
import { createPayment } from "@services/PaymentMethods";
import { FormProvider, useForm } from "react-hook-form";

interface FormValues {
  // Define your form fields here
}

export const withFormCreate = (Component: React.FC<any>) => {
  return (props: any) => {
    const { mutate, data, isLoading, error, ...mutateResponse } =
      usePaymentMutate();
    const methods = useForm({
      defaultValues: {
        categoryId: "",
        createAt: props.selectedDate,
        eventId: "",
        key: "",
        value: "",
      },
    });
    const onMutate = async (newPayment) => {
      const data = await mutate(newPayment, createPayment);
      if (data && !isLoading && !error) {
        props.updatePayment(newPayment);
        props.onClose();
      }
    };
    return (
      <FormProvider {...methods}>
        <Component
          {...props}
          mutateResponse={mutateResponse}
          onMutate={onMutate}
        />
        ;
      </FormProvider>
    );
  };
};
