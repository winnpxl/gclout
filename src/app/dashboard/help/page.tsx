"use client";

import { useState } from "react";
import {
  AlertOctagon,
  ArrowRight,
  BookOpen,
  ChevronDown,
  ListFilter,
  MoreVertical,
  Puzzle,
  Search,
  ShieldCheck,
  X,
} from "lucide-react";
import { helpCategories, type HelpCategory } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const categoryIcons: Record<string, React.ReactNode> = {
  "user-guidelines": <BookOpen size={16} />,
  "content-moderation": <ShieldCheck size={16} />,
  "account-security": <Puzzle size={16} />,
};

/* ------------------------------ Delete nugget ----------------------------- */

function DeleteNuggetModal({
  title,
  onClose,
  onDelete,
}: {
  title: string;
  onClose: () => void;
  onDelete: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-xl"
      >
        <div className="flex items-start justify-between">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50">
            <AlertOctagon size={18} className="text-red-500" />
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={18} />
          </button>
        </div>
        <h2 className="mt-3 text-base font-semibold text-gray-900">
          Delete nugget?
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Are you sure you want to permanently delete this nugget? This will
          erase &ldquo;{title}&rdquo; from Gclout totally, confirm your action?
        </p>
        <div className="mt-5 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onDelete}
            className="rounded-lg bg-red-600 px-5 py-2 text-sm font-medium text-white hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------ Create nugget ----------------------------- */

function CreateNuggetModal({
  categories,
  initialCategory,
  onClose,
  onCreate,
}: {
  categories: HelpCategory[];
  initialCategory?: string;
  onClose: () => void;
  onCreate: (categoryId: string, title: string) => void;
}) {
  const [categoryId, setCategoryId] = useState(
    initialCategory ?? categories[0]?.id ?? ""
  );
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const canCreate = title.trim().length > 0 && categoryId;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-2xl bg-white p-5 shadow-xl"
      >
        <div className="flex items-start justify-between">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600">
            <Puzzle size={17} />
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={18} />
          </button>
        </div>
        <h2 className="mt-3 text-base font-semibold text-gray-900">
          Create nugget?
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Please provide details for a new nugget to be featured on the help
          center page.
        </p>

        <div className="mt-5 space-y-4">
          <div>
            <label htmlFor="nugget-category" className="mb-1.5 block text-sm text-gray-700">
              Category
            </label>
            <div className="relative">
              <select
                id="nugget-category"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full appearance-none rounded-lg border border-gray-300 px-3 py-2.5 pr-9 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.title}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={16}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
            </div>
          </div>

          <div>
            <label htmlFor="nugget-title" className="mb-1.5 block text-sm text-gray-700">
              Title
            </label>
            <input
              id="nugget-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What can users do?"
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label htmlFor="nugget-description" className="mb-1.5 block text-sm text-gray-700">
              Description
            </label>
            <textarea
              id="nugget-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="nugget summary..."
              rows={5}
              className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={!canCreate}
            onClick={() => {
              if (canCreate) onCreate(categoryId, title.trim());
            }}
            className={cn(
              "rounded-lg px-4 py-2.5 text-sm font-medium text-white",
              canCreate
                ? "bg-primary hover:bg-blue-700"
                : "bg-blue-300 cursor-not-allowed"
            )}
          >
            Create new
          </button>
        </div>
      </div>
    </div>
  );
}

/* --------------------------------- Page ----------------------------------- */

export default function HelpPage() {
  const [categories, setCategories] = useState(helpCategories);
  const [query, setQuery] = useState("");
  const [menuFor, setMenuFor] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<HelpCategory | null>(null);
  const [creating, setCreating] = useState<{ category?: string } | null>(null);

  const q = query.trim().toLowerCase();
  const visible = q
    ? categories
        .map((c) => ({
          ...c,
          articles: c.articles.filter((a) => a.toLowerCase().includes(q)),
        }))
        .filter(
          (c) =>
            c.title.toLowerCase().includes(q) ||
            c.description.toLowerCase().includes(q) ||
            c.articles.length > 0
        )
    : categories;

  return (
    <main className="px-6 py-6" onClick={() => setMenuFor(null)}>
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Help Center</h1>
        <p className="mt-1 text-sm text-gray-500">
          Create the help needed to effectively manage your platform
        </p>
      </div>

      <div className="mt-10 text-center text-sm text-gray-600">
        Start by searching for an article or post
      </div>
      <div className="mx-auto mt-3 flex max-w-2xl items-center gap-2">
        <div className="relative flex-1">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
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
        <button
          type="button"
          onClick={() => setCreating({})}
          className="shrink-0 rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700"
        >
          Create nugget
        </button>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-3">
        {visible.map((c) => (
          <div
            key={c.id}
            className="flex flex-col rounded-xl border border-gray-200 bg-white p-5"
          >
            <div className="flex items-start justify-between">
              <span
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-full",
                  c.iconBg
                )}
              >
                {categoryIcons[c.id] ?? <BookOpen size={16} />}
              </span>
              <div className="relative">
                <button
                  type="button"
                  aria-label={`Options for ${c.title}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setMenuFor(menuFor === c.id ? null : c.id);
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <MoreVertical size={15} />
                </button>
                {menuFor === c.id && (
                  <div
                    className="absolute right-0 z-10 mt-1 w-40 rounded-lg border border-gray-200 bg-white py-1 shadow-lg"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      type="button"
                      onClick={() => {
                        setMenuFor(null);
                        setCreating({ category: c.id });
                      }}
                      className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
                    >
                      Add article
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setMenuFor(null);
                        setDeleting(c);
                      }}
                      className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                    >
                      Delete nugget
                    </button>
                  </div>
                )}
              </div>
            </div>

            <h2 className="mt-3 text-sm font-semibold text-gray-900">
              {c.title}
            </h2>
            <p className="mt-1 text-xs leading-relaxed text-gray-500">
              {c.description}
            </p>
            <span className="mt-3 inline-block w-fit rounded-full bg-gray-100 px-2.5 py-0.5 text-xs text-gray-600">
              {c.articles.length} article{c.articles.length === 1 ? "" : "s"}
            </span>

            <div className="mt-3 flex-1 divide-y divide-gray-50">
              {c.articles.map((a) => (
                <button
                  key={a}
                  type="button"
                  className="flex w-full items-center justify-between py-2.5 text-left text-sm text-gray-700 hover:text-primary"
                >
                  {a}
                  <ArrowRight size={13} className="shrink-0 text-gray-400" />
                </button>
              ))}
              {c.articles.length === 0 && (
                <p className="py-3 text-sm italic text-gray-400">
                  No articles match your search.
                </p>
              )}
            </div>

            <button
              type="button"
              className="mt-4 w-full rounded-lg border border-gray-200 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              View all articles
            </button>
          </div>
        ))}
      </div>

      {visible.length === 0 && (
        <div className="mt-10 rounded-xl border border-gray-200 bg-white py-16 text-center text-sm text-gray-500">
          Nothing matches &ldquo;{query}&rdquo;
        </div>
      )}

      {deleting && (
        <DeleteNuggetModal
          title={deleting.title}
          onClose={() => setDeleting(null)}
          onDelete={() => {
            setCategories((prev) => prev.filter((c) => c.id !== deleting.id));
            setDeleting(null);
          }}
        />
      )}
      {creating && (
        <CreateNuggetModal
          categories={categories}
          initialCategory={creating.category}
          onClose={() => setCreating(null)}
          onCreate={(categoryId, title) => {
            setCategories((prev) =>
              prev.map((c) =>
                c.id === categoryId
                  ? { ...c, articles: [...c.articles, title] }
                  : c
              )
            );
            setCreating(null);
          }}
        />
      )}
    </main>
  );
}
