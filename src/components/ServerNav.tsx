"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  ChevronDown,
  Headphones,
  LogOut,
  MicOff,
  Pencil,
  Settings,
  TextSearch,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { useSelectedLayoutSegment } from "next/navigation";
import { Separator } from "./ui/separator";
import ChannelGroup from "./ChannelGroup";

const ServerNav = ({ serverId }: { serverId: string }) => {
  const channelId = useSelectedLayoutSegment();

  return (
    <div className="fixed top-0 flex min-h-screen w-60 flex-col bg-background2">
      <DropdownMenu>
        <DropdownMenuTrigger
          asChild
          className="group cursor-pointer transition-all hover:bg-background data-[state=open]:bg-background"
        >
          <div className="flex items-center justify-between px-4 py-3 font-semibold shadow">
            Own Server
            <ChevronDown className="h-5 w-5 transition-all ease-in-out group-data-[state=open]:rotate-180" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="DropdownMenuContent mt-1">
          <DropdownMenuItem className="text-sm text-gray-400">
            <div className="flex w-full items-center justify-between">
              Edit Server Profile
              <Pencil className="h-4 w-4" />
            </div>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-sm text-red-500">
            <div className="flex w-full items-center justify-between">
              Leave Server
              <LogOut className="h-4 w-4" />
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <div className="flex-1 px-2 py-2">
        <Button
          variant={"ghost"}
          className="w-full px-2 text-gray-500 hover:text-gray-300"
        >
          <TextSearch className="mr-2 h-6 w-6" />
          <p className="text-base">Browse Channels</p>
          <div className="flex-1" />
        </Button>
        <Separator className="mt-2 w-full self-center bg-gray-700" />
        <ChannelGroup serverId={serverId} />
      </div>
      <div className="flex h-14 items-center bg-background3 px-2">
        <Avatar>
          <AvatarImage src="" alt="avatar" />
          <AvatarFallback>AC</AvatarFallback>
        </Avatar>
        <div className="ml-2 flex flex-col justify-center">
          <h2 className="text-sm">Accelthreat</h2>
          <h3 className="text-xs text-gray-400">Online</h3>
        </div>
        <div className="ml-3 flex">
          <Button size={"compactIcon"} variant={"ghost"}>
            <MicOff className="h-5 w-5 text-red-500" />
          </Button>
          <Button size={"compactIcon"} variant={"ghost"}>
            <Headphones className="h-5 w-5" />
          </Button>
          <Button size={"compactIcon"} variant={"ghost"}>
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ServerNav;
