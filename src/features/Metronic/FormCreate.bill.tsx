import { withFireBaseSource } from "@hocs/withFireBaseSource";
import { addBills } from "@services/FireBaseMethods";
import { Button } from "antd";
import { useForm } from "react-hook-form";
import { BillCreate } from "./BillCreate";

interface FormValues {
  // Define your form fields here
}

const FormCreate = ({ categories, events, onClose, selectedDate }) => {
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
    console.log(values);
    // Handle form submission logic here
    const { status, data, message } = await addBills({
      data: values,
      documentName: "bills",
    });
    console.log(status, data, message);
    if (status === "ok") {
      const responseData = JSON.parse(data);
      console.log("responseData", responseData);
      // const { startDate, endDate, title } = responseData;
      // const event = {
      //   title,
      //   startDate: startDate,
      //   endDate: endDate,
      // };
    } else {
      console.log("onSubmit fail");
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
