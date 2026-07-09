"use client";

import { useState } from "react";
import {
  BadgeCheck,
  MessageCircle,
  Mic,
  MoreHorizontal,
  Plus,
  ThumbsUp,
} from "lucide-react";
import {
  CreateContentModal,
  CreateIntegrityPollModal,
  type NewPost,
} from "@/components/dashboard/composer";
import { adminPosts, type AdminPostKind } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const tabs: { label: string; kind: AdminPostKind | "all" }[] = [
  { label: "All", kind: "all" },
  { label: "Media", kind: "media" },
  { label: "Posts", kind: "post" },
  { label: "Polls", kind: "poll" },
  { label: "Petitions", kind: "petition" },
];

function PollCard({
  options,
  duration,
}: {
  options: string[];
  duration: string;
}) {
  const [votes, setVotes] = useState<number[]>(options.map(() => 0));
  const [voted, setVoted] = useState<number | null>(null);
  const total = votes.reduce((a, b) => a + b, 0);

  function castVote(i: number) {
    if (voted === i) {
      // Clicking your current choice retracts the vote.
      setVotes((prev) => prev.map((v, j) => (j === i ? v - 1 : v)));
      setVoted(null);
      return;
    }
    setVotes((prev) =>
      prev.map((v, j) => {
        if (j === i) return v + 1;
        if (j === voted) return v - 1;
        return v;
      })
    );
    setVoted(i);
  }

  return (
    <div className="mt-3 space-y-2">
      {options.map((opt, i) => {
        const pct = total > 0 ? Math.round((votes[i] / total) * 100) : 0;
        return (
          <button
            key={i}
            type="button"
            onClick={() => castVote(i)}
            className={cn(
              "relative w-full overflow-hidden rounded-lg border px-3 py-2.5 text-left text-sm transition-colors",
              voted === i
                ? "border-primary text-gray-900"
                : "border-gray-200 text-gray-800 hover:border-primary hover:bg-blue-50"
            )}
          >
            {voted !== null && (
              <span
                className="absolute inset-y-0 left-0 bg-blue-100"
                style={{ width: `${pct}%` }}
              />
            )}
            <span className="relative flex items-center justify-between">
              <span>{opt}</span>
              {voted !== null && <span className="text-xs">{pct}%</span>}
            </span>
          </button>
        );
      })}
      <div className="text-xs text-gray-500">
        {voted !== null ? `${total} vote${total === 1 ? "" : "s"} · ` : ""}
        {voted !== null ? "Tap your choice again to undo · " : ""}
        Poll runs for {duration}
      </div>
    </div>
  );
}

function EventEmbed() {
  return (
    <div className="mt-3 overflow-hidden rounded-xl bg-blue-500 text-white">
      <div className="px-4 py-3">
        <div className="text-sm font-medium">
          State Budget Q&amp;A with Gov. Sanwo-Olu and DG Hamzat.
        </div>
        <div className="mt-1 flex items-center gap-1.5 text-xs text-blue-100">
          <Mic size={12} /> Hosted by Jonathan Adebola
        </div>
      </div>
      <div className="mx-3 h-40 rounded-lg bg-gradient-to-br from-slate-700 via-slate-600 to-slate-800" />
      <div className="flex items-end justify-between px-4 py-3">
        <div>
          <div className="text-xs text-blue-100">Coming Up</div>
          <div className="text-sm font-medium">15th May at 8:30pm</div>
        </div>
        <button
          type="button"
          className="rounded-lg bg-white px-3 py-1.5 text-sm font-medium text-primary hover:bg-blue-50"
        >
          Remind me
        </button>
      </div>
    </div>
  );
}

export default function YourPostsPage() {
  const [tab, setTab] = useState<AdminPostKind | "all">("all");
  const [feed, setFeed] = useState(adminPosts);
  const [menuOpen, setMenuOpen] = useState(false);
  const [modal, setModal] = useState<"content" | "integrity" | null>(null);

  const posts = tab === "all" ? feed : feed.filter((p) => p.kind === tab);

  function addPost(post: NewPost) {
    setFeed((prev) => [
      {
        id: `gp-${Date.now()}`,
        kind: post.kind,
        postedAgo: "now",
        text: post.text,
        likes: 0,
        comments: 0,
        images: post.images,
        poll: post.poll,
      },
      ...prev,
    ]);
  }

  return (
    <main className="px-6 py-6 space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Your posts</h1>
          <p className="mt-1 text-sm text-gray-500">
            Create and manage posts you share on the profile.
          </p>
        </div>
        <div className="relative">
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            <Plus size={15} /> Create content
          </button>
          {menuOpen && (
            <div className="absolute right-0 z-10 mt-1 w-48 rounded-lg border border-gray-200 bg-white py-1 shadow-lg">
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  setModal("content");
                }}
                className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
              >
                Create post
              </button>
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  setModal("integrity");
                }}
                className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
              >
                Create integrity poll
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-6 border-b border-gray-200">
        {tabs.map((t) => (
          <button
            key={t.kind}
            type="button"
            onClick={() => setTab(t.kind)}
            className={cn(
              "-mb-px border-b-2 pb-3 text-sm transition-colors",
              tab === t.kind
                ? "border-primary font-medium text-primary"
                : "border-transparent text-gray-500 hover:text-gray-700"
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="max-w-3xl rounded-xl border border-gray-200 bg-white px-6 py-4">
        <h3 className="text-sm font-semibold text-gray-900">All posts</h3>
        <div>
          {posts.map((post) => (
            <article
              key={post.id}
              className="border-b border-gray-100 py-5 last:border-b-0"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                    G
                  </span>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-semibold text-gray-900">
                        G-clout
                      </span>
                      <BadgeCheck size={15} className="fill-primary text-white" />
                    </div>
                    <div className="text-xs text-gray-500">
                      Official platform account
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <span className="text-xs">{post.postedAgo}</span>
                  <button
                    type="button"
                    aria-label={`Actions for ${post.id}`}
                    className="hover:text-gray-600"
                  >
                    <MoreHorizontal size={16} />
                  </button>
                </div>
              </div>

              <p className="mt-3 text-sm text-gray-700">{post.text}</p>
              {post.hasEventEmbed && <EventEmbed />}
              {post.images && post.images.length > 0 && (
                <div
                  className={cn(
                    "mt-3 gap-2",
                    post.images.length === 1 ? "block" : "grid grid-cols-3"
                  )}
                >
                  {post.images.map((src, i) => (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      key={src}
                      src={src}
                      alt={`Post image ${i + 1}`}
                      className={cn(
                        "w-full rounded-xl object-cover",
                        post.images!.length === 1 ? "max-h-80" : "h-40"
                      )}
                    />
                  ))}
                </div>
              )}
              {post.poll && (
                <PollCard
                  options={post.poll.options}
                  duration={post.poll.duration}
                />
              )}

              <div className="mt-3 flex items-center gap-6 text-sm text-gray-500">
                <span className="flex items-center gap-1.5">
                  <ThumbsUp size={15} /> {post.likes}
                </span>
                <span className="flex items-center gap-1.5">
                  <MessageCircle size={15} /> {post.comments}
                </span>
              </div>
            </article>
          ))}
          {posts.length === 0 && (
            <div className="py-10 text-center text-sm text-gray-500">
              No {tab} content yet.
            </div>
          )}
        </div>
      </div>

      {modal === "content" && (
        <CreateContentModal onClose={() => setModal(null)} onPost={addPost} />
      )}
      {modal === "integrity" && (
        <CreateIntegrityPollModal
          onClose={() => setModal(null)}
          onPost={(text) => addPost({ text, kind: "poll" })}
        />
      )}
    </main>
  );
}
