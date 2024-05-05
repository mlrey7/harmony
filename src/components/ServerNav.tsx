import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ChevronDown, LogOut, Pencil } from "lucide-react";

const ServerNav = () => {
  return (
    <div className="bg-background2 flex min-h-screen w-60 flex-col">
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
    </div>
  );
};

export default ServerNav;
