import { cn } from "@/lib/utils";

export function OptionChips({
  options,
  value,
  onChange
}: {
  options: Array<{ label: string; value: string }>;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => {
        const active = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-semibold transition",
              active ? "bg-brand-ink text-white" : "bg-white text-foreground shadow-soft dark:bg-white/5 dark:text-white"
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
