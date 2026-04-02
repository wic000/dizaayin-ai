import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      "flex h-12 w-full rounded-2xl border border-black/10 bg-white px-4 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-brand-orange dark:border-white/10 dark:bg-white/5 dark:text-white",
      className
    )}
    {...props}
  />
));

Input.displayName = "Input";

export { Input };
