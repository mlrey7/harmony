import { Meta, StoryObj } from "@storybook/react";
import Sidebar from "./Sidebar";
import { ExtendedServer } from "@/types/db";

const servers: Array<ExtendedServer> = [
  {
    id: "1",
    channel_groups: [
      {
        channels: [
          {
            id: "1",
            channel_group_id: "213123",
            created_at: new Date(),
            description: "first channel",
            pinned_messages_ids: [],
            title: "general",
            updated_at: new Date(),
          },
        ],
        created_at: new Date(),
        id: "213123",
        server_id: "1",
        title: "text channels",
      },
    ],
    cover_image: "",
    created_at: new Date(),
    description: "",
    title: "React Server",
    image: "",
  },
  {
    id: "2",
    channel_groups: [
      {
        channels: [
          {
            id: "2",
            channel_group_id: "213122343",
            created_at: new Date(),
            description: "second channel",
            pinned_messages_ids: [],
            title: "memes",
            updated_at: new Date(),
          },
        ],
        created_at: new Date(),
        id: "213122343",
        server_id: "2",
        title: "text channels",
      },
    ],
    cover_image: "",
    created_at: new Date(),
    description: "",
    title: "Own Server",
    image: "",
  },
];

const meta: Meta<typeof Sidebar> = {
  title: "sidebar/Sidebar",
  component: Sidebar,
  parameters: {
    nextjs: {
      navigation: {
        segments: ["1", "1"],
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Sidebar>;

export const Default: Story = {
  args: {
    servers: servers,
    userId: "",
  },
};
