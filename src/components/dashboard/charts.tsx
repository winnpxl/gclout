"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { contentDistribution, userGrowth } from "@/lib/mock-data";

const axisStyle = { fontSize: 11, fill: "#9ca3af" };

function formatUsers(v: number) {
  return v === 0 ? "0" : `${Math.round(v / 1000)}k`;
}

export function UserGrowthChart() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      <h3 className="text-sm font-semibold text-gray-900">User Growth</h3>
      <p className="text-xs text-gray-500">Total registered users over time</p>
      <div className="mt-4 h-56">
        <ResponsiveContainer
          width="100%"
          height="100%"
          initialDimension={{ width: 450, height: 224 }}
        >
          <AreaChart data={userGrowth} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="growthFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2563eb" stopOpacity={0.25} />
                <stop offset="100%" stopColor="#2563eb" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
            <XAxis
              dataKey="month"
              tick={axisStyle}
              axisLine={false}
              tickLine={false}
              label={{ value: "Month", position: "insideBottom", offset: -2, fontSize: 11, fill: "#9ca3af" }}
              height={40}
            />
            <YAxis
              tick={axisStyle}
              axisLine={false}
              tickLine={false}
              tickFormatter={formatUsers}
              width={40}
              label={{ value: "Active users", angle: -90, position: "insideLeft", fontSize: 11, fill: "#9ca3af" }}
            />
            <Tooltip formatter={(v) => [Number(v).toLocaleString(), "Users"]} />
            <Area
              type="monotone"
              dataKey="users"
              stroke="#2563eb"
              strokeWidth={2}
              fill="url(#growthFill)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function ContentDistributionChart() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      <h3 className="text-sm font-semibold text-gray-900">Content Distribution</h3>
      <p className="text-xs text-gray-500">Chronicles by category</p>
      <div className="mt-4 h-56">
        <ResponsiveContainer
          width="100%"
          height="100%"
          initialDimension={{ width: 450, height: 224 }}
        >
          <BarChart
            data={contentDistribution}
            margin={{ top: 4, right: 8, left: 0, bottom: 8 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
            <XAxis
              dataKey="category"
              tick={{ ...axisStyle, fontSize: 10 }}
              axisLine={false}
              tickLine={false}
              angle={-35}
              textAnchor="end"
              height={50}
              interval={0}
            />
            <YAxis tick={axisStyle} axisLine={false} tickLine={false} width={40} />
            <Tooltip formatter={(v) => [v, "Chronicles"]} />
            <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={28} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
