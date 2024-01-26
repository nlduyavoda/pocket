import {
  ExpenseCategories,
  ExpenseProperties,
  MonthlyExpenses,
} from "@utils/variables";
import { Form, Input, Typography } from "antd";

export const DrawerTableContent = ({
  payment,
}: {
  payment: MonthlyExpenses;
}) => {
  const renderNestedObject = (obj: any, depth = 0) => {
    return Object.keys(obj).map((key) => {
      const fieldKey = depth > 0 ? `${key}` : key;
      if (typeof obj[key] === "object" && obj[key] !== null) {
        return (
          <Form.Item key={fieldKey}>
            <Typography.Title className="text-white capitalize" level={3}>
              {ExpenseCategories[key]}
            </Typography.Title>
            <div style={{ marginLeft: `${depth * 20}px` }}>
              {renderNestedObject(obj[key], depth + 1)}
            </div>
          </Form.Item>
        );
      } else {
        const childLabel = ExpenseProperties[key] || ExpenseCategories[key];
        return (
          <FieldLabel
            label={childLabel}
            name={fieldKey}
            key={fieldKey}
            initialValue={obj[key]}
            styles={{ width: "80%" }}
          />
        );
      }
    });
  };
  return <Form>{renderNestedObject(payment)}</Form>;
};

const FieldLabel = ({
  label,
  name,
  key,
  initialValue,
  styles,
}: {
  label: string;
  name: string;
  key: string;
  initialValue: string;
  styles: object;
}) => {
  return (
    <Form.Item name={name}>
      <Typography.Title className="text-white capitalize" level={5}>
        {label}:
      </Typography.Title>
      <Input style={styles} value={initialValue} readOnly />
    </Form.Item>
  );
};
