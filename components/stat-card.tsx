import { Card } from "@/components/ui/card";

export function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <Card className="space-y-1">
      <p className="text-xs uppercase tracking-[0.16em] text-foreground/55 dark:text-white/55">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
    </Card>
  );
}
