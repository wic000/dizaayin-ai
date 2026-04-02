import { cn } from "@/lib/utils";

export function Badge({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-black/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-foreground/70 dark:bg-white/10 dark:text-white/75",
        className
      )}
    >
      {children}
    </span>
  );
}
