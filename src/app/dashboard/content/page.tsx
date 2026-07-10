"use client";

import { useState } from "react";
import { ListFilter, Search } from "lucide-react";
import { ContentDetailsModal } from "@/components/dashboard/ContentDetailsModal";
import { contentItems, type ContentItem } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const statusStyles: Record<string, string> = {
  Active: "bg-green-50 text-green-600 border border-green-200",
  "Under review": "bg-amber-50 text-amber-600 border border-amber-200",
  Closed: "bg-gray-100 text-gray-600 border border-gray-200",
};

function SearchBar({
  query,
  onChange,
  className,
}: {
  query: string;
  onChange: (v: string) => void;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="relative flex-1">
        <Search
          size={14}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="search"
          value={query}
          onChange={(e) => onChange(e.target.value)}
          placeholder="search"
          className="w-full rounded-full border border-gray-200 bg-white py-2 pl-9 pr-4 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <button
        type="button"
        className="flex items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
      >
        Filter <ListFilter size={14} className="text-gray-500" />
      </button>
    </div>
  );
}

export default function ContentManagementPage() {
  const [query, setQuery] = useState("");
  const [items, setItems] = useState(contentItems);
  const [selected, setSelected] = useState<ContentItem | null>(null);

  const q = query.trim().toLowerCase();
  // Tolerate simple plurals: "petitions" should match "Petition".
  const term = q.replace(/s$/, "");
  const results = q
    ? items.filter((r) =>
        [r.title, r.description, r.author, r.type, r.id, r.keywords].some((f) =>
          f.toLowerCase().includes(term)
        )
      )
    : [];

  return (
    <main className="px-6 py-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Content Management
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Search and moderate user-generated content, petitions, ads, and more.
        </p>
      </div>

      {!q ? (
        <div className="flex flex-col items-center pt-24">
          <p className="text-sm text-gray-500">
            Start by searching for a post/petition
          </p>
          <SearchBar
            query={query}
            onChange={setQuery}
            className="mt-4 w-full max-w-xl"
          />
        </div>
      ) : (
        <>
          <SearchBar query={query} onChange={setQuery} className="max-w-xl" />

          <h2 className="text-sm font-medium text-gray-700">
            &lsquo;{query}&rsquo; search result
          </h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {results.map((r) => (
              <div
                key={r.id}
                className="flex flex-col rounded-xl border border-gray-200 bg-white p-4"
              >
                <h3 className="text-sm font-semibold text-gray-900">
                  {r.title}
                </h3>
                <p className="mt-1 text-xs text-gray-500">{r.description}</p>

                <div className="mt-3 flex-1 divide-y divide-gray-50 rounded-lg bg-gray-50 px-3">
                  <div className="flex items-center justify-between py-2">
                    <span className="text-xs text-gray-500">User</span>
                    <span className="text-xs font-medium text-gray-900">
                      {r.author}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-xs text-gray-500">Type</span>
                    <span className="text-xs font-medium text-gray-900">
                      {r.type}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-xs text-gray-500">
                      {r.metricLabel}
                    </span>
                    <span className="text-xs font-medium text-gray-900">
                      {r.metricValue}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-xs text-gray-500">Status</span>
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 text-xs font-medium",
                        statusStyles[r.status]
                      )}
                    >
                      {r.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-xs text-gray-500">Date created</span>
                    <span className="text-xs font-medium text-gray-900">
                      {r.date}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelected(r)}
                  className="mt-4 w-full rounded-lg bg-primary py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                  Manage content
                </button>
              </div>
            ))}
          </div>

          {results.length === 0 && (
            <div className="rounded-xl border border-gray-200 bg-white py-16 text-center text-sm text-gray-500">
              No content matches &ldquo;{query}&rdquo;
            </div>
          )}
        </>
      )}

      {selected && (
        <ContentDetailsModal
          item={selected}
          onClose={() => setSelected(null)}
          onTakedown={(id) => {
            setItems((prev) =>
              prev.map((i) =>
                i.id === id ? { ...i, status: "Closed" as const } : i
              )
            );
            setSelected(null);
          }}
          onDelete={(id) => {
            setItems((prev) => prev.filter((i) => i.id !== id));
            setSelected(null);
          }}
        />
      )}
    </main>
  );
}
