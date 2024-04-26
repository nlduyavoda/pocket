import { Form, Input } from "antd";

export const NestedTransaction = ({ data }) => {
  const transactions = data;
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 14 },
    },
  };
  console.log(transactions);
  return (
    <Form
      className="h-[500px] overflow-auto rounded-[20px] pt-[20px]"
      {...formItemLayout}
      variant="filled"
      style={{ maxWidth: 600 }}
    >
      {/* <PaymentsWrapper transactions={transactions} render={PaymentsWrapper} /> */}
    </Form>
  );
};

const PaymentsWrapper = ({ transactions, ...props }) => {
  const entries = Object.entries(transactions);
  if (entries.length <= 0) return <p>array is empty</p>;
  return entries.map((entry, index) => {
    const [label, value] = entry as [string, unknown];
    if (typeof value === "object" && value !== null) {
      return (
        <FormItem label={label} key={label + index}>
          {props.render({ transactions: value, level_: label })}
        </FormItem>
      );
    }
    return (
      <FormItem label={label} key={label + index}>
        {typeof value === "number" && <Input defaultValue={value} />}
      </FormItem>
    );
  });
};

const FormItem = ({ label, children }) => {
  return (
    <Form.Item
      label={label}
      name={label}
      rules={[{ required: true, message: `Please ${label} !` }]}
    >
      {children}
    </Form.Item>
  );
};
