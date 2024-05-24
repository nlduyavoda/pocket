import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

export const withHookForm = <T,>(Component: React.FC<T>) => {
  return (props: T & { defaultValues: any }) => {
    const methods = useForm({
      defaultValues: props.defaultValues,
    });

    useEffect(() => {
      methods.reset(props.defaultValues);
    }, [props.defaultValues, methods]);

    return (
      <FormProvider {...methods}>
        <Component {...props} />
      </FormProvider>
    );
  };
};
