import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-2xl text-sm font-semibold transition active:scale-[0.99] disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      variant: {
        default: "bg-brand-orange px-4 py-3 text-white shadow-soft",
        secondary: "bg-black/5 px-4 py-3 text-foreground dark:bg-white/10 dark:text-white",
        ghost: "bg-transparent px-3 py-2 text-foreground dark:text-white",
        outline: "border border-black/10 bg-white px-4 py-3 text-foreground dark:border-white/10 dark:bg-transparent dark:text-white"
      },
      size: {
        default: "h-12",
        sm: "h-10 px-3",
        lg: "h-14 px-5"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, ...props }, ref) => (
  <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
));

Button.displayName = "Button";

export { Button, buttonVariants };
