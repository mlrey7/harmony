import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import React from "react";

const sidebarButtonVariants = cva(
  "relative flex justify-center items-center rounded-3xl hover:rounded-2xl transition-all bg-gray-800 h-12 w-12 cursor-pointer duration-150 ease-linear group",
  {
    variants: {
      variant: {
        default: "text-gray-300",
        action: "text-green-500 hover:bg-green-600 hover:text-white",
        directMessage: "text-gray-300 hover:bg-primary",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
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
        <span className="absolute w-auto py-2 px-3 m-2 min-w-max left-14 rounded-md shadow-md text-white bg-gray-900 text-sm font-semibold transition-all duration-100 scale-0 origin-left group-hover:scale-100">
          {tooltip}
        </span>
      </button>
    );
  }
);

SidebarButton.displayName = "SidebarButton";

export default SidebarButton;
