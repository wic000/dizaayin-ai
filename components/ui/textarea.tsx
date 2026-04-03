import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "min-h-[112px] w-full rounded-2xl border border-black/12 bg-white px-4 py-3 text-sm font-semibold text-[#120f10] shadow-[0_8px_22px_rgba(24,19,23,0.08)] outline-none placeholder:text-[#5f5550] focus:border-brand-orange focus:bg-white dark:border-white/12 dark:bg-[#221f25] dark:text-white dark:placeholder:text-white/55",
      className
    )}
    {...props}
  />
));

Textarea.displayName = "Textarea";

export { Textarea };
