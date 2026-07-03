import { Users, FileText, BadgeCheck, BarChart3, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

const icons = {
  users: Users,
  file: FileText,
  check: BadgeCheck,
  chart: BarChart3,
} as const;

interface StatCardProps {
  label: string;
  value: string;
  change: string;
  up: boolean;
  icon: keyof typeof icons;
}

export function StatCard({ label, value, change, up, icon }: StatCardProps) {
  const Icon = icons[icon];
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      <div className="text-sm text-gray-500">{label}</div>
      <div className="mt-2 flex items-center justify-between">
        <span className="text-2xl font-semibold text-gray-900">{value}</span>
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-primary">
          <Icon size={16} />
        </span>
      </div>
      <div
        className={cn(
          "mt-2 flex items-center gap-1 text-xs font-medium",
          up ? "text-green-600" : "text-red-500"
        )}
      >
        {up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
        {change}
      </div>
    </div>
  );
}
