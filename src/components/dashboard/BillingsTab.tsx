"use client";

import { useState } from "react";
import {
  Check,
  ListFilter,
  MoreVertical,
  RefreshCw,
  Search,
  Upload,
} from "lucide-react";
import {
  billingRecords,
  type BillingPaymentStatus,
  type BillingReviewStatus,
} from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const reviewStyles: Record<BillingReviewStatus, string> = {
  Approved: "bg-green-50 text-green-600 border border-green-200",
  Pending: "bg-amber-50 text-amber-600 border border-amber-200",
  Rejected: "bg-red-50 text-red-500 border border-red-200",
};

function PaymentPill({ status }: { status: BillingPaymentStatus }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium",
        status === "Paid"
          ? "bg-green-50 text-green-600 border border-green-200"
          : "bg-gray-100 text-gray-600 border border-gray-200"
      )}
    >
      {status === "Paid" ? <Check size={11} /> : <RefreshCw size={11} />}
      {status}
    </span>
  );
}

export function BillingsTab() {
  const [query, setQuery] = useState("");

  const q = query.trim().toLowerCase();
  const rows = q
    ? billingRecords.filter((r) =>
        [r.id, r.contentType, r.duration, r.amount, r.reviewStatus, r.paymentStatus, r.date].some(
          (f) => f.toLowerCase().includes(q)
        )
      )
    : billingRecords;

  return (
    <div className="mt-6 rounded-xl border border-gray-200 bg-white p-5">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-base font-semibold text-gray-900">
            Billing management
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Manage the billing and payment details of this user.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="search"
              className="w-56 rounded-full border border-gray-200 bg-white py-2 pl-9 pr-4 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <button
            type="button"
            className="flex items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
          >
            Filter <ListFilter size={14} className="text-gray-500" />
          </button>
          <button
            type="button"
            className="flex items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
          >
            <Upload size={14} className="text-gray-500" /> Export all
          </button>
        </div>
      </div>

      <table className="mt-4 w-full">
        <thead className="border-y border-gray-100 bg-gray-50/50">
          <tr>
            <th className="w-10 px-4 py-3">
              <input
                type="checkbox"
                aria-label="Select all billing records"
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
            </th>
            {["ID", "Content Type", "Campaign Duration", "Amount", "Review Status", "Status", "Date", ""].map(
              (h, i) => (
                <th
                  key={i}
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500"
                >
                  {h}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {rows.map((r, i) => (
            <tr key={`${r.id}-${i}`} className="hover:bg-gray-50/50">
              <td className="px-4 py-4">
                <input
                  type="checkbox"
                  aria-label={`Select ${r.id}`}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
              </td>
              <td className="px-4 py-4 text-sm font-medium text-gray-900">
                {r.id}
              </td>
              <td className="px-4 py-4 text-sm text-gray-600">{r.contentType}</td>
              <td className="px-4 py-4 text-sm text-gray-600">{r.duration}</td>
              <td className="px-4 py-4 text-sm text-gray-600">{r.amount}</td>
              <td className="px-4 py-4">
                <span
                  className={cn(
                    "inline-block rounded-full px-2.5 py-0.5 text-xs font-medium",
                    reviewStyles[r.reviewStatus]
                  )}
                >
                  {r.reviewStatus}
                </span>
              </td>
              <td className="px-4 py-4">
                <PaymentPill status={r.paymentStatus} />
              </td>
              <td className="px-4 py-4 text-sm text-gray-600">{r.date}</td>
              <td className="px-4 py-4">
                <button
                  type="button"
                  aria-label={`Actions for ${r.id}`}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <MoreVertical size={14} />
                </button>
              </td>
            </tr>
          ))}
          {rows.length === 0 && (
            <tr>
              <td
                colSpan={9}
                className="px-4 py-10 text-center text-sm text-gray-500"
              >
                No billing records match &ldquo;{query}&rdquo;
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
