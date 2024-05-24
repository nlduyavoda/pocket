import { CreditCardOutlined, DollarOutlined } from "@ant-design/icons";
import { ButtonSuccess } from "@components/Button";
import { withFireBaseSource } from "@hocs/withFireBaseSource";
import { withHookForm } from "@hocs/withHookForm";
import { Category, EventPayment } from "Types/FirebaseSource";
import { IFormHookProps } from "Types/IPayment";
import { Button, Flex, Form, Input, Select } from "antd";
import { ReactNode, useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";

const SelectText = ({ children }: { children: ReactNode }) => {
  return <p className="flex text-[18px]">{children}</p>;
};

const FormItem = ({
  name,
  children,
}: {
  name?: string;
  children: React.ReactNode;
}) => {
  return (
    <Form.Item
      labelCol={{ offset: 0, span: 5 }}
      wrapperCol={{ offset: 0, span: 24 }}
      style={{ width: "calc(50% - 20px)" }}
      name={name}
      colon={false}
    >
      {children}
    </Form.Item>
  );
};

const defaultStyle = {
  backgroundColor: "#f9f9f9",
  padding: "10px",
  borderRadius: "5px",
  marginBottom: "10px",
};

const FormCreate = withHookForm<IFormHookProps>(
  ({ categories, events, onClose, onSubmit }: any) => {
    const { control, handleSubmit, reset, setFocus } = useFormContext();
    const handleSetFocus = (fieldName: string) => setFocus(fieldName);

    useEffect(() => {
      handleSetFocus("key");
    }, []);

    return (
      <Form
        style={defaultStyle}
        onFinish={handleSubmit((data, event) => {
          handleSetFocus("key");
          onSubmit(data);
          reset();
        })}
      >
        <Flex justify="space-between" wrap="wrap" gap={20}>
          <FormItem name="key">
            <Controller
              name="key"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  style={{
                    height: 50,
                    fontSize: 18,
                  }}
                  placeholder="Payment's name"
                  prefix={<CreditCardOutlined />}
                />
              )}
            />
          </FormItem>
          <FormItem name="value">
            <Controller
              name="value"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  defaultValue={field.value}
                  style={{
                    height: 50,
                    fontSize: 18,
                  }}
                  placeholder="Price"
                  prefix={<DollarOutlined />}
                />
              )}
            />
          </FormItem>
          <Controller
            name="createAt"
            control={control}
            render={({ field }) => <Input type="hidden" {...field} />}
          />
          <FormItem name="eventId">
            <Controller
              name="eventId"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  placeholder="Select event"
                  style={{ width: "100%", height: 50 }}
                  options={[
                    {
                      value: "",
                      label: <SelectText>Select event</SelectText>,
                    },
                    ...events.map((event: EventPayment) => {
                      return {
                        value: event.id,
                        label: <SelectText>{event.title}</SelectText>,
                      };
                    }),
                  ]}
                />
              )}
            />
          </FormItem>
          <FormItem name="categoryId">
            <Controller
              name="categoryId"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  style={{ width: "100%", height: 50 }}
                  placeholder="Select category"
                  options={[
                    {
                      value: "",
                      label: <SelectText>Select category</SelectText>,
                    },
                    ...categories.map((cate: Category) => {
                      return {
                        value: cate.id,
                        label: <SelectText>{cate.key}</SelectText>,
                      };
                    }),
                  ]}
                />
              )}
            />
          </FormItem>
        </Flex>
        <Flex justify="space-between">
          <Button onClick={onClose}>Close</Button>
          <ButtonSuccess htmlType="submit">Submit</ButtonSuccess>
        </Flex>
      </Form>
    );
  }
);

export default withFireBaseSource(FormCreate, ["categories", "events"]);
