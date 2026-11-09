"use client";

import { useState } from "react";
import {
  BadgeCheck,
  Ban,
  ChevronDown,
  FileSignature,
  Flag,
  LayoutGrid,
  List,
  MessageCircle,
  Mic,
  MoreHorizontal,
  Scale,
  Share,
  ThumbsUp,
} from "lucide-react";
import { userPosts, type PostModeration, type UserPost } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const moderationStyles: Record<Exclude<PostModeration, null>, string> = {
  Flagged: "bg-amber-50 text-amber-600 border border-amber-200",
  "Taken down": "bg-red-50 text-red-500 border border-red-200",
  Appealed: "bg-blue-50 text-primary border border-blue-200",
};

const moderationIcons: Record<Exclude<PostModeration, null>, React.ReactNode> = {
  Flagged: <Flag size={11} />,
  "Taken down": <Ban size={11} />,
  Appealed: <Scale size={11} />,
};

const filters = ["All posts", "Flagged", "Taken down", "Appealed"] as const;

type ViewMode = "list" | "grid";

function EngagementRow({ post }: { post: UserPost }) {
  return (
    <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-2 pt-3 text-sm text-gray-500">
      <span className="flex items-center gap-1.5">
        <ThumbsUp size={15} /> {post.likes}
      </span>
      <span className="flex items-center gap-1.5">
        <MessageCircle size={15} /> {post.comments}
      </span>
      <span className="flex items-center gap-1.5">
        <Share size={15} /> {post.shares}
      </span>
    </div>
  );
}

function PostEmbed({
  embed,
  compact = false,
}: {
  embed: NonNullable<UserPost["embed"]>;
  compact?: boolean;
}) {
  const imgH = compact ? "h-32" : "h-40";
  if (embed.kind === "event") {
    return (
      <div className="mt-3 overflow-hidden rounded-xl bg-blue-500 text-white">
        <div className="px-4 py-3">
          <div className="text-sm font-medium">{embed.title}</div>
          <div className="mt-1 flex items-center gap-1.5 text-xs text-blue-100">
            <Mic size={12} /> Hosted by {embed.host}
          </div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/event-audience.png"
          alt=""
          className={cn("mx-3 w-[calc(100%-1.5rem)] rounded-lg object-cover", imgH)}
        />
        <div className="flex flex-wrap items-end justify-between gap-2 px-4 py-3">
          <div>
            <div className="text-xs text-blue-100">Coming Up</div>
            <div className="text-sm font-medium">{embed.when}</div>
          </div>
          <button
            type="button"
            className="rounded-lg bg-surface px-3 py-1.5 text-sm font-medium text-primary hover:bg-blue-50"
          >
            Remind me
          </button>
        </div>
      </div>
    );
  }

  if (embed.kind === "gallery") {
    return (
      <div className={cn("mt-3 grid gap-2", compact ? "grid-cols-2" : "grid-cols-2 sm:grid-cols-4")}>
        {Array.from({ length: embed.imageCount }).map((_, i) => (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            key={i}
            src={`/images/post-${(i % 4) + 1}.png`}
            alt=""
            className={cn("w-full rounded-lg object-cover", compact ? "h-24" : "h-44")}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="mt-3 rounded-xl border border-gray-200 p-3">
      <div className="text-sm font-medium text-gray-900">{embed.title}</div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/petition-cover.png"
        alt=""
        className={cn("mt-3 w-full rounded-lg object-cover", imgH)}
      />
      <p className={cn("mt-3 text-xs text-gray-600", compact && "line-clamp-3")}>
        {embed.description}{" "}
        <button type="button" className="text-primary hover:underline">
          Read more
        </button>
      </p>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
        <button
          type="button"
          className="rounded-lg bg-blue-50 px-4 py-1.5 text-sm font-medium text-primary hover:bg-blue-100"
        >
          Sign
        </button>
        <span className="flex items-center gap-1.5 text-sm text-gray-600">
          <FileSignature size={15} />
          <span className="font-semibold text-gray-900">{embed.signatures}</span>{" "}
          signatures
        </span>
      </div>
    </div>
  );
}

interface AuthorInfo {
  name: string;
  title: string;
  avatar?: string;
}

function PostCard({
  post,
  author,
  view,
}: {
  post: UserPost;
  author: AuthorInfo;
  view: ViewMode;
}) {
  const grid = view === "grid";
  return (
    <article
      className={cn(
        "flex min-w-0 flex-col",
        grid
          ? "h-full rounded-xl border border-gray-200 p-4"
          : "border-b border-gray-100 py-5 last:border-b-0"
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          {author.avatar ? (
            <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={author.avatar}
                alt={author.name}
                className="h-full w-full origin-top scale-[1.15] object-cover object-top"
              />
            </div>
          ) : (
            <span className="h-10 w-10 shrink-0 rounded-full bg-gradient-to-br from-pink-300 via-fuchsia-300 to-blue-300" />
          )}
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="truncate text-sm font-semibold text-gray-900">
                {author.name}
              </span>
              <BadgeCheck size={15} className="shrink-0 fill-primary text-white" />
              {post.moderation && (
                <span
                  className={cn(
                    "flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
                    moderationStyles[post.moderation]
                  )}
                >
                  {moderationIcons[post.moderation]}
                  {post.moderation}
                </span>
              )}
            </div>
            <div className="truncate text-xs text-gray-500">
              {author.title} &bull; Following
            </div>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-3 text-gray-400">
          <span className="text-xs">{post.postedAgo}</span>
          <button
            type="button"
            aria-label={`Actions for post ${post.id}`}
            className="hover:text-gray-600"
          >
            <MoreHorizontal size={16} />
          </button>
        </div>
      </div>

      <p className="mt-3 break-words text-sm text-gray-700">
        {post.text}{" "}
        {!post.embed && post.moderation === "Flagged" && (
          <button type="button" className="text-primary hover:underline">
            Read more
          </button>
        )}
      </p>

      {post.embed && <PostEmbed embed={post.embed} compact={grid} />}
      <EngagementRow post={post} />
    </article>
  );
}

export function UserContentTab({
  author,
  heading = "Uploaded posts",
}: {
  author: AuthorInfo;
  heading?: string;
}) {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All posts");
  const [filterOpen, setFilterOpen] = useState(false);
  const [view, setView] = useState<ViewMode>("list");

  const posts =
    filter === "All posts"
      ? userPosts
      : userPosts.filter((p) => p.moderation === filter);

  return (
    <div className="@container mt-6 rounded-xl border border-gray-200 bg-surface px-6 py-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-base font-semibold text-gray-900">{heading}</h3>
        <div className="flex items-center gap-2">
          <div
            role="group"
            aria-label="Post layout"
            className="flex items-center rounded-lg border border-gray-200 p-0.5"
          >
            {(
              [
                { mode: "list", label: "List view", Icon: List },
                { mode: "grid", label: "Grid view", Icon: LayoutGrid },
              ] as const
            ).map(({ mode, label, Icon }) => (
              <button
                key={mode}
                type="button"
                aria-label={label}
                aria-pressed={view === mode}
                title={label}
                onClick={() => setView(mode)}
                className={cn(
                  "rounded-md p-1.5 transition-colors",
                  view === mode
                    ? "bg-blue-50 text-primary"
                    : "text-gray-400 hover:bg-gray-50 hover:text-gray-600"
                )}
              >
                <Icon size={16} />
              </button>
            ))}
          </div>
          <div className="relative">
            <button
              type="button"
              onClick={() => setFilterOpen((v) => !v)}
              className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
            >
              {filter} <ChevronDown size={14} className="text-gray-400" />
            </button>
            {filterOpen && (
              <div className="absolute right-0 z-10 mt-1 w-40 rounded-lg border border-gray-200 bg-surface py-1 shadow-lg">
                {filters.map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => {
                      setFilter(f);
                      setFilterOpen(false);
                    }}
                    className={cn(
                      "block w-full px-4 py-2 text-left text-sm hover:bg-gray-50",
                      f === filter ? "font-medium text-primary" : "text-gray-700"
                    )}
                  >
                    {f}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div
        className={cn(
          view === "grid"
            ? "mt-4 grid grid-cols-1 items-stretch gap-4 @2xl:grid-cols-2"
            : "mt-2"
        )}
      >
        {posts.map((post) => (
          <PostCard key={post.id} post={post} author={author} view={view} />
        ))}
        {posts.length === 0 && (
          <div className="col-span-full py-10 text-center text-sm text-gray-500">
            No {filter.toLowerCase()} posts.
          </div>
        )}
      </div>
    </div>
  );
}
