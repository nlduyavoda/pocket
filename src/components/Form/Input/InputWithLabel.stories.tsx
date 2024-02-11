import { InputWithLabel, InputWithLabelPropsType } from "./InputWithLabel";

export default {
  component: InputWithLabel,
};

export const WithoutArgs: { args: InputWithLabelPropsType } = {
  args: {
    title: "storybook label",
    level: 4,
    defaultValue: "field default value",
    errorMessage: "Should be combination of numbers & alphabets",
    readOnly: true,
  },
};
