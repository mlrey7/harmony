import { Meta, StoryObj } from "@storybook/react";
import ChannelMessage from "./ChannelMessage";

const ChannelMessageWrapper = ({
  authorName,
  currentDate,
  textContent,
}: {
  authorName: string;
  currentDate: Date;
  textContent: string;
}) => {
  return (
    <ChannelMessage
      message={createMessage(authorName, currentDate, textContent)}
    />
  );
};

const createMessage = (
  authorName: string,
  currentDate: Date,
  textContent: string,
) => {
  return {
    author: {
      id: "sadfsdf",
      image: "",
      name: authorName,
      username: "sdfsdf",
    },
    created_at: currentDate,
    updated_at: currentDate,
    id: "sdafsfasdf",
    image_content: [],
    reactions: [],
    reply_to_id: null,
    text_content: textContent,
  };
};

const meta: Meta<typeof ChannelMessageWrapper> = {
  title: "channel/ChannelMessage",
  component: ChannelMessageWrapper,
};

export default meta;

type Story = StoryObj<typeof ChannelMessageWrapper>;

export const Default: Story = {
  args: {
    authorName: "Accelthreat",
    currentDate: new Date(),
    textContent: "lorem ipsum dolor",
  },
};
