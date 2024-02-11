import { ExpenseCategories } from "@utils/variables";
import { GroupFields } from "./index";
import FormLabel from "@utils/FormSchema.json";

type EntryValue = [string, object | string];

const onRenderFields = (FormLabel: object | string, hasParent?: boolean) => {
  let level = 0;
  if (hasParent) {
    level++;
  }
  const result: any = Object.entries(FormLabel).map((field: EntryValue) => {
    const [key, values] = field;
    const hasFields = typeof values === "string";
    return {
      groupName: hasFields ? values : ExpenseCategories[key],
      fields: hasFields ? null : onRenderFields(values, true),
      level,
    };
  });
  return result;
};

const onRemoveUnuseField = (data, fieldsToRemove) => {
  const clonedData = { ...data };
  fieldsToRemove.forEach((fieldName: string) => {
    delete clonedData[fieldName];
  });
  return clonedData;
};

export const Groups = () => {
  const entries = onRemoveUnuseField(FormLabel, ["id", "total_expenses"]);
  const result = onRenderFields(entries);
  return (
    <div>
      {result.map((entries, idx) => {
        const { groupName, fields, level } = entries;
        return (
          <GroupFields
            key={groupName + idx}
            title={groupName}
            groupItems={fields}
          />
        );
      })}
    </div>
  );
};
