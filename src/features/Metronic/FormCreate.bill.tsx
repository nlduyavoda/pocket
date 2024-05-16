import { withFireBaseSource } from "@hocs/withFireBaseSource";
import { addBills } from "@services/FireBaseMethods";
import { Button } from "antd";
import { useForm } from "react-hook-form";
import { BillCreate } from "./BillCreate";
import usePaymentMutate from "@hooks/usePaymentMutate";
import { json } from "stream/consumers";
import { FetchResType } from "@services/Types";
import { createPayment } from "@services/PaymentMethods";

interface FormValues {
  // Define your form fields here
}

const FormCreate = ({ categories, events, onClose, selectedDate }) => {
  const { mutate, data, isLoading, error } = usePaymentMutate();
  const methods = useForm({
    defaultValues: {
      categoryId: "",
      createAt: selectedDate,
      eventId: "",
      key: "",
      value: "",
    },
  });
  const handleSubmit = async (values: FormValues) => {
    await mutate(values, createPayment);
    if (data && !isLoading && !error) {
      onClose();
    }
  };

  return (
    <form onSubmit={methods.handleSubmit(handleSubmit)}>
      <BillCreate
        categories={categories}
        events={events}
        control={methods.control}
      />
      <Button htmlType="submit">Submit</Button>
      <Button onClick={onClose}>Close</Button>
    </form>
  );
};

export default withFireBaseSource(FormCreate, ["categories", "events"]);
