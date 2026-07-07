"use client";

import { useState } from "react";
import {
  BadgeCheck,
  Ban,
  ChevronDown,
  FileSignature,
  Flag,
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

const galleryColors = [
  "bg-gray-800",
  "bg-gray-900",
  "bg-amber-700",
  "bg-slate-800",
];

function EngagementRow({ post }: { post: UserPost }) {
  return (
    <div className="mt-3 flex items-center gap-6 text-sm text-gray-500">
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

function PostEmbed({ embed }: { embed: NonNullable<UserPost["embed"]> }) {
  if (embed.kind === "event") {
    return (
      <div className="mt-3 overflow-hidden rounded-xl bg-blue-500 text-white">
        <div className="px-4 py-3">
          <div className="text-sm font-medium">{embed.title}</div>
          <div className="mt-1 flex items-center gap-1.5 text-xs text-blue-100">
            <Mic size={12} /> Hosted by {embed.host}
          </div>
        </div>
        <div className="mx-3 h-40 rounded-lg bg-gradient-to-br from-slate-700 via-slate-600 to-slate-800" />
        <div className="flex items-end justify-between px-4 py-3">
          <div>
            <div className="text-xs text-blue-100">Coming Up</div>
            <div className="text-sm font-medium">{embed.when}</div>
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

  if (embed.kind === "gallery") {
    return (
      <div className="mt-3 grid grid-cols-4 gap-2">
        {Array.from({ length: embed.imageCount }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "h-44 rounded-lg",
              galleryColors[i % galleryColors.length]
            )}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="mt-3 rounded-xl border border-gray-200 p-3">
      <div className="text-sm font-medium text-gray-900">{embed.title}</div>
      <div className="mt-3 h-40 rounded-lg bg-gradient-to-br from-amber-200 via-amber-300 to-amber-400" />
      <p className="mt-3 text-xs text-gray-600">
        {embed.description}{" "}
        <button type="button" className="text-primary hover:underline">
          Read more
        </button>
      </p>
      <div className="mt-3 flex items-center justify-between">
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
}

function PostCard({ post, author }: { post: UserPost; author: AuthorInfo }) {
  return (
    <article className="border-b border-gray-100 py-5 last:border-b-0">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <span className="h-10 w-10 shrink-0 rounded-full bg-gradient-to-br from-pink-300 via-fuchsia-300 to-blue-300" />
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-semibold text-gray-900">
                {author.name}
              </span>
              <BadgeCheck size={15} className="fill-primary text-white" />
              {post.moderation && (
                <span
                  className={cn(
                    "ml-1 flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
                    moderationStyles[post.moderation]
                  )}
                >
                  {moderationIcons[post.moderation]}
                  {post.moderation}
                </span>
              )}
            </div>
            <div className="text-xs text-gray-500">
              {author.title} &bull; Following
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 text-gray-400">
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

      <p className="mt-3 text-sm text-gray-700">
        {post.text}{" "}
        {!post.embed && post.moderation === "Flagged" && (
          <button type="button" className="text-primary hover:underline">
            Read more
          </button>
        )}
      </p>

      {post.embed && <PostEmbed embed={post.embed} />}
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

  const posts =
    filter === "All posts"
      ? userPosts
      : userPosts.filter((p) => p.moderation === filter);

  return (
    <div className="mt-6 rounded-xl border border-gray-200 bg-white px-6 py-5">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-gray-900">{heading}</h3>
        <div className="relative">
          <button
            type="button"
            onClick={() => setFilterOpen((v) => !v)}
            className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
          >
            {filter} <ChevronDown size={14} className="text-gray-400" />
          </button>
          {filterOpen && (
            <div className="absolute right-0 z-10 mt-1 w-40 rounded-lg border border-gray-200 bg-white py-1 shadow-lg">
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

      <div className="mt-2">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} author={author} />
        ))}
        {posts.length === 0 && (
          <div className="py-10 text-center text-sm text-gray-500">
            No {filter.toLowerCase()} posts.
          </div>
        )}
      </div>
    </div>
  );
}
