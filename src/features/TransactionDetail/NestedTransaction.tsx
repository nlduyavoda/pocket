import { Form, Input } from "antd";

export const NestedTransaction = ({ transactions }) => {
  return (
    <PaymentsWrapper transactions={transactions} render={PaymentsWrapper} />
  );
};

const PaymentsWrapper = ({ transactions, hasParent = "", ...props }) => {
  const entries = Object.entries(transactions);
  if (entries.length <= 0) return <p>array is empty</p>;
  let level = 1;
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
  return (
    <div className="rounded-[20px] p-[20px] bg-white">
      <Form {...formItemLayout} variant="filled" style={{ maxWidth: 600 }}>
        <Form.Item
          label="Input"
          name="Input"
          rules={[{ required: true, message: "Please input!" }]}
        >
          <Input />
        </Form.Item>
      </Form>
      {entries.map((entry, index) => {
        const [label, value] = entry;
        if (typeof value === "object" && value !== null) {
          return (
            <div>
              <p className="text-xl mb-[10px]">{label}: </p>
              <p>{props.render({ transactions: value, level_: label })}</p>
            </div>
          );
        }
        return (
          <PaymentField
            key={index}
            label={label}
            value={value}
            level={!!hasParent ? level++ : 1}
          />
        );
      })}
    </div>
  );
};

const PaymentField = ({ label, value, level }) => {
  const classes = `ml-[${level * 2 * 0}px]`;
  return (
    <div className={`flex ${classes} mb-[0px]`}>
      <Form.Item
        label={label}
        name={label}
        rules={[{ required: true, message: "Please input!" }]}
      >
        <Input value={value} />
      </Form.Item>
    </div>
  );
};
