"use client";

import { useEffect, useRef, useState } from "react";
import {
  FileText,
  ImagePlus,
  ListFilter,
  PenLine,
  Plus,
  Search,
  X,
} from "lucide-react";
import {
  conversations as initialConversations,
  messageDirectory,
  type ChatMessage,
  type Conversation,
} from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const avatarColors = [
  "bg-rose-100 text-rose-700",
  "bg-blue-100 text-blue-700",
  "bg-green-100 text-green-700",
  "bg-purple-100 text-purple-700",
  "bg-amber-100 text-amber-700",
  "bg-teal-100 text-teal-700",
];

function initials(name: string) {
  return name
    .replace(/\(.*\)/, "")
    .trim()
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function Avatar({ name, size = "h-10 w-10" }: { name: string; size?: string }) {
  const color = avatarColors[name.length % avatarColors.length];
  return (
    <span
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full text-xs font-semibold",
        size,
        color
      )}
    >
      {initials(name)}
    </span>
  );
}

/* ------------------------------ New message ------------------------------- */

interface NewMessageModalProps {
  onClose: () => void;
  onStart: (names: string[]) => void;
}

function NewMessageModal({ onClose, onStart }: NewMessageModalProps) {
  const [selected, setSelected] = useState<string[]>([]);
  const [query, setQuery] = useState("");

  const q = query.trim().toLowerCase();
  const results = messageDirectory.filter(
    (p) =>
      !selected.includes(p.name) &&
      (!q || p.name.toLowerCase().includes(q))
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-end bg-gray-900/20 p-6"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-[80vh] w-full max-w-xl flex-col rounded-2xl bg-white p-5 shadow-xl"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-gray-900">New message</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2 rounded-full border-2 border-primary/60 px-3 py-2">
          {selected.map((name) => (
            <span
              key={name}
              className="flex items-center gap-1.5 rounded-full border border-gray-200 bg-white py-0.5 pl-1 pr-2 text-xs text-gray-800"
            >
              <Avatar name={name} size="h-4 w-4" />
              {name.split(" ")[0]}
              <button
                type="button"
                onClick={() =>
                  setSelected((prev) => prev.filter((n) => n !== name))
                }
                aria-label={`Remove ${name}`}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={11} />
              </button>
            </span>
          ))}
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="min-w-24 flex-1 py-0.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none"
          />
        </div>

        <div className="mt-3 min-h-0 flex-1 space-y-1 overflow-y-auto">
          {results.map((p) => (
            <button
              key={p.name}
              type="button"
              onClick={() => {
                setSelected((prev) => [...prev, p.name]);
                setQuery("");
              }}
              className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left hover:bg-gray-50"
            >
              <Avatar name={p.name} />
              <span>
                <span className="block text-sm font-semibold text-gray-900">
                  {p.name}
                </span>
                <span className="block text-xs text-gray-500">
                  {p.title} <span aria-hidden>🇳🇬</span>
                </span>
              </span>
            </button>
          ))}
          {results.length === 0 && (
            <div className="px-2 py-4 text-sm text-gray-500">
              No people match &ldquo;{query}&rdquo;
            </div>
          )}
        </div>

        <div className="mt-4 flex justify-end border-t border-gray-100 pt-3">
          <button
            type="button"
            disabled={selected.length === 0}
            onClick={() => onStart(selected)}
            className={cn(
              "rounded-lg px-4 py-2 text-sm font-medium text-white",
              selected.length > 0
                ? "bg-primary hover:bg-blue-700"
                : "bg-blue-300 cursor-not-allowed"
            )}
          >
            Start conversation
          </button>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------- Chat thread ------------------------------ */

function MessageBubble({ msg, senderName }: { msg: ChatMessage; senderName: string }) {
  const isYou = msg.from === "you";
  return (
    <div className={cn("flex flex-col", isYou ? "items-end" : "items-start")}>
      <div
        className={cn(
          "flex items-baseline gap-3",
          isYou ? "flex-row-reverse" : ""
        )}
      >
        <span className="text-sm font-medium text-gray-900">
          {isYou ? "You" : senderName}
        </span>
        <span className="text-xs text-gray-400">{msg.time}</span>
      </div>
      <div className={cn("mt-1 flex items-end gap-2", isYou ? "" : "pl-0")}>
        {!isYou && <Avatar name={senderName} size="h-8 w-8" />}
        {msg.attachment ? (
          <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3">
            <span className="flex h-9 w-9 items-center justify-center rounded bg-red-600 text-white">
              <FileText size={16} />
            </span>
            <span>
              <span className="block text-sm font-medium text-gray-900">
                {msg.attachment.name}
              </span>
              <span className="block text-xs text-gray-500">
                {msg.attachment.size}
              </span>
            </span>
          </div>
        ) : (
          <div
            className={cn(
              "max-w-md rounded-xl px-4 py-2.5 text-sm",
              isYou
                ? "bg-primary text-white"
                : "bg-gray-100 text-gray-800"
            )}
          >
            {msg.text}
          </div>
        )}
      </div>
      {msg.reactions && msg.reactions.length > 0 && (
        <div className="mt-1 flex gap-1 text-sm">
          {msg.reactions.map((r, i) => (
            <span key={i}>{r}</span>
          ))}
        </div>
      )}
    </div>
  );
}

/* --------------------------------- Page ----------------------------------- */

export default function MessagesPage() {
  const [convos, setConvos] = useState(initialConversations);
  const [activeId, setActiveId] = useState("boma-ogan");
  const [listQuery, setListQuery] = useState("");
  const [draft, setDraft] = useState("");
  const [newMessageOpen, setNewMessageOpen] = useState(false);
  const threadRef = useRef<HTMLDivElement>(null);

  const active = convos.find((c) => c.id === activeId) ?? convos[0];

  const q = listQuery.trim().toLowerCase();
  const filtered = q
    ? convos.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.snippet.toLowerCase().includes(q)
      )
    : convos;

  useEffect(() => {
    threadRef.current?.scrollTo({ top: threadRef.current.scrollHeight });
  }, [activeId, active.messages.length]);

  function openConversation(id: string) {
    setActiveId(id);
    setConvos((prev) =>
      prev.map((c) => (c.id === id ? { ...c, unread: false } : c))
    );
  }

  function sendMessage() {
    const text = draft.trim();
    if (!text) return;
    setConvos((prev) =>
      prev.map((c) =>
        c.id === active.id
          ? {
              ...c,
              snippet: `You: ${text}`,
              timeAgo: "now",
              messages: [
                ...c.messages,
                {
                  id: `m${Date.now()}`,
                  from: "you" as const,
                  text,
                  time: "Just now",
                },
              ],
            }
          : c
      )
    );
    setDraft("");
  }

  function startConversation(names: string[]) {
    const name = names.join(", ");
    const existing = convos.find((c) => c.name === name);
    if (existing) {
      openConversation(existing.id);
    } else {
      const convo: Conversation = {
        id: `new-${Date.now()}`,
        name,
        role: undefined,
        timeAgo: "now",
        snippet: "New conversation",
        unread: false,
        messages: [],
      };
      setConvos((prev) => [convo, ...prev]);
      setActiveId(convo.id);
    }
    setNewMessageOpen(false);
  }

  return (
    <div className="flex h-full min-h-0 overflow-hidden">
      {/* Conversation list */}
      <div className="flex w-96 shrink-0 flex-col border-r border-gray-200 bg-white">
        <div className="flex items-center justify-between px-4 pt-5">
          <h1 className="text-xl font-semibold text-gray-900">Messages</h1>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setNewMessageOpen(true)}
              className="flex items-center gap-2 rounded-lg bg-primary px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700"
            >
              <PenLine size={14} /> New
            </button>
            <button
              type="button"
              aria-label="Filter conversations"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50"
            >
              <ListFilter size={15} />
            </button>
          </div>
        </div>

        <div className="relative mx-4 mt-4">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="search"
            value={listQuery}
            onChange={(e) => setListQuery(e.target.value)}
            placeholder="search messages.."
            className="w-full rounded-full border border-gray-200 py-2 pl-9 pr-4 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="mt-3 min-h-0 flex-1 overflow-y-auto">
          {filtered.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => openConversation(c.id)}
              className={cn(
                "flex w-full gap-3 border-b border-gray-100 px-4 py-4 text-left",
                c.id === active.id ? "bg-gray-50" : "hover:bg-gray-50/60"
              )}
            >
              <div className="flex items-start gap-2">
                <span
                  className={cn(
                    "mt-4 h-2 w-2 shrink-0 rounded-full",
                    c.unread ? "bg-primary" : "bg-transparent"
                  )}
                />
                <Avatar name={c.name} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="truncate text-sm font-semibold text-gray-900">
                    {c.name}
                  </span>
                  <span className="shrink-0 text-xs text-gray-400">
                    {c.timeAgo}
                  </span>
                </div>
                <p className="mt-1 line-clamp-2 text-sm text-gray-500">
                  {c.snippet}
                </p>
              </div>
            </button>
          ))}
          {filtered.length === 0 && (
            <div className="px-4 py-8 text-center text-sm text-gray-500">
              No conversations match &ldquo;{listQuery}&rdquo;
            </div>
          )}
        </div>
      </div>

      {/* Chat thread */}
      <div className="flex min-w-0 flex-1 flex-col bg-white">
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <div className="flex items-center gap-3">
            <Avatar name={active.name} size="h-11 w-11" />
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold text-gray-900">
                {active.name}
              </h2>
              {active.role && (
                <span className="rounded-full border border-gray-200 bg-white px-2.5 py-0.5 text-xs text-gray-600">
                  {active.role}
                </span>
              )}
            </div>
          </div>
          <button
            type="button"
            className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
          >
            View profile
          </button>
        </div>

        <div ref={threadRef} className="min-h-0 flex-1 space-y-5 overflow-y-auto px-6 py-5">
          {active.messages.map((msg, i) => {
            const showTodayDivider =
              msg.time.startsWith("Today") &&
              (i === 0 || !active.messages[i - 1].time.startsWith("Today")) &&
              !active.messages[i - 1]?.time.startsWith("Just now");
            return (
              <div key={msg.id} className="space-y-5">
                {showTodayDivider && (
                  <div className="flex items-center gap-3">
                    <span className="h-px flex-1 bg-gray-100" />
                    <span className="text-xs text-gray-400">Today</span>
                    <span className="h-px flex-1 bg-gray-100" />
                  </div>
                )}
                <MessageBubble msg={msg} senderName={active.name} />
              </div>
            );
          })}
          {active.messages.length === 0 && (
            <div className="pt-16 text-center text-sm text-gray-500">
              Start the conversation with {active.name}.
            </div>
          )}
          {active.typing && (
            <div className="flex items-center gap-2">
              <Avatar name={active.name} size="h-8 w-8" />
              <div className="rounded-xl bg-gray-100 px-4 py-3">
                <span className="flex gap-1">
                  {[0, 1, 2].map((d) => (
                    <span
                      key={d}
                      className="h-1.5 w-1.5 animate-pulse rounded-full bg-gray-400"
                      style={{ animationDelay: `${d * 200}ms` }}
                    />
                  ))}
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="px-6 pb-5">
          <div className="flex items-center gap-3 rounded-full border border-gray-200 bg-gray-50 px-3 py-2">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-primary">
              JA
            </span>
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="send a message..."
              className="min-w-0 flex-1 bg-transparent text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none"
            />
            <button
              type="button"
              aria-label="Attach image"
              className="text-gray-400 hover:text-gray-600"
            >
              <ImagePlus size={17} />
            </button>
            <button
              type="button"
              onClick={sendMessage}
              aria-label="Send message"
              className="text-gray-400 hover:text-primary"
            >
              <Plus size={18} />
            </button>
          </div>
        </div>
      </div>

      {newMessageOpen && (
        <NewMessageModal
          onClose={() => setNewMessageOpen(false)}
          onStart={startConversation}
        />
      )}
    </div>
  );
}
