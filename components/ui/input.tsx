import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      "flex h-12 w-full rounded-2xl border border-black/12 bg-white px-4 text-sm font-semibold text-[#120f10] shadow-[0_8px_22px_rgba(24,19,23,0.08)] outline-none placeholder:text-[#5f5550] focus:border-brand-orange focus:bg-white dark:border-white/12 dark:bg-[#221f25] dark:text-white dark:placeholder:text-white/55",
      className
    )}
    {...props}
  />
));

Input.displayName = "Input";

export { Input };
