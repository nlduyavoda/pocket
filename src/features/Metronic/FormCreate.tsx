import { withFireBaseSource } from "@hocs/withFireBaseSource";
import { Button, Form, Input, Select } from "antd";
import { Controller, useFormContext } from "react-hook-form";
import { withFormCreate } from "../../hocs/withFormCreate";

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

const FormCreate = withFormCreate(
  ({ categories, events, onClose, onMutate }: any) => {
    const { control, handleSubmit } = useFormContext();
    const onSubmit = (values: any) => onMutate(values);
    return (
      <Form onFinish={handleSubmit(onSubmit)}>
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
        <Button htmlType="submit">Submit</Button>
        <Button onClick={onClose}>Close</Button>
      </Form>
    );
  }
);

export default withFireBaseSource(FormCreate, ["categories", "events"]);
