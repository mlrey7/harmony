"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ChevronDown, Pencil, LogOut } from "lucide-react";

const ServerNavHeader = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className="group cursor-pointer transition-all hover:bg-background data-[state=open]:bg-background"
      >
        <div className="text-foreground5 flex items-center justify-between px-4 py-3 font-semibold shadow">
          Own Server
          <ChevronDown className="h-5 w-5 transition-all ease-in-out group-data-[state=open]:rotate-180" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="DropdownMenuContent mt-1">
        <DropdownMenuItem className="text-foreground3 text-sm hover:text-white">
          <div className="flex w-full items-center justify-between">
            Edit Server Profile
            <Pencil className="h-4 w-4" />
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="group text-sm text-red-500 hover:text-white focus:bg-destructive">
          <div className="flex w-full items-center justify-between">
            Leave Server
            <LogOut className="h-4 w-4 text-destructive group-hover:text-white" />
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ServerNavHeader;
