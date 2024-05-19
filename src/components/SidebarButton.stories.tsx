import { Meta, StoryObj } from "@storybook/react";
import SidebarButton from "./SidebarButton";
import { Plus } from "lucide-react";
import { stringToInitials } from "@/lib/utils";

const meta: Meta<typeof SidebarButton> = {
  title: "sidebar/SidebarButton",
  component: SidebarButton,
  decorators: [
    (Story) => (
      <nav className="fixed left-0 top-0 flex min-h-screen flex-col gap-2 bg-gray-900 px-3 pt-3">
        <Story />
      </nav>
    ),
  ],
  args: {
    tooltip: "Test tooltip",
  },
  argTypes: {
    variant: {
      options: ["default", "action"],
      control: "inline-radio",
    },
    active: {
      control: "boolean",
    },
  },
  render: (args) => {
    return (
      <SidebarButton {...args}>
        <Plus className="h-6 w-6" />
      </SidebarButton>
    );
  },
};

export default meta;

type Story = StoryObj<typeof SidebarButton>;

export const Default: Story = {
  args: {
    variant: "default",
  },
};

export const Action: Story = {
  args: {
    variant: "action",
  },
};

export const Text: Story = {
  args: {
    variant: "default",
  },
  render: (args) => {
    return (
      <SidebarButton {...args}>{stringToInitials("Own Server")}</SidebarButton>
    );
  },
};
