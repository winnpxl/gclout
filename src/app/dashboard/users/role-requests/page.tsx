"use client";

import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ListFilter,
  Search,
  Upload,
  X,
} from "lucide-react";
import { RejectApplicationModal } from "@/components/dashboard/modals";
import { roleChangeRequests, type RequestStatus } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const statusStyles: Record<RequestStatus, string> = {
  Pending: "bg-amber-50 text-amber-600 border border-amber-200",
  Approved: "bg-green-50 text-green-600 border border-green-200",
  Rejected: "bg-red-50 text-red-600 border border-red-200",
};

export default function RoleChangeRequestsPage() {
  const [query, setQuery] = useState("");
  const [requests, setRequests] = useState(roleChangeRequests);
  const [rejecting, setRejecting] = useState<{ id: string; name: string } | null>(
    null
  );

  const q = query.trim().toLowerCase();
  const filtered = q
    ? requests.filter((r) =>
        [r.id, r.name, r.email, r.currentRole, r.requestedRole, r.reason].some(
          (f) => f.toLowerCase().includes(q)
        )
      )
    : requests;

  function setStatus(id: string, status: RequestStatus) {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );
  }

  return (
    <main className="px-6 py-6 space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Role Change Requests
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Review and approve requests from users to change their account role.
          </p>
        </div>
        <div className="flex items-center gap-2">
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
              {["ID", "Name", "Current Role", "Requested Role", "Reason", "Date", "Status", "Actions"].map(
                (h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500"
                  >
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map((r) => (
              <tr key={r.id} className="hover:bg-gray-50/50">
                <td className="px-4 py-4 text-sm text-gray-600">{r.id}</td>
                <td className="px-4 py-4">
                  <div className="text-sm font-medium text-gray-900">{r.name}</div>
                  <div className="text-xs text-gray-500">{r.email}</div>
                </td>
                <td className="px-4 py-4 text-sm text-gray-600">{r.currentRole}</td>
                <td className="px-4 py-4 text-sm font-medium text-gray-900">
                  {r.requestedRole}
                </td>
                <td className="max-w-56 px-4 py-4 text-sm text-gray-600">
                  {r.reason}
                </td>
                <td className="px-4 py-4 text-sm text-gray-600">{r.date}</td>
                <td className="px-4 py-4">
                  <span
                    className={cn(
                      "inline-block rounded-full px-2.5 py-0.5 text-xs font-medium",
                      statusStyles[r.status]
                    )}
                  >
                    {r.status}
                  </span>
                </td>
                <td className="px-4 py-4">
                  {r.status === "Pending" ? (
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setStatus(r.id, "Approved")}
                        aria-label={`Approve ${r.id}`}
                        className="flex h-7 w-7 items-center justify-center rounded-md border border-green-200 bg-green-50 text-green-600 hover:bg-green-100"
                      >
                        <Check size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={() => setRejecting({ id: r.id, name: r.name })}
                        aria-label={`Reject ${r.id}`}
                        className="flex h-7 w-7 items-center justify-center rounded-md border border-red-200 bg-red-50 text-red-500 hover:bg-red-100"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ) : (
                    <span className="text-xs text-gray-400">—</span>
                  )}
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan={8}
                  className="px-4 py-10 text-center text-sm text-gray-500"
                >
                  No requests match &ldquo;{query}&rdquo;
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

      {rejecting && (
        <RejectApplicationModal
          applicantName={rejecting.name}
          onClose={() => setRejecting(null)}
          onConfirm={() => {
            setStatus(rejecting.id, "Rejected");
            setRejecting(null);
          }}
        />
      )}
    </main>
  );
}
