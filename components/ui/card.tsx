import { cn } from "@/lib/utils";

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-[28px] border border-black/8 bg-white/92 p-4 shadow-soft backdrop-blur dark:border-white/10 dark:bg-white/6",
        className
      )}
      {...props}
    />
  );
}
