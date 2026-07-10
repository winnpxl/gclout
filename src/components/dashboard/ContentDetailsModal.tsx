"use client";

import { useState } from "react";
import {
  Archive,
  Eye,
  PenLine,
  ShieldAlert,
  Trash2,
  X,
} from "lucide-react";
import type { ContentItem } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const galleryColors = ["bg-gray-800", "bg-gray-900", "bg-gray-800", "bg-slate-800"];

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-gray-200 p-3">
      <div className="text-xs text-gray-500">{label}</div>
      <div className="mt-1 text-lg font-semibold text-gray-900">{value}</div>
    </div>
  );
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-2.5">
      <span className="text-sm text-gray-500">{label}</span>
      <span className="text-sm font-medium text-gray-900">{value}</span>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mt-6 text-sm font-semibold text-gray-900">{children}</h3>
  );
}

interface ContentDetailsModalProps {
  item: ContentItem;
  onClose: () => void;
  onTakedown: (id: string) => void;
  onDelete: (id: string) => void;
}

export function ContentDetailsModal({
  item,
  onClose,
  onTakedown,
  onDelete,
}: ContentDetailsModalProps) {
  const [commenting, setCommenting] = useState(false);
  const [comment, setComment] = useState("");
  const a = item.analytics;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-gray-900/40 p-4 pt-10"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-[88vh] w-full max-w-md flex-col overflow-hidden rounded-2xl bg-white shadow-xl"
      >
        <div className="flex items-center justify-between px-5 py-4">
          <h2 className="text-sm font-semibold text-gray-900">Content details</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={18} />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-5">
          {/* Content preview by post type */}
          {item.kind === "petition" && (
            <>
              <h3 className="text-base font-semibold text-gray-900">
                {item.title}
              </h3>
              <p className="mt-1 text-sm text-gray-500">{item.body}</p>
              {item.hasCover && (
                <div className="mt-4 h-56 w-full rounded-xl bg-gradient-to-br from-gray-700 via-gray-800 to-black" />
              )}
            </>
          )}

          {item.kind === "text" && (
            <p className="text-sm leading-relaxed text-gray-800">{item.body}</p>
          )}

          {item.kind === "media" && (
            <>
              <p className="text-sm leading-relaxed text-gray-800">{item.body}</p>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {Array.from({ length: item.images ?? 0 }).map((_, i) => (
                  <div
                    key={i}
                    className={cn(
                      "h-32 rounded-lg",
                      galleryColors[i % galleryColors.length]
                    )}
                  />
                ))}
              </div>
            </>
          )}

          {item.kind === "poll" && (
            <>
              <p className="text-sm font-medium leading-relaxed text-gray-900">
                {item.body}
              </p>
              <div className="mt-4 space-y-2">
                {item.pollOptions?.map((opt) => (
                  <div
                    key={opt.label}
                    className="relative overflow-hidden rounded-lg border border-gray-200 px-3 py-2.5"
                  >
                    <span
                      className="absolute inset-y-0 left-0 bg-blue-100"
                      style={{ width: `${opt.pct}%` }}
                    />
                    <span className="relative flex items-center justify-between text-sm">
                      <span className="text-gray-800">{opt.label}</span>
                      <span className="text-gray-600">{opt.pct}%</span>
                    </span>
                  </div>
                ))}
              </div>

              <SectionTitle>Poll Analytics</SectionTitle>
              <div className="mt-2 divide-y divide-gray-50">
                <MetaRow label="Total votes" value={item.pollTotalVotes ?? "—"} />
                {item.pollOptions?.map((opt, i) => (
                  <MetaRow
                    key={opt.label}
                    label={`Option ${i + 1} vote count`}
                    value={opt.votes}
                  />
                ))}
              </div>
            </>
          )}

          {/* Post analytics */}
          <SectionTitle>Post analytics</SectionTitle>
          <div className="mt-2 grid grid-cols-3 gap-3">
            <StatCard label="Likes" value={a.likes} />
            <StatCard label="Reposts" value={a.reposts} />
            <StatCard label="Comments" value={a.comments} />
            <StatCard label="Shares (external)" value={a.shares} />
            <StatCard label="Details expanded" value={a.detailsExpanded} />
            <StatCard label="Signatures" value={a.signatures} />
          </div>

          {/* Metadata */}
          <SectionTitle>Metadata</SectionTitle>
          <div className="mt-2 divide-y divide-gray-50">
            <MetaRow label="User" value={item.author} />
            <MetaRow label="Post type" value={item.type} />
            <MetaRow label="Submitted on" value={item.submittedOn} />
          </div>

          {/* Reports */}
          <SectionTitle>Reports</SectionTitle>
          {item.reports.length === 0 ? (
            <p className="mt-1 text-sm italic text-gray-400">No reports</p>
          ) : (
            <div className="mt-2 space-y-2">
              {item.reports.map((r, i) => (
                <div
                  key={i}
                  className="flex items-start justify-between text-sm text-gray-600"
                >
                  <span>
                    {r.reporter} <span className="font-semibold">reported</span>{" "}
                    this post for {r.reason}
                  </span>
                  <span className="shrink-0 pl-3 text-xs text-gray-400">
                    {r.date}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Moderation history */}
          <div className="mt-6 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-900">
              Moderation history
            </h3>
            <button
              type="button"
              onClick={() => setCommenting((v) => !v)}
              className="flex items-center gap-1.5 rounded-lg bg-gray-100 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-200"
            >
              <PenLine size={13} /> Moderation comment
            </button>
          </div>
          {commenting ? (
            <div className="mt-2">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={2}
                placeholder="Add a moderation note..."
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          ) : (
            <p className="mt-1 text-sm italic text-gray-400">
              No item to display
            </p>
          )}

          {/* Actions */}
          <h3 className="mt-6 border-t border-gray-100 pt-4 text-sm font-semibold text-gray-900">
            Actions
          </h3>
          <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-3">
            <button
              type="button"
              className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900"
            >
              <Eye size={15} /> View appeal
            </button>
            <button
              type="button"
              onClick={() => onTakedown(item.id)}
              className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900"
            >
              <Archive size={15} /> Takedown post
            </button>
            <button
              type="button"
              className="flex items-center gap-2 text-sm font-medium text-amber-600 hover:text-amber-700"
            >
              <ShieldAlert size={15} /> Send warning
            </button>
            <button
              type="button"
              onClick={() => onDelete(item.id)}
              className="flex items-center gap-2 text-sm font-medium text-red-600 hover:text-red-700"
            >
              <Trash2 size={15} /> Delete permanently
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
