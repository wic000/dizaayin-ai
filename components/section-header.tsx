export function SectionHeader({ eyebrow, title, subtitle }: { eyebrow?: string; title: string; subtitle?: string }) {
  return (
    <div>
      {eyebrow ? <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-lagoon">{eyebrow}</p> : null}
      <h2 className="mt-1 text-lg font-bold">{title}</h2>
      {subtitle ? <p className="mt-1 text-sm leading-6 text-foreground/70 dark:text-white/70">{subtitle}</p> : null}
    </div>
  );
}
