"use client";

import { useState } from "react";
import { ChevronDown, Upload } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { UserGrowthChart, ContentDistributionChart } from "@/components/dashboard/charts";
import { AwaitingReviewTable, TopCampaignsTable } from "@/components/dashboard/tables";
import { DateRangePicker } from "@/components/dashboard/DateRangePicker";
import { stats } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const ranges = ["12 months", "30 days", "7 days", "24 hours"] as const;

function fmt(d: Date) {
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function DashboardPage() {
  const [range, setRange] = useState<(typeof ranges)[number]>("30 days");
  const [dateLabel, setDateLabel] = useState("Select dates");

  return (
    <main className="px-6 py-6 space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Overview</h1>
          <p className="mt-1 text-sm text-gray-500">
            Measure your advertising ROI and track and report website traffic.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="flex items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
          >
            Choose country <ChevronDown size={14} className="text-gray-400" />
          </button>
          <button
            type="button"
            className="flex items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
          >
            <Upload size={14} className="text-gray-500" /> Export
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="inline-flex rounded-md border border-gray-200 bg-white">
          {ranges.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRange(r)}
              className={cn(
                "px-3 py-1.5 text-sm border-r border-gray-200 last:border-r-0",
                range === r
                  ? "bg-gray-50 font-medium text-gray-900"
                  : "text-gray-600 hover:bg-gray-50"
              )}
            >
              {r}
            </button>
          ))}
        </div>
        <DateRangePicker
          label={dateLabel}
          onApply={(s, e) => setDateLabel(`${fmt(s)} – ${fmt(e)}`)}
        />
      </div>

      <div className="grid grid-cols-4 gap-4">
        {stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <UserGrowthChart />
        <ContentDistributionChart />
      </div>

      <AwaitingReviewTable />
      <TopCampaignsTable />
    </main>
  );
}
