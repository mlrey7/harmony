import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { PrismaMessageType } from "@/lib/validators/message";
import { stringToInitials } from "@/lib/utils";

const ChannelMessage = ({ message }: { message: PrismaMessageType }) => {
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
            Today at 9:51 AM
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
