import { Expenses_keys, defaultMonthlyExpenses } from "@utils/variables";
import { Form, Result } from "antd";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { FormContent } from "./Form.Content";
import { SelectField } from "./Components/Select";
import { useEffect, useState } from "react";
import { getCollection } from "@services/FireBaseMethods";
import { EVENTS } from "@services/utils";
import { EventType } from "@features/PaymentEvents/EventTypes";
import { FetchResType } from "@services/Types";

export const FormAdd = () => {
  const methods = useForm({ defaultValues: defaultMonthlyExpenses });
  const formValues: FieldValues = methods.getValues();
  const formKeys = Object.keys(formValues) as Expenses_keys[];

  return (
    <Form
      name="formAdd"
      layout="vertical"
      initialValues={{ remember: true }}
      autoComplete="off"
    >
      <EventPicker />
      {formKeys.map((subKey: Expenses_keys) => (
        <FormContent key={subKey} categoryKeys={subKey} />
      ))}
    </Form>
  );
};

const formatSelect = (data: EventType[]) => {
  const result = data.map((ele: EventType) => {
    return {
      value: ele.id,
      label: ele.title,
    };
  });
  return result;
};

const EventPicker = () => {
  const [events, setEvents] = useState<EventType[]>([]);
  const options = events.length > 0 ? formatSelect(events) : null;

  useEffect(() => {
    async function getEvents() {
      try {
        const result: FetchResType = await getCollection({
          collectionName: EVENTS,
          documentName: EVENTS,
        });
        const events = result.data as EventType[];
        setEvents(events);
      } catch (error) {
        console.log("getEvents error: >>", error);
      }
    }
    getEvents();
  }, []);
  return (
    <Controller
      name="event"
      render={({ field }) => {
        return (
          <SelectField
            {...field}
            label="events"
            options={options}
            placeholder="Chọn sự kiện"
          />
        );
      }}
    />
  );
};

