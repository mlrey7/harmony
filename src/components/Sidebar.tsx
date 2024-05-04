"use client";

import { Atom, Compass, Plus } from "lucide-react";
import SidebarButton from "./SidebarButton";
import { Separator } from "./ui/separator";

const Sidebar = () => {
  return (
    <nav className="fixed left-0 top-0 flex min-h-screen flex-col gap-2 bg-gray-900 px-3 pt-3">
      <SidebarButton tooltip="Add a Server">
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
    </nav>
  );
};

export default Sidebar;
