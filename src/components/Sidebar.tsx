"use client";

import { Atom, Compass, Plus } from "lucide-react";
import SidebarButton from "./SidebarButton";
import { Separator } from "./ui/separator";

const Sidebar = () => {
  return (
    <div className="fixed top-0 min-h-screen left-0 flex flex-col bg-gray-900 pt-3 px-3 gap-2">
      <SidebarButton tooltip="Add a Server" variant={"directMessage"}>
        <Atom className="h-6 w-6" />
      </SidebarButton>
      <Separator className="w-8 self-center bg-gray-600" />
      <SidebarButton tooltip="Own Server">OS</SidebarButton>
      <SidebarButton tooltip="Add a Server" variant={"action"}>
        <Plus className="h-6 w-6" />
      </SidebarButton>
      <SidebarButton tooltip="Explore Discoverable Servers" variant={"action"}>
        <Compass className="h-6 w-6" />
      </SidebarButton>
    </div>
  );
};

export default Sidebar;
