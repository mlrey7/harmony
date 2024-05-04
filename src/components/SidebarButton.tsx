import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import React from "react";

const sidebarButtonVariants = cva(
  "relative flex justify-center items-center rounded-3xl hover:rounded-2xl transition-all bg-gray-800 h-12 w-12 cursor-pointer duration-150 ease-linear group before:absolute before:inset-y-3.5 before:-left-4 before:w-2 before:scale-0 before:rounded before:bg-gray-300 before:transition-all before:duration-150 before:ease-in-out before:hover:scale-100",
  {
    variants: {
      variant: {
        default: "text-gray-300 hover:bg-primary",
        action: "text-green-500 hover:bg-green-600 hover:text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface SidebarButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof sidebarButtonVariants> {
  tooltip?: string;
  children: React.ReactNode;
}

const SidebarButton = React.forwardRef<HTMLButtonElement, SidebarButtonProps>(
  ({ tooltip = "", children, variant, className, ...props }, ref) => {
    return (
      <button
        className={cn(sidebarButtonVariants({ variant, className }))}
        ref={ref}
        {...props}
      >
        {children}
        <span className="absolute left-14 m-2 w-auto min-w-max origin-left scale-0 rounded-md bg-gray-900 px-3 py-2 text-sm font-semibold text-white shadow-md transition-all duration-100 group-hover:scale-100">
          {tooltip}
        </span>
      </button>
    );
  },
);

SidebarButton.displayName = "SidebarButton";

export default SidebarButton;
