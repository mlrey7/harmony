import React from "react";
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
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

const ServerNav = () => {
  return (
    <div className="bg-background2 fixed top-0 flex min-h-screen w-60 flex-col">
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
      <div className="flex-1"></div>
      <div className="bg-background3 flex h-14 items-center px-2">
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
