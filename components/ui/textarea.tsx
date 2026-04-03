import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "min-h-[112px] w-full rounded-2xl border border-black/15 bg-white/95 px-4 py-3 text-sm font-medium text-[#171312] outline-none placeholder:text-[#756b66] focus:border-brand-orange focus:bg-white dark:border-white/12 dark:bg-[#221f25] dark:text-white dark:placeholder:text-white/45",
      className
    )}
    {...props}
  />
));

Textarea.displayName = "Textarea";

export { Textarea };
