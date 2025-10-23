import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  icon?: LucideIcon;
}

export function StatCard({ label, value, icon: Icon }: StatCardProps) {
  return (
    <Card 
      className="p-6 border-none"
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      <div className="space-y-2">
        {Icon && <Icon className="h-5 w-5 text-primary" />}
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-3xl font-bold">{value}</p>
      </div>
    </Card>
  );
}
