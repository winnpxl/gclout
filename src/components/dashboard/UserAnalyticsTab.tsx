"use client";

import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { BadgeCheck, MessageCircle, Share, ThumbsUp, Upload } from "lucide-react";
import { DateRangePicker } from "@/components/dashboard/DateRangePicker";
import { userAnalytics } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const ranges = ["12 months", "30 days", "7 days", "24 hours"] as const;

function fmt(d: Date) {
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

interface AuthorInfo {
  name: string;
  title: string;
  avatar?: string;
}

export function UserAnalyticsTab({ author }: { author: AuthorInfo }) {
  const [range, setRange] = useState<(typeof ranges)[number]>("30 days");
  const [dateLabel, setDateLabel] = useState("Select dates");

  const { stats, dailyActivity, governance, topContent, security } =
    userAnalytics;

  return (
    <div className="mt-6 space-y-4">
      <div className="flex items-center justify-end gap-2">
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
        <button
          type="button"
          className="flex items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
        >
          <Upload size={14} className="text-gray-500" /> Export
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-xl border border-gray-200 bg-white p-4"
          >
            <div className="text-sm text-gray-500">{s.label}</div>
            <div className="mt-2 text-2xl font-semibold text-gray-900">
              {s.value}
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-4">
        <h3 className="text-base font-semibold text-gray-900">
          Daily Activity Pattern
        </h3>
        <div className="mt-4 h-64">
          <ResponsiveContainer
            width="100%"
            height="100%"
            initialDimension={{ width: 900, height: 256 }}
          >
            <BarChart
              data={dailyActivity}
              margin={{ top: 4, right: 8, left: 0, bottom: 8 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis
                dataKey="day"
                tick={{ fontSize: 11, fill: "#9ca3af" }}
                axisLine={false}
                tickLine={false}
                label={{ value: "Days", position: "insideBottom", offset: -4, fontSize: 11, fill: "#9ca3af" }}
                height={40}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "#9ca3af" }}
                axisLine={false}
                tickLine={false}
                width={40}
                domain={[0, 24]}
                ticks={[0, 2, 4, 8, 16, 24]}
                label={{ value: "Hours per day", angle: -90, position: "insideLeft", fontSize: 11, fill: "#9ca3af" }}
              />
              <Tooltip formatter={(v) => [`${v} hrs`, "Active"]} />
              <Bar dataKey="hours" fill="#3b82f6" radius={[3, 3, 0, 0]} barSize={110} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3">
        <section className="rounded-xl border border-gray-200 bg-white p-5 lg:col-span-2">
          <h3 className="text-base font-semibold text-gray-900">
            Governance Participation
          </h3>
          <div className="mt-4 grid grid-cols-3 gap-4">
            {governance.map((g) => (
              <div
                key={g.label}
                className="rounded-xl border border-gray-200 p-4"
              >
                <div className="text-sm text-gray-500">{g.label}</div>
                <div className="mt-2 text-2xl font-semibold text-gray-900">
                  {g.value}
                </div>
              </div>
            ))}
          </div>

          <h4 className="mt-6 text-sm font-semibold text-gray-900">
            Top Performing Content
          </h4>
          <div className="mt-3 rounded-xl bg-blue-50 p-4">
            <div className="text-sm font-medium text-gray-900">
              {topContent.format}
            </div>
            <div className="text-xs text-gray-500">
              {topContent.interactions} interactions
            </div>
            <div className="mt-3 rounded-xl bg-white p-4">
              <div className="flex items-center gap-3">
                {author.avatar ? (
                  <div className="h-9 w-9 shrink-0 overflow-hidden rounded-full">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={author.avatar}
                      alt={author.name}
                      className="h-full w-full origin-top scale-[1.15] object-cover object-top"
                    />
                  </div>
                ) : (
                  <span className="h-9 w-9 shrink-0 rounded-full bg-gradient-to-br from-pink-300 via-fuchsia-300 to-blue-300" />
                )}
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-semibold text-gray-900">
                      {author.name}
                    </span>
                    <BadgeCheck size={15} className="fill-primary text-white" />
                  </div>
                  <div className="text-xs text-gray-500">{author.title}</div>
                </div>
              </div>
              <p className="mt-3 text-sm text-gray-700">{topContent.text}</p>
              <div className="mt-3 flex items-center gap-6 text-sm text-gray-500">
                <span className="flex items-center gap-1.5">
                  <ThumbsUp size={14} /> 0
                </span>
                <span className="flex items-center gap-1.5">
                  <MessageCircle size={14} /> 0
                </span>
                <span className="flex items-center gap-1.5">
                  <Share size={14} /> 0
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-xl border border-gray-200 bg-white p-5">
          <h3 className="text-base font-semibold text-gray-900">
            Security Status
          </h3>
          <div className="mt-2 divide-y divide-gray-50">
            <div className="flex items-center justify-between py-3">
              <span className="text-sm text-gray-600">Successful Logins</span>
              <span className="text-sm font-semibold text-green-600">
                {security.successfulLogins}
              </span>
            </div>
            <div className="flex items-center justify-between py-3">
              <span className="text-sm text-gray-600">Failed Attempts</span>
              <span className="text-sm font-semibold text-red-500">
                {security.failedAttempts}
              </span>
            </div>
            <div className="flex items-center justify-between py-3">
              <span className="text-sm text-gray-600">Last Login</span>
              <span className="text-sm text-gray-700">{security.lastLogin}</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
