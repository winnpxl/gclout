"use client";

import { useRef, useState } from "react";
import {
  AlignLeft,
  ArrowLeft,
  AtSign,
  Bold,
  Building2,
  Check,
  ChevronDown,
  FilePenLine,
  Globe,
  Heading1,
  Heading2,
  ImageIcon,
  ImagePlus,
  Italic,
  Link2,
  List,
  ListOrdered,
  ListTodo,
  Lock,
  Quote,
  Search,
  Smile,
  Sparkles,
  UploadCloud,
  UserRound,
  UserRoundCheck,
  X,
} from "lucide-react";
import { politicians, users } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const MAX_IMAGES = 4;

const quickEmojis = [
  "😀", "😂", "😊", "😍", "🤔", "👍", "👏", "🙏",
  "🔥", "🎉", "❤️", "💪", "🇳🇬", "🗳️", "📢", "✊",
];

const pollDurations = ["1 day", "3 days", "7 days", "2 weeks"];

function EmojiPicker({ onPick }: { onPick: (emoji: string) => void }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        type="button"
        aria-label="Add emoji"
        onClick={() => setOpen((v) => !v)}
        className="hover:text-primary"
      >
        <Smile size={17} />
      </button>
      {open && (
        <div className="absolute bottom-8 left-0 z-20 grid w-48 grid-cols-8 gap-1 rounded-xl border border-gray-200 bg-surface p-2 shadow-lg">
          {quickEmojis.map((e) => (
            <button
              key={e}
              type="button"
              onClick={() => {
                onPick(e);
                setOpen(false);
              }}
              className="rounded p-0.5 text-base hover:bg-gray-100"
            >
              {e}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function DurationPicker({
  value,
  onChange,
  placeholder = "Select poll duration",
}: {
  value: string | null;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900"
      >
        {value ?? placeholder} <ChevronDown size={14} />
      </button>
      {open && (
        <div className="absolute bottom-7 left-0 z-20 w-36 rounded-lg border border-gray-200 bg-surface py-1 shadow-lg">
          {pollDurations.map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => {
                onChange(d);
                setOpen(false);
              }}
              className={cn(
                "block w-full px-3 py-1.5 text-left text-sm hover:bg-gray-50",
                d === value ? "font-medium text-primary" : "text-gray-700"
              )}
            >
              {d}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ------------------------------ Who can reply ----------------------------- */

const audiences = [
  { label: "Everyone", icon: Globe },
  { label: "Private", icon: Lock },
  { label: "Accounts you follow", icon: UserRoundCheck },
  { label: "Accounts you mention", icon: AtSign },
];

function WhoCanSee() {
  const [open, setOpen] = useState(false);
  const [audience, setAudience] = useState("Everyone");

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
      >
        <Globe size={14} /> Who can see this?
      </button>
      {open && (
        <div className="absolute left-0 z-20 mt-2 w-80 rounded-xl border border-gray-200 bg-surface p-4 shadow-lg">
          <div className="text-sm font-semibold text-gray-900">
            Who can reply?
          </div>
          <p className="mt-0.5 text-xs text-gray-500">
            Choose who can reply to this post. Anyone mentioned can always
            reply.
          </p>
          <div className="mt-3 space-y-1">
            {audiences.map(({ label, icon: Icon }) => (
              <button
                key={label}
                type="button"
                onClick={() => {
                  setAudience(label);
                  setOpen(false);
                }}
                className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left hover:bg-gray-50"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white">
                  <Icon size={14} />
                </span>
                <span className="flex-1 text-sm text-gray-800">{label}</span>
                {audience === label && (
                  <Check size={16} className="text-primary" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ----------------------------- Sub-panel shell ---------------------------- */

function PanelHeader({
  title,
  onBack,
  canSave,
  onSave,
}: {
  title: string;
  onBack: () => void;
  canSave: boolean;
  onSave: () => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onBack}
          aria-label="Back"
          className="text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft size={17} />
        </button>
        <h2 className="text-sm font-semibold text-gray-900">{title}</h2>
      </div>
      <button
        type="button"
        onClick={onSave}
        disabled={!canSave}
        className={cn(
          "rounded-lg px-4 py-1.5 text-sm font-medium text-white",
          canSave ? "bg-primary hover:bg-blue-700" : "bg-blue-300 cursor-not-allowed"
        )}
      >
        Save
      </button>
    </div>
  );
}

/* -------------------------- Edit image description ------------------------ */

function EditDescriptionPanel({
  initial,
  onBack,
  onSave,
}: {
  initial: string;
  onBack: () => void;
  onSave: (text: string) => void;
}) {
  const [text, setText] = useState(initial);
  const canSave = text.trim().length > 0;

  return (
    <div>
      <PanelHeader
        title="Edit image description"
        onBack={onBack}
        canSave={canSave}
        onSave={() => onSave(text.trim())}
      />
      <div className="mt-4 h-56 rounded-xl bg-gradient-to-br from-gray-800 via-gray-900 to-black" />
      <div className="mt-4">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value.slice(0, 1000))}
          placeholder="Enter a description..."
          rows={4}
          autoFocus
          title="This is alt text meant to describe or identify an element."
          className="w-full resize-none rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <div className="mt-1 text-right text-xs text-gray-400">
          {text.length} / 1000
        </div>
      </div>
    </div>
  );
}

/* -------------------------------- Tag people ------------------------------ */

interface TaggedPerson {
  name: string;
}

function TagPeoplePanel({
  initial,
  onBack,
  onSave,
}: {
  initial: TaggedPerson[];
  onBack: () => void;
  onSave: (people: TaggedPerson[]) => void;
}) {
  const [selected, setSelected] = useState<TaggedPerson[]>(initial);
  const [query, setQuery] = useState("");

  const q = query.trim().toLowerCase();
  const results = q
    ? users
        .filter(
          (u) =>
            u.name.toLowerCase().includes(q) &&
            !selected.some((s) => s.name === u.name)
        )
        .slice(0, 5)
    : [];

  return (
    <div>
      <PanelHeader
        title="Tag people"
        onBack={onBack}
        canSave={selected.length > 0}
        onSave={() => onSave(selected)}
      />
      <div className="mt-4 flex flex-wrap items-center gap-2 rounded-full border border-gray-200 px-3 py-2 focus-within:ring-2 focus-within:ring-primary">
        {selected.map((p) => (
          <span
            key={p.name}
            className="flex items-center gap-1.5 rounded-full border border-gray-200 bg-surface py-0.5 pl-1 pr-2 text-xs text-gray-800"
          >
            <span className="h-4 w-4 rounded-full bg-gradient-to-br from-pink-300 to-blue-300" />
            {p.name}
            <button
              type="button"
              onClick={() =>
                setSelected((prev) => prev.filter((s) => s.name !== p.name))
              }
              aria-label={`Remove ${p.name}`}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={11} />
            </button>
          </span>
        ))}
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search..."
          autoFocus
          className="min-w-24 flex-1 py-0.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none"
        />
      </div>
      <div className="mt-2 space-y-1">
        {results.map((u) => (
          <button
            key={u.id}
            type="button"
            onClick={() => {
              setSelected((prev) => [...prev, { name: u.name }]);
              setQuery("");
            }}
            className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left hover:bg-gray-50"
          >
            <span className="h-8 w-8 rounded-full bg-gradient-to-br from-pink-300 to-blue-300" />
            <span>
              <span className="block text-sm font-medium text-gray-900">
                {u.name}
              </span>
              <span className="block text-xs text-gray-500">{u.role}</span>
            </span>
          </button>
        ))}
        {q && results.length === 0 && (
          <div className="px-2 py-3 text-sm text-gray-500">
            No people match &ldquo;{query}&rdquo;
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------------------------ Main composer ----------------------------- */

function ComposerToolbar({
  onAddImage,
  onTogglePoll,
  onEmoji,
  onIntegrityPoll,
}: {
  onAddImage: () => void;
  onTogglePoll: () => void;
  onEmoji: (emoji: string) => void;
  onIntegrityPoll: () => void;
}) {
  return (
    <div className="flex items-center gap-4 text-gray-500">
      <button type="button" aria-label="Add image" onClick={onAddImage} className="hover:text-primary">
        <ImagePlus size={17} />
      </button>
      <EmojiPicker onPick={onEmoji} />
      <button type="button" aria-label="Add poll" onClick={onTogglePoll} className="hover:text-primary">
        <ListTodo size={17} />
      </button>
      <button type="button" aria-label="Tag organization" className="hover:text-primary">
        <Building2 size={17} />
      </button>
      <button
        type="button"
        aria-label="Create integrity poll"
        onClick={onIntegrityPoll}
        className="hover:text-primary"
      >
        <AlignLeft size={17} />
      </button>
      <button
        type="button"
        className="flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-sm font-medium text-primary hover:bg-blue-100"
      >
        <Sparkles size={13} /> AI Compose
      </button>
    </div>
  );
}

export interface NewPost {
  text: string;
  kind: "post" | "media" | "poll" | "petition";
  images?: string[];
  poll?: { options: string[]; duration: string };
}

interface CreateContentModalProps {
  onClose: () => void;
  onPost: (post: NewPost) => void;
  onIntegrityPoll: () => void;
}

type ComposerView = "main" | "description" | "tagPeople";

export function CreateContentModal({
  onClose,
  onPost,
  onIntegrityPoll,
}: CreateContentModalProps) {
  const [view, setView] = useState<ComposerView>("main");
  const [text, setText] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [tagged, setTagged] = useState<TaggedPerson[]>([]);
  const [poll, setPoll] = useState(false);
  const [pollQuestion, setPollQuestion] = useState("");
  const [options, setOptions] = useState(["Yes", "No"]);
  const [duration, setDuration] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function onFilesSelected(files: FileList | null) {
    if (!files) return;
    const urls = Array.from(files)
      .slice(0, MAX_IMAGES - images.length)
      .map((f) => URL.createObjectURL(f));
    setImages((prev) => [...prev, ...urls]);
  }

  const canPost = poll
    ? pollQuestion.trim().length > 0 &&
      options.filter((o) => o.trim()).length >= 2
    : text.trim().length > 0 || images.length > 0;

  const tagLabel =
    tagged.length === 0
      ? "Tag people"
      : tagged.length === 1
        ? tagged[0].name
        : `${tagged[0].name} and ${tagged.length - 1} other${tagged.length > 2 ? "s" : ""}`;

  const descriptionLabel = description ? "1 description" : "Add description";

  function post() {
    if (!canPost) return;
    onPost({
      text: poll ? pollQuestion : text,
      kind: poll ? "poll" : images.length > 0 ? "media" : "post",
      images: images.length > 0 ? images : undefined,
      poll: poll
        ? {
            options: options.filter((o) => o.trim()),
            duration: duration ?? "1 day",
          }
        : undefined,
    });
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 p-4 pt-20"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-surface p-5 shadow-xl"
      >
        {view === "description" ? (
          <EditDescriptionPanel
            initial={description}
            onBack={() => setView("main")}
            onSave={(d) => {
              setDescription(d);
              setView("main");
            }}
          />
        ) : view === "tagPeople" ? (
          <TagPeoplePanel
            initial={tagged}
            onBack={() => setView("main")}
            onSave={(people) => {
              setTagged(people);
              setView("main");
            }}
          />
        ) : (
          <>
            <div className="flex items-start justify-between">
              <h2 className="text-sm font-semibold text-gray-900">
                Create content
              </h2>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close composer"
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-4 flex gap-3">
              <span className="h-10 w-10 shrink-0 rounded-full bg-gradient-to-br from-pink-300 via-fuchsia-300 to-blue-300" />
              <div className="min-w-0 flex-1">
                {!poll ? (
                  <>
                    <textarea
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      placeholder="What's happening?"
                      rows={2}
                      autoFocus
                      className="w-full resize-none text-base text-gray-900 placeholder:text-gray-400 focus:outline-none"
                    />

                    {images.length > 0 && (
                      <div
                        className={cn(
                          "mt-2 gap-2",
                          images.length === 1 ? "block" : "grid grid-cols-3"
                        )}
                      >
                        {images.map((src, i) => (
                          <div key={src} className="relative">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={src}
                              alt={description || `Attached image ${i + 1}`}
                              className={cn(
                                "w-full rounded-xl object-cover",
                                images.length === 1 ? "max-h-72" : "h-40"
                              )}
                            />
                            <button
                              type="button"
                              onClick={() => {
                                URL.revokeObjectURL(src);
                                setImages((prev) =>
                                  prev.filter((s) => s !== src)
                                );
                              }}
                              aria-label={`Remove image ${i + 1}`}
                              className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/70 text-white hover:bg-black"
                            >
                              <X size={13} />
                            </button>
                            {description && (
                              <span className="absolute bottom-2 left-2 rounded bg-black/70 px-1.5 py-0.5 text-xs font-medium text-white">
                                ALT
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {images.length > 0 && (
                      <div className="mt-3 flex items-center gap-5 text-sm text-gray-600">
                        <button
                          type="button"
                          onClick={() => setView("tagPeople")}
                          className="flex items-center gap-1.5 hover:text-gray-900"
                        >
                          <UserRound size={14} /> {tagLabel}
                        </button>
                        <button
                          type="button"
                          onClick={() => setView("description")}
                          title="This is alt text meant to describe or identify an element."
                          className="flex items-center gap-1.5 hover:text-gray-900"
                        >
                          <FilePenLine size={14} /> {descriptionLabel}
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <input
                      value={pollQuestion}
                      onChange={(e) => setPollQuestion(e.target.value)}
                      placeholder="Ask a question"
                      autoFocus
                      className="w-full text-base text-gray-900 placeholder:text-gray-400 focus:outline-none"
                    />
                    <div className="mt-3 space-y-2">
                      {options.map((opt, i) => (
                        <input
                          key={i}
                          value={opt}
                          onChange={(e) =>
                            setOptions((prev) =>
                              prev.map((o, j) => (j === i ? e.target.value : o))
                            )
                          }
                          className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      ))}
                      <button
                        type="button"
                        onClick={() => setOptions((prev) => [...prev, ""])}
                        className="w-full rounded-lg border border-dashed border-gray-300 px-3 py-2.5 text-left text-sm text-gray-400 hover:border-gray-400"
                      >
                        Add another option
                      </button>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <DurationPicker value={duration} onChange={setDuration} />
                      <button
                        type="button"
                        onClick={() => setPoll(false)}
                        className="text-sm font-medium text-red-500 hover:underline"
                      >
                        Remove poll
                      </button>
                    </div>
                  </>
                )}

                <div className="mt-3">
                  <WhoCanSee />
                </div>
              </div>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => {
                onFilesSelected(e.target.files);
                e.target.value = "";
              }}
            />
            <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
              <ComposerToolbar
                onAddImage={() => fileInputRef.current?.click()}
                onTogglePoll={() => setPoll(true)}
                onEmoji={(emoji) =>
                  poll
                    ? setPollQuestion((t) => t + emoji)
                    : setText((t) => t + emoji)
                }
                onIntegrityPoll={onIntegrityPoll}
              />
              <button
                type="button"
                onClick={post}
                disabled={!canPost}
                className={cn(
                  "rounded-lg px-5 py-2 text-sm font-medium text-white",
                  canPost
                    ? "bg-primary hover:bg-blue-700"
                    : "bg-blue-300 cursor-not-allowed"
                )}
              >
                Post
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ---------------------------- Integrity poll ------------------------------ */

const ratings = [
  { emoji: "\u{1F610}", label: "Least Trustworthy" },
  { emoji: "\u{1F642}", label: "Slightly Trustworthy" },
  { emoji: "\u{1F60A}", label: "Generally Trustworthy" },
  { emoji: "\u{1F604}", label: "Highly Trustworthy" },
  { emoji: "\u{1F601}", label: "Very Trustworthy" },
];

function PollQuestion({
  index,
  placeholder,
}: {
  index: number;
  placeholder: string;
}) {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["Yes", "No"]);

  return (
    <div className="flex gap-3">
      <span className="pt-2 text-sm font-semibold text-gray-900">
        Q{index}.
      </span>
      <div className="flex-1">
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder={placeholder}
          className="w-full py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none"
        />
        <div className="mt-1 space-y-2">
          {options.map((opt, i) => (
            <input
              key={i}
              value={opt}
              onChange={(e) =>
                setOptions((prev) =>
                  prev.map((o, j) => (j === i ? e.target.value : o))
                )
              }
              className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          ))}
          <button
            type="button"
            onClick={() => setOptions((prev) => [...prev, ""])}
            className="w-full rounded-lg border border-dashed border-gray-300 px-3 py-2.5 text-left text-sm text-gray-400 hover:border-gray-400"
          >
            Add another option
          </button>
        </div>
      </div>
    </div>
  );
}

interface CreateIntegrityPollModalProps {
  onClose: () => void;
  onPost: (question: string) => void;
}

export function CreateIntegrityPollModal({
  onClose,
  onPost,
}: CreateIntegrityPollModalProps) {
  const [subject, setSubject] = useState(politicians[0]);
  const [personQuery, setPersonQuery] = useState("");
  const [rating, setRating] = useState<number | null>(null);

  const q = personQuery.trim().toLowerCase();
  const personResults = q
    ? politicians
        .filter(
          (p) => p.name.toLowerCase().includes(q) && p.name !== subject.name
        )
        .slice(0, 5)
    : [];

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 p-4 pt-10"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-surface p-6 shadow-xl"
      >
        <div className="flex items-start justify-between">
          <h2 className="text-sm font-semibold text-gray-900">
            Create integrity poll
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={18} />
          </button>
        </div>

        {/* Person picker */}
        <div className="relative mt-4">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            value={personQuery}
            onChange={(e) => setPersonQuery(e.target.value)}
            placeholder="Search for the person this poll is about..."
            className="w-full rounded-full border border-gray-200 py-2 pl-9 pr-4 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {personResults.length > 0 && (
            <div className="absolute z-20 mt-1 w-full rounded-lg border border-gray-200 bg-surface py-1 shadow-lg">
              {personResults.map((p) => (
                <button
                  key={p.name}
                  type="button"
                  onClick={() => {
                    setSubject(p);
                    setPersonQuery("");
                  }}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left hover:bg-gray-50"
                >
                  <span className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-300 to-indigo-300" />
                  <span>
                    <span className="block text-sm font-medium text-gray-900">
                      {p.name}
                    </span>
                    <span className="block text-xs text-gray-500">
                      {p.title}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="mt-5 flex gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
            G
          </span>
          <p className="text-sm leading-relaxed text-gray-800">
            We&apos;re running a quick poll to get some community insights on{" "}
            <span className="font-semibold italic text-primary">
              {subject.name}
            </span>
            . Whether you know them well or just a little, your input is super
            helpful!
          </p>
        </div>

        <div className="mt-4 overflow-hidden rounded-2xl bg-gray-50">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/poll-subject-banner.png"
            alt=""
            className="h-40 w-full object-cover"
          />
          <div className="flex items-center gap-3 p-4 pt-3">
            <span className="-mt-10 flex h-16 w-16 items-center justify-center rounded-full border-4 border-surface bg-rose-100 text-lg font-semibold text-rose-700">
              {subject.name
                .split(" ")
                .map((w) => w[0])
                .slice(0, 2)
                .join("")}
            </span>
            <span className="text-lg font-semibold text-gray-900">
              {subject.name}
            </span>
            <span className="flex items-center gap-1.5 rounded-full border border-gray-200 bg-surface px-3 py-1 text-xs text-gray-700">
              <span aria-hidden>🇳🇬</span> {subject.title}
            </span>
          </div>
        </div>

        <div className="mt-6 space-y-6">
          <PollQuestion index={1} placeholder="Do you know this person?" />
          <PollQuestion
            index={2}
            placeholder="Are they a member of a political party?"
          />

          <div className="flex gap-3">
            <span className="text-sm font-semibold text-gray-900">Q3.</span>
            <div className="flex-1">
              <div className="text-sm text-gray-900">
                Rate their trustworthiness
              </div>
              <div className="mt-3 grid grid-cols-5 gap-3">
                {ratings.map((r, i) => (
                  <button
                    key={r.label}
                    type="button"
                    onClick={() => setRating(i)}
                    className={cn(
                      "flex flex-col items-center gap-2 rounded-xl border px-2 py-4 text-center",
                      rating === i
                        ? "border-primary bg-blue-50"
                        : "border-gray-200 bg-surface hover:border-gray-300"
                    )}
                  >
                    <span className="text-2xl" aria-hidden>
                      {r.emoji}
                    </span>
                    <span className="text-xs text-gray-600">{r.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <PollQuestion
            index={4}
            placeholder="Would you recommend this person?"
          />
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4">
          <div className="flex items-center gap-5">
            <button
              type="button"
              className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900"
            >
              Select poll duration <ChevronDown size={14} />
            </button>
            <WhoCanSee />
          </div>
          <button
            type="button"
            onClick={() => {
              onPost(`Community integrity poll on ${subject.name}.`);
              onClose();
            }}
            className="rounded-lg bg-primary px-5 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Post poll
          </button>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------ Create petition --------------------------- */

const petitionDurations = ["1 week", "2 weeks", "1 month", "3 months"];

const styleBlocks = [
  { label: "Normal", block: "P" },
  { label: "Heading 1", block: "H1" },
  { label: "Heading 2", block: "H2" },
  { label: "Quote", block: "BLOCKQUOTE" },
];

interface NewPetition {
  title: string;
  description: string;
  coverImage?: string;
  duration: string;
  draft: boolean;
}

interface CreatePetitionModalProps {
  onClose: () => void;
  onSubmit: (petition: NewPetition) => void;
}

export function CreatePetitionModal({
  onClose,
  onSubmit,
}: CreatePetitionModalProps) {
  const [title, setTitle] = useState("");
  const [cover, setCover] = useState<string | null>(null);
  const [duration, setDuration] = useState<string | null>(null);
  const [styleOpen, setStyleOpen] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  const canContinue = title.trim().length > 0;

  // Rich-text commands run on the contentEditable body. onMouseDown keeps the
  // selection in the editor instead of moving focus to the toolbar button.
  function exec(command: string, value?: string) {
    editorRef.current?.focus();
    document.execCommand(command, false, value);
  }

  function onCoverSelected(files: FileList | null) {
    if (files && files[0]) {
      if (cover) URL.revokeObjectURL(cover);
      setCover(URL.createObjectURL(files[0]));
    }
  }

  function submit(draft: boolean) {
    if (!draft && !canContinue) return;
    onSubmit({
      title: title.trim() || "Untitled petition",
      description: editorRef.current?.innerHTML ?? "",
      coverImage: cover ?? undefined,
      duration: duration ?? petitionDurations[0],
      draft,
    });
    onClose();
  }

  const toolbarBtn =
    "flex h-8 w-8 items-center justify-center rounded-md text-gray-600 hover:bg-surface hover:text-gray-900";

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 p-4 pt-10"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-[88vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-surface shadow-xl"
      >
        {/* Header with formatting toolbar */}
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-3">
          <h2 className="text-lg font-bold text-gray-900">Create Petition</h2>
          <div className="flex items-center gap-0.5 rounded-full bg-blue-50 px-2 py-1">
            <div className="relative">
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => setStyleOpen((v) => !v)}
                className="flex items-center gap-1 rounded-md px-2 py-1 text-sm font-medium text-gray-700 hover:bg-surface"
              >
                Style <ChevronDown size={13} />
              </button>
              {styleOpen && (
                <div className="absolute left-0 top-9 z-20 w-36 rounded-lg border border-gray-200 bg-surface py-1 shadow-lg">
                  {styleBlocks.map((s) => (
                    <button
                      key={s.block}
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => {
                        exec("formatBlock", s.block);
                        setStyleOpen(false);
                      }}
                      className="block w-full px-3 py-1.5 text-left text-sm text-gray-700 hover:bg-gray-50"
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <span className="mx-1 h-4 w-px bg-blue-200" />
            <button type="button" aria-label="Bold" onMouseDown={(e) => e.preventDefault()} onClick={() => exec("bold")} className={toolbarBtn}>
              <Bold size={15} />
            </button>
            <button type="button" aria-label="Italic" onMouseDown={(e) => e.preventDefault()} onClick={() => exec("italic")} className={toolbarBtn}>
              <Italic size={15} />
            </button>
            <button type="button" aria-label="Heading 1" onMouseDown={(e) => e.preventDefault()} onClick={() => exec("formatBlock", "H2")} className={toolbarBtn}>
              <Heading1 size={15} />
            </button>
            <button type="button" aria-label="Heading 2" onMouseDown={(e) => e.preventDefault()} onClick={() => exec("formatBlock", "H3")} className={toolbarBtn}>
              <Heading2 size={15} />
            </button>
            <button type="button" aria-label="Quote" onMouseDown={(e) => e.preventDefault()} onClick={() => exec("formatBlock", "BLOCKQUOTE")} className={toolbarBtn}>
              <Quote size={15} />
            </button>
            <button
              type="button"
              aria-label="Insert link"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                const url = window.prompt("Enter a URL");
                if (url) exec("createLink", url);
              }}
              className={toolbarBtn}
            >
              <Link2 size={15} />
            </button>
            <button
              type="button"
              aria-label="Insert image"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                const url = window.prompt("Enter an image URL");
                if (url) exec("insertImage", url);
              }}
              className={toolbarBtn}
            >
              <ImageIcon size={15} />
            </button>
            <button type="button" aria-label="Bulleted list" onMouseDown={(e) => e.preventDefault()} onClick={() => exec("insertUnorderedList")} className={toolbarBtn}>
              <List size={15} />
            </button>
            <button type="button" aria-label="Numbered list" onMouseDown={(e) => e.preventDefault()} onClick={() => exec("insertOrderedList")} className={toolbarBtn}>
              <ListOrdered size={15} />
            </button>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="min-h-0 flex-1 overflow-y-auto bg-gray-50 px-6 py-6">
          {/* Cover image */}
          {cover ? (
            <div className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={cover}
                alt="Petition cover"
                className="max-h-72 w-full rounded-xl object-cover"
              />
              <button
                type="button"
                onClick={() => {
                  URL.revokeObjectURL(cover);
                  setCover(null);
                }}
                aria-label="Remove cover image"
                className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg bg-black/60 text-white hover:bg-black"
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <div className="relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 py-14">
              <button
                type="button"
                onClick={() => coverInputRef.current?.click()}
                className="flex h-12 w-12 items-center justify-center rounded-lg border border-gray-200 bg-surface text-gray-600 shadow-sm hover:bg-gray-50"
              >
                <UploadCloud size={20} />
              </button>
              <p className="mt-3 text-sm text-gray-600">
                <button
                  type="button"
                  onClick={() => coverInputRef.current?.click()}
                  className="font-semibold text-primary hover:underline"
                >
                  Upload cover image
                </button>{" "}
                or drag and drop
              </p>
              <p className="mt-1 text-xs text-gray-400">
                PNG, JPG or GIF (optional)
              </p>
            </div>
          )}
          <input
            ref={coverInputRef}
            type="file"
            accept="image/png,image/jpeg,image/gif"
            className="hidden"
            onChange={(e) => {
              onCoverSelected(e.target.files);
              e.target.value = "";
            }}
          />

          {/* Title */}
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add Title"
            className="mt-8 w-full bg-transparent text-3xl font-bold text-gray-900 placeholder:text-gray-400 focus:outline-none"
          />

          {/* Description (rich text) */}
          <div
            ref={editorRef}
            contentEditable
            suppressContentEditableWarning
            data-placeholder="Describe your petition here..."
            className="petition-editor mt-4 min-h-40 text-base text-gray-800 focus:outline-none"
          />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-gray-100 px-6 py-4">
          <div className="flex items-center gap-5">
            <WhoCanSee />
            <DurationPicker
              value={duration}
              onChange={setDuration}
              placeholder="Petition duration"
            />
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => submit(true)}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Save as draft
            </button>
            <button
              type="button"
              onClick={() => submit(false)}
              disabled={!canContinue}
              className={cn(
                "rounded-lg px-5 py-2 text-sm font-medium text-white",
                canContinue
                  ? "bg-primary hover:bg-blue-700"
                  : "bg-blue-300 cursor-not-allowed"
              )}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
