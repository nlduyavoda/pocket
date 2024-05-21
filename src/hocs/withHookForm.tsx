import { FormProvider, useForm } from "react-hook-form";

export const withHookForm = <T,>(Component: React.FC<T>) => {
  return (props: T & { defaultValues: any }) => {
    const methods = useForm({
      defaultValues: props.defaultValues,
    });
    return (
      <FormProvider {...methods}>
        <Component {...props} />;
      </FormProvider>
    );
  };
};
