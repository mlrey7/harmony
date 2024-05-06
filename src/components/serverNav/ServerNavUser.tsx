"use client";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { MicOff, Headphones, Settings } from "lucide-react";
import { Button } from "../ui/button";

const ServerNavUser = () => {
  return (
    <div className="flex h-14 items-center bg-background3 px-2">
      <Avatar>
        <AvatarImage src="" alt="avatar" />
        <AvatarFallback>AC</AvatarFallback>
      </Avatar>
      <div className="ml-2 flex flex-col justify-center">
        <h2 className="text-foreground5 text-sm">Accelthreat</h2>
        <h3 className="text-foreground3 text-xs">Online</h3>
      </div>
      <div className="ml-3 flex">
        <Button size={"compactIcon"} variant={"ghost"}>
          <MicOff className="h-5 w-5 text-destructive" />
        </Button>
        <Button size={"compactIcon"} variant={"ghost"}>
          <Headphones className="text-foreground3 h-5 w-5" />
        </Button>
        <Button size={"compactIcon"} variant={"ghost"}>
          <Settings className="text-foreground3 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default ServerNavUser;
