import { ArrowLeft, ArrowRight, MoreVertical } from "lucide-react";
import {
  awaitingReview,
  topCampaigns,
  type CampaignStatus,
  type ReviewPriority,
  type ReviewStatus,
} from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const statusStyles: Record<ReviewStatus | CampaignStatus, string> = {
  Escalated: "bg-red-50 text-red-600",
  "Under review": "bg-blue-50 text-primary",
  Pending: "bg-amber-50 text-amber-600",
  Active: "bg-green-50 text-green-600",
  Completed: "bg-gray-100 text-gray-600",
};

const priorityStyles: Record<ReviewPriority, string> = {
  High: "bg-red-50 text-red-600",
  Medium: "bg-amber-50 text-amber-600",
  Low: "bg-gray-100 text-gray-600",
};

function Pill({ text, className }: { text: string; className: string }) {
  return (
    <span
      className={cn(
        "inline-block rounded-full px-2.5 py-0.5 text-xs font-medium",
        className
      )}
    >
      {text}
    </span>
  );
}

function Pagination() {
  return (
    <div className="flex items-center justify-between px-4 py-3">
      <button
        type="button"
        className="flex items-center gap-2 rounded-md border border-gray-200 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50"
      >
        <ArrowLeft size={14} /> Previous
      </button>
      <div className="flex items-center gap-1 text-sm">
        {[1, 2, 3].map((n) => (
          <button
            key={n}
            type="button"
            className={cn(
              "h-8 w-8 rounded-md",
              n === 1
                ? "bg-blue-50 text-primary font-medium"
                : "text-gray-600 hover:bg-gray-50"
            )}
          >
            {n}
          </button>
        ))}
        <span className="px-1 text-gray-400">…</span>
        {[8, 9, 10].map((n) => (
          <button
            key={n}
            type="button"
            className="h-8 w-8 rounded-md text-gray-600 hover:bg-gray-50"
          >
            {n}
          </button>
        ))}
      </div>
      <button
        type="button"
        className="flex items-center gap-2 rounded-md border border-gray-200 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50"
      >
        Next <ArrowRight size={14} />
      </button>
    </div>
  );
}

const th = "px-4 py-3 text-left text-xs font-medium text-gray-500";
const td = "px-4 py-3 text-sm text-gray-700";

export function AwaitingReviewTable() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white">
      <h3 className="px-4 pt-4 pb-2 text-sm font-semibold text-gray-900">
        Awaiting Review
      </h3>
      <table className="w-full">
        <thead className="border-y border-gray-100">
          <tr>
            <th className={th}>ID</th>
            <th className={th}>Author</th>
            <th className={th}>Type</th>
            <th className={th}>Reason</th>
            <th className={th}>Status</th>
            <th className={th}>Priority</th>
            <th className={th}>Timestamp</th>
            <th className={th} />
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {awaitingReview.map((row) => (
            <tr key={row.id}>
              <td className={td}>{row.id}</td>
              <td className={td}>{row.author}</td>
              <td className={td}>
                <Pill text={row.type} className="bg-gray-100 text-gray-600" />
              </td>
              <td className={td}>{row.reason}</td>
              <td className={td}>
                <Pill text={row.status} className={statusStyles[row.status]} />
              </td>
              <td className={td}>
                <Pill text={row.priority} className={priorityStyles[row.priority]} />
              </td>
              <td className={td}>{row.timestamp}</td>
              <td className={td}>
                <button type="button" aria-label={`Actions for ${row.id}`} className="text-gray-400 hover:text-gray-600">
                  <MoreVertical size={14} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination />
    </div>
  );
}

export function TopCampaignsTable() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white">
      <h3 className="px-4 pt-4 pb-2 text-sm font-semibold text-gray-900">
        Top Performing Campaigns
      </h3>
      <table className="w-full">
        <thead className="border-y border-gray-100">
          <tr>
            <th className={th}>Campaign</th>
            <th className={th}>Type</th>
            <th className={th}>Status</th>
            <th className={th}>Reach</th>
            <th className={th}>Engagement</th>
            <th className={th}>Clicks</th>
            <th className={th}>ROI</th>
            <th className={th} />
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {topCampaigns.map((row) => (
            <tr key={row.campaign}>
              <td className={td}>{row.campaign}</td>
              <td className={td}>
                <Pill text={row.type} className="bg-gray-100 text-gray-600" />
              </td>
              <td className={td}>
                <Pill text={row.status} className={statusStyles[row.status]} />
              </td>
              <td className={td}>{row.reach}</td>
              <td className={td}>
                <div className="text-xs text-gray-700">{row.engagement}%</div>
                <div className="mt-1 h-1 w-20 rounded-full bg-gray-100">
                  <div
                    className="h-1 rounded-full bg-primary"
                    style={{ width: `${Math.min(row.engagement * 5, 100)}%` }}
                  />
                </div>
              </td>
              <td className={td}>{row.clicks}</td>
              <td className={td}>{row.roi}</td>
              <td className={td}>
                <button type="button" aria-label={`Actions for ${row.campaign}`} className="text-gray-400 hover:text-gray-600">
                  <MoreVertical size={14} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination />
    </div>
  );
}
