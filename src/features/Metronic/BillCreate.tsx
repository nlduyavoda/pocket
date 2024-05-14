import React from "react";
import { Form, Input, DatePicker, Select } from "antd";
import { Control, Controller, FieldValues } from "react-hook-form";
import { Category, EventPayment } from "@types/FirebaseSource";
import { RequiredProps, withFormModal } from "@hocs/withFormModal";
import { withFireBaseSource } from "@hocs/withFireBaseSource";

type ComponentProps = {
  categories: Category[];
  events: EventPayment[];
};

export const BillCreate = ({
  categories,
  events,
  control,
}: {
  categories: Category[];
  events: EventPayment[];
  control?: Control<FieldValues>;
}) => {
  return (
    <>
      <FormItem label="Key" name="key">
        <Controller
          name="key"
          control={control}
          render={({ field }) => <Input {...field} />}
        />
      </FormItem>
      <FormItem label="Value" name="value">
        <Controller
          name="value"
          control={control}
          render={({ field }) => <Input {...field} />}
        />
      </FormItem>
      {/* <FormItem label="Date" name="createAt">
        <Controller
          name="createAt"
          control={control}
          render={({ field }) => {
            return <DatePicker {...field} />;
          }}
        />
      </FormItem> */}
      <FormItem label="Event" name="eventId">
        <Controller
          name="eventId"
          control={control}
          render={({ field }) => (
            <Select {...field}>
              {events.map((event) => {
                return (
                  <Select.Option key={event.id} value={event.id}>
                    {event.title}
                  </Select.Option>
                );
              })}
              <Select.Option value="event3">add more option +</Select.Option>
              {/* Add more options as needed */}
            </Select>
          )}
        />
      </FormItem>
      <FormItem label="Category" name="categoryId">
        <Controller
          name="categoryId"
          control={control}
          render={({ field }) => (
            <Select {...field}>
              {categories.map((cate) => {
                return (
                  <Select.Option key={cate.id} value={cate.id}>
                    {cate.key}
                  </Select.Option>
                );
              })}
              <Select.Option value="event3">add more option +</Select.Option>
              {/* Add more options as needed */}
            </Select>
          )}
        />
      </FormItem>
    </>
  );
};



export const CreateFormModal = withFormModal<ComponentProps & RequiredProps>(
  BillCreate
);

const FormItem = ({
  label,
  name,
  children,
}: {
  label?: string;
  name?: string;
  children: React.ReactNode;
}) => {
  return (
    <Form.Item label={label} name={name}>
      {children}
    </Form.Item>
  );
};
