"use client";

import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  ListFilter,
  MoreVertical,
  Search,
  Upload,
} from "lucide-react";
import { electionObservers, type AccreditationStatus } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const statusStyles: Record<AccreditationStatus, string> = {
  Accredited: "bg-green-50 text-green-600 border border-green-200",
  Pending: "bg-amber-50 text-amber-600 border border-amber-200",
  Revoked: "bg-red-50 text-red-600 border border-red-200",
};

export default function ElectionObserversPage() {
  const [query, setQuery] = useState("");

  const q = query.trim().toLowerCase();
  const filtered = q
    ? electionObservers.filter((o) =>
        [o.id, o.name, o.organization, o.email, o.state, o.election].some((f) =>
          f.toLowerCase().includes(q)
        )
      )
    : electionObservers;

  return (
    <main className="px-6 py-6 space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Election Observers
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage accredited observer organizations and their representatives.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="flex items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
          >
            Choose state <ChevronDown size={14} className="text-gray-400" />
          </button>
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
            <Upload size={14} className="text-gray-500" /> Export
          </button>
        </div>
      </div>

      <div className="relative w-72">
        <Search
          size={14}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="search"
          className="w-full rounded-full border border-gray-200 bg-white py-2 pl-9 pr-4 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="rounded-xl border border-gray-200 bg-white">
        <table className="w-full">
          <thead className="border-b border-gray-100 bg-gray-50/50">
            <tr>
              {["ID", "Name", "Organization", "State", "Election", "Accreditation", ""].map(
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
            {filtered.map((o) => (
              <tr key={o.id} className="hover:bg-gray-50/50">
                <td className="px-4 py-4 text-sm text-gray-600">{o.id}</td>
                <td className="px-4 py-4">
                  <div className="text-sm font-medium text-gray-900">{o.name}</div>
                  <div className="text-xs text-gray-500">{o.email}</div>
                </td>
                <td className="px-4 py-4 text-sm text-gray-600">
                  {o.organization}
                </td>
                <td className="px-4 py-4 text-sm text-gray-600">{o.state}</td>
                <td className="px-4 py-4 text-sm text-gray-600">{o.election}</td>
                <td className="px-4 py-4">
                  <span
                    className={cn(
                      "inline-block rounded-full px-2.5 py-0.5 text-xs font-medium",
                      statusStyles[o.status]
                    )}
                  >
                    {o.status}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <button
                    type="button"
                    aria-label={`Actions for ${o.name}`}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <MoreVertical size={14} />
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-10 text-center text-sm text-gray-500"
                >
                  No observers match &ldquo;{query}&rdquo;
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="flex items-center justify-between border-t border-gray-100 px-4 py-3">
          <button
            type="button"
            className="flex items-center gap-2 rounded-md border border-gray-200 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50"
          >
            <ArrowLeft size={14} /> Previous
          </button>
          <span className="text-sm text-gray-500">Page 1 of 1</span>
          <button
            type="button"
            className="flex items-center gap-2 rounded-md border border-gray-200 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50"
          >
            Next <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </main>
  );
}
