import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { PrismaMessageType } from "@/lib/validators/message";
import { stringToInitials } from "@/lib/utils";
import { format, isToday, isYesterday } from "date-fns";

const ChannelMessage = ({ message }: { message: PrismaMessageType }) => {
  const formatMessageDate = (date: Date) => {
    let day = "";
    if (isToday(date)) day = "Today at";
    else if (isYesterday(date)) day = "Yesterday at";
    else day = `${format(date, "MM/dd/yyyy")}`;

    return `${day} ${format(date, "hh:mm a")}`;
  };

  return (
    <div className="flex pb-5 pl-4 pr-8">
      <Avatar className="mr-4">
        <AvatarImage
          src={message.author.image}
          alt={`${message.author.name} avatar`}
        />
        <AvatarFallback>{stringToInitials(message.author.name)}</AvatarFallback>
      </Avatar>
      <div className="-mt-0.5 flex flex-col">
        <div className="flex items-baseline gap-2">
          <h2 className="text-base font-medium text-foreground5">
            {message.author.name}
          </h2>
          <p className="text-xs font-medium text-foreground3">
            {formatMessageDate(message.created_at)}
          </p>
        </div>
        <div className="flex flex-col gap-1 text-sm font-normal text-foreground4">
          <p>{message.text_content}</p>
        </div>
      </div>
    </div>
  );
};

export default ChannelMessage;
