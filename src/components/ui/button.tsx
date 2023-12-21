import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import LoadingIndicator from "../molecules/loading-indicator";

const buttonVariants = cva(
  "inline-flex items-center uppercase justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-white/25 bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "",
        link: "text-primary underline-offset-4 hover:underline",
        accent: "bg-accent text-accent-foreground shadow-sm hover:bg-accent/90",
        discord: "bg-discord text-white shadow-sm hover:bg-discord/90",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 px-3 text-xs",
        lg: "h-10 px-8",
        icon: "h-9 w-9",
        xl: "h-12 px-10 py-3 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  className?: string;
  loading?: boolean;
  icon?: React.ReactNode;
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loading, icon, asChild, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    const fallback = loading || icon;
    return (
      <>
        {fallback && (
          // biome-ignore lint/a11y/useButtonType: <explanation>
          <button className={cn(buttonVariants({ variant, size, className }), "gap-2")} ref={ref} {...props}>
            {!loading && icon}
            {loading && <LoadingIndicator variant="spinner" className="w-4 h-4" />}
            {children ?? null}
          </button>
        )}
        {!fallback && (
          // eslint-disable-next-line react/no-children-prop
          // biome-ignore lint/correctness/noChildrenProp: <explanation>
          <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} children={children} />
        )}
      </>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
