"use client";

import { useState } from "react";
import { ChevronDown, TrendingDown, TrendingUp, Upload } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { DateRangePicker } from "@/components/dashboard/DateRangePicker";
import {
  advertisementStats,
  adsRankingLines,
  contentTypeDistribution,
  electedRepsStats,
  monthlyReportedPosts,
  postsBreakdownStats,
  reportOverviewStats,
  type ReportStat,
} from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const ranges = ["All time", "12 months", "30 days", "7 days", "24 hours"] as const;

const axisStyle = { fontSize: 11, fill: "#9ca3af" };

function fmt(d: Date) {
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function StatCard({ stat }: { stat: ReportStat }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      <div className="text-sm text-gray-500">{stat.label}</div>
      <div className="mt-2 text-2xl font-semibold text-gray-900">
        {stat.value}
      </div>
      <div
        className={cn(
          "mt-2 flex items-center gap-1 text-xs font-medium",
          stat.up ? "text-green-600" : "text-red-500"
        )}
      >
        {stat.up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
        {stat.change}
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border border-gray-200 bg-white p-4">
      <h2 className="border-b border-gray-100 pb-3 text-sm font-semibold text-gray-900">
        {title}
      </h2>
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  );
}

function ReportedPostsBars() {
  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-900">
        Posts with most reports
      </h3>
      <div className="mt-3 h-64">
        <ResponsiveContainer
          width="100%"
          height="100%"
          initialDimension={{ width: 500, height: 256 }}
        >
          <BarChart
            data={monthlyReportedPosts}
            margin={{ top: 4, right: 8, left: 0, bottom: 8 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
            <XAxis
              dataKey="month"
              tick={axisStyle}
              axisLine={false}
              tickLine={false}
              label={{ value: "Month", position: "insideBottom", offset: -4, fontSize: 11, fill: "#9ca3af" }}
              height={40}
            />
            <YAxis
              tick={axisStyle}
              axisLine={false}
              tickLine={false}
              width={44}
              label={{ value: "Active users", angle: -90, position: "insideLeft", fontSize: 11, fill: "#9ca3af" }}
            />
            <Tooltip />
            <Bar dataKey="texts" stackId="a" fill="#1d4ed8" />
            <Bar dataKey="media" stackId="a" fill="#3b82f6" />
            <Bar dataKey="polls" stackId="a" fill="#93c5fd" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function ContentTypeDonut() {
  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-900">
        Most Active Content Type
      </h3>
      <div className="mt-3 flex h-64 items-center gap-6">
        <div className="h-full min-w-0 flex-1">
          <ResponsiveContainer
            width="100%"
            height="100%"
            initialDimension={{ width: 300, height: 256 }}
          >
            <PieChart>
              <Pie
                data={contentTypeDistribution}
                dataKey="value"
                nameKey="name"
                innerRadius="55%"
                outerRadius="90%"
                paddingAngle={1}
              >
                {contentTypeDistribution.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(v, name) => [`${v}%`, name]} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <ul className="shrink-0 space-y-2">
          {contentTypeDistribution.map((entry) => (
            <li key={entry.name} className="flex items-center gap-2 text-xs text-gray-600">
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              {entry.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function AdsRankingLines() {
  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-900">Ads Ranking</h3>
      <div className="mt-3 h-64">
        <ResponsiveContainer
          width="100%"
          height="100%"
          initialDimension={{ width: 500, height: 256 }}
        >
          <LineChart
            data={adsRankingLines}
            margin={{ top: 4, right: 8, left: 0, bottom: 8 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
            <XAxis
              dataKey="month"
              tick={axisStyle}
              axisLine={false}
              tickLine={false}
              label={{ value: "Month", position: "insideBottom", offset: -4, fontSize: 11, fill: "#9ca3af" }}
              height={40}
            />
            <YAxis
              tick={axisStyle}
              axisLine={false}
              tickLine={false}
              width={44}
              label={{ value: "Active users", angle: -90, position: "insideLeft", fontSize: 11, fill: "#9ca3af" }}
            />
            <Tooltip />
            <Line type="monotone" dataKey="sponsored" stroke="#1d4ed8" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="boosted" stroke="#3b82f6" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="organic" stroke="#93c5fd" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default function ReportPage() {
  const [range, setRange] = useState<(typeof ranges)[number]>("30 days");
  const [dateLabel, setDateLabel] = useState("Select dates");

  return (
    <main className="px-6 py-6 space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Report</h1>
          <p className="mt-1 text-sm text-gray-500">Track all analytics</p>
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

      <Section title="Platform-wide Activity Overview">
        <div className="grid grid-cols-4 gap-4">
          {reportOverviewStats[0].map((s) => (
            <StatCard key={s.label} stat={s} />
          ))}
        </div>
        <div className="grid grid-cols-5 gap-4">
          {reportOverviewStats[1].map((s, i) => (
            <StatCard key={`${s.label}-${i}`} stat={s} />
          ))}
        </div>
      </Section>

      <Section title="Posts Report Breakdown">
        <div className="grid grid-cols-5 gap-4">
          {postsBreakdownStats.map((s) => (
            <StatCard key={s.label} stat={s} />
          ))}
        </div>
        <div className="grid grid-cols-2 gap-6">
          <ReportedPostsBars />
          <ContentTypeDonut />
        </div>
      </Section>

      <Section title="Advertisement Reports">
        <div className="grid grid-cols-4 gap-4">
          {advertisementStats.map((s) => (
            <StatCard key={s.label} stat={s} />
          ))}
        </div>
        <div className="grid grid-cols-2 gap-6">
          <AdsRankingLines />
          <ReportedPostsBars />
        </div>
      </Section>

      <Section title="Elected Reps & Government Data">
        <div className="grid grid-cols-3 gap-4">
          {electedRepsStats.map((s) => (
            <StatCard key={s.label} stat={s} />
          ))}
        </div>
        <div className="grid grid-cols-2 gap-6">
          <ReportedPostsBars />
          <ContentTypeDonut />
        </div>
      </Section>
    </main>
  );
}
