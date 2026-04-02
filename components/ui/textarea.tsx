import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "min-h-[112px] w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-brand-orange dark:border-white/10 dark:bg-white/5 dark:text-white",
      className
    )}
    {...props}
  />
));

Textarea.displayName = "Textarea";

export { Textarea };
