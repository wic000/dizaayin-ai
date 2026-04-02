import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type Template = {
  id: string;
  title: string;
  description: string;
  category: string;
  style: string;
  ratio: string;
};

export function TemplateCard({ template, onUse }: { template: Template; onUse?: (id: string) => void }) {
  return (
    <Card className="space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <Badge>{template.category}</Badge>
          <h3 className="mt-2 text-base font-bold">{template.title}</h3>
        </div>
        <Badge className="bg-brand-gold/25 text-brand-ink">{template.ratio}</Badge>
      </div>
      <p className="text-sm leading-6 text-foreground/72 dark:text-white/72">{template.description}</p>
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-foreground/55 dark:text-white/55">{template.style}</p>
        {onUse ? (
          <Button size="sm" type="button" onClick={() => onUse(template.id)}>
            Use
          </Button>
        ) : null}
      </div>
    </Card>
  );
}
