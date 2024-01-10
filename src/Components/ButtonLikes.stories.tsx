import type { Meta, StoryObj } from "@storybook/react";
import { ButtonLikes } from "./ButtonLikes";

const meta = {
  title: "Components/ButtonLikes",
  component: ButtonLikes,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
} satisfies Meta<typeof ButtonLikes>;

export default meta;
type Story = StoryObj<typeof meta>;

export const index: Story = {
  args: {
    user: {
      name: "Jane Doe",
    },
  },
};
