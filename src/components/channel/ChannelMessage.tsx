import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const ChannelMessage = () => {
  return (
    <div className="flex pb-5 pl-4 pr-8">
      <Avatar className="mr-4">
        <AvatarImage src="" alt="avatar" />
        <AvatarFallback>AC</AvatarFallback>
      </Avatar>
      <div className="-mt-0.5 flex flex-col">
        <div className="flex items-baseline gap-2">
          <h2 className="text-base font-medium text-foreground5">
            Accelthreat
          </h2>
          <p className="text-xs font-medium text-foreground3">
            Today at 9:51 AM
          </p>
        </div>
        <div className="flex flex-col gap-1 text-sm font-normal text-foreground4">
          <p>asdfasdfsd</p>
          <p>asdfasdfsd</p>
          <p>asdfasdfsd</p>
        </div>
      </div>
    </div>
  );
};

export default ChannelMessage;
