import { useForm, useFieldArray } from "react-hook-form";
import { Form, Input, Button, Space } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { defaultMonthlyExpenses as vars } from "@utils/variables";

type FormValues = {
  name: string;
  values: string[] | string;
};
type PaymentFormProps = {
  productName: string;
  description: string;
  properties: FormValues[];
};
const getDefaultValues = (props: any): Partial<PaymentFormProps> => {
  const entries = Object.entries(props);
  let store = [];
  for (const [key, value] of entries) {
    store.push({ name: key, values: value });
  }
  return {
    productName: "",
    description: "",
    properties: [
      { name: "Color", values: ["Red", "Blue", "Green"] },
      { name: "Size", values: ["Small", "Medium", "Large"] },
    ],
  };
};

export const FormFields = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: getDefaultValues(vars),
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "properties",
  });

  const onSubmit = (data) => {
    console.log(data);
    // Handle form submission
  };

  return (
    <Form className="h-[30vh] overflow-auto" onFinish={handleSubmit(onSubmit)}>
      {fields.map((field, index) => (
        <Space
          key={field.id}
          style={{ display: "flex", marginBottom: 8 }}
          align="baseline"
        >
          <Form.Item
            {...field}
            name={["properties", index, "name"]}
            fieldKey={[field.fieldKey, "name"]}
            initialValue={field.name} // Set defaultValue for name input
          >
            <Input placeholder="Property Name" />
          </Form.Item>
          <Form.List
            name={["properties", index, "values"]}
            initialValue={field.values}
          >
            {(fields, { add, remove }) => (
              <>
                {fields.map((valueField, valueIndex) => (
                  <Space
                    key={valueField.key}
                    style={{ display: "flex" }}
                    align="baseline"
                  >
                    <Form.Item
                      {...valueField}
                      name={[valueField.name]}
                      fieldKey={[valueField.fieldKey]}
                    >
                      <Input placeholder="Property Value" />
                    </Form.Item>
                    <Button
                      type="danger"
                      onClick={() => remove(valueField.name)}
                      icon={<MinusCircleOutlined />}
                    />
                  </Space>
                ))}
                <Button
                  type="dashed"
                  onClick={() => add()}
                  style={{ width: "100%" }}
                  icon={<PlusOutlined />}
                >
                  Add Value
                </Button>
              </>
            )}
          </Form.List>
          <Button
            type="danger"
            onClick={() => remove(index)}
            icon={<MinusCircleOutlined />}
          />
        </Space>
      ))}
      <Form.Item>
        <Button
          type="dashed"
          onClick={() => append({})}
          icon={<PlusOutlined />}
        >
          Add Property
        </Button>
      </Form.Item>

      <Form.Item>
        <Button type="default" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
