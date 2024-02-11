import { GroupFields } from "./index";
import {
  ExpenseCategories,
  ExpenseProperties,
  defaultMonthlyExpenses,
} from "@utils/variables";

export default {
  component: GroupFields,
};

const mappingGroupFields = (params: string | object) => {
  const Items = Object.entries(params).map((item: string[]) => {
    const [label, value] = item as any;
    const KeyFormat: { [key in string]: string } = { ...ExpenseProperties };
    const labelFormatted = KeyFormat[label] || "";
    return {
      label: labelFormatted,
      value,
    };
  });
  return Items;
};

export const title = ExpenseCategories["housing"];
export const groupItems = mappingGroupFields(defaultMonthlyExpenses.housing);

type GroupFieldsType = {
  title: string;
  groupItems: string | object;
};
export const WithoutArgs: { args: GroupFieldsType } = {
  args: {
    title,
    groupItems,
  },
};




