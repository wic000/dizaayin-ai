import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      "flex h-12 w-full rounded-2xl border border-black/15 bg-white/95 px-4 text-sm font-medium text-[#171312] outline-none placeholder:text-[#756b66] focus:border-brand-orange focus:bg-white dark:border-white/12 dark:bg-[#221f25] dark:text-white dark:placeholder:text-white/45",
      className
    )}
    {...props}
  />
));

Input.displayName = "Input";

export { Input };
