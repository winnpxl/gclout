"use client";

import { useState } from "react";
import {
  AlignLeft,
  ArrowLeft,
  AtSign,
  Building2,
  Check,
  ChevronDown,
  FilePenLine,
  Globe,
  ImagePlus,
  ListTodo,
  Lock,
  Search,
  Smile,
  Sparkles,
  UserRound,
  UserRoundCheck,
  X,
} from "lucide-react";
import { politicians, users } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const galleryColors = [
  "bg-gray-800",
  "bg-gray-900",
  "bg-amber-700",
  "bg-slate-800",
];

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
        <div className="absolute left-0 z-20 mt-2 w-80 rounded-xl border border-gray-200 bg-white p-4 shadow-lg">
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
            className="flex items-center gap-1.5 rounded-full border border-gray-200 bg-white py-0.5 pl-1 pr-2 text-xs text-gray-800"
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
}: {
  onAddImage: () => void;
  onTogglePoll: () => void;
}) {
  return (
    <div className="flex items-center gap-4 text-gray-500">
      <button type="button" aria-label="Add image" onClick={onAddImage} className="hover:text-primary">
        <ImagePlus size={17} />
      </button>
      <button type="button" aria-label="Add emoji" className="hover:text-primary">
        <Smile size={17} />
      </button>
      <button type="button" aria-label="Add poll" onClick={onTogglePoll} className="hover:text-primary">
        <ListTodo size={17} />
      </button>
      <button type="button" aria-label="Tag organization" className="hover:text-primary">
        <Building2 size={17} />
      </button>
      <button type="button" aria-label="Formatting" className="hover:text-primary">
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
  kind: "post" | "media" | "poll";
}

interface CreateContentModalProps {
  onClose: () => void;
  onPost: (post: NewPost) => void;
}

type ComposerView = "main" | "description" | "tagPeople";

export function CreateContentModal({ onClose, onPost }: CreateContentModalProps) {
  const [view, setView] = useState<ComposerView>("main");
  const [text, setText] = useState("");
  const [images, setImages] = useState(0);
  const [description, setDescription] = useState("");
  const [tagged, setTagged] = useState<TaggedPerson[]>([]);
  const [poll, setPoll] = useState(false);
  const [pollQuestion, setPollQuestion] = useState("");
  const [options, setOptions] = useState(["Yes", "No"]);

  const canPost = poll
    ? pollQuestion.trim().length > 0
    : text.trim().length > 0 || images > 0;

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
      kind: poll ? "poll" : images > 0 ? "media" : "post",
    });
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-gray-900/40 p-4 pt-20"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-5 shadow-xl"
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

                    {images === 1 && (
                      <div className="relative mt-2">
                        <div className="h-64 w-full rounded-xl bg-gradient-to-br from-gray-800 via-gray-900 to-black" />
                        <button
                          type="button"
                          onClick={() => setImages(0)}
                          aria-label="Remove image"
                          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-gray-900/70 text-white hover:bg-gray-900"
                        >
                          <X size={15} />
                        </button>
                      </div>
                    )}
                    {images > 1 && (
                      <div className="mt-2 grid grid-cols-3 gap-2">
                        {Array.from({ length: images }).map((_, i) => (
                          <div key={i} className="relative">
                            <div
                              className={cn(
                                "h-40 rounded-xl",
                                galleryColors[i % galleryColors.length]
                              )}
                            />
                            <button
                              type="button"
                              onClick={() => setImages((n) => n - 1)}
                              aria-label={`Remove image ${i + 1}`}
                              className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-gray-900/70 text-white hover:bg-gray-900"
                            >
                              <X size={13} />
                            </button>
                            {description && (
                              <span className="absolute bottom-2 left-2 rounded bg-gray-900/70 px-1.5 py-0.5 text-xs font-medium text-white">
                                ALT
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {images > 0 && (
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
                      <button
                        type="button"
                        className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900"
                      >
                        Select poll duration <ChevronDown size={14} />
                      </button>
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

            <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
              <ComposerToolbar
                onAddImage={() =>
                  setImages((n) => (n === 0 ? 1 : Math.min(n + 3, 4)))
                }
                onTogglePoll={() => setPoll(true)}
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
      className="fixed inset-0 z-50 flex items-start justify-center bg-gray-900/40 p-4 pt-10"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-xl"
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
            <div className="absolute z-20 mt-1 w-full rounded-lg border border-gray-200 bg-white py-1 shadow-lg">
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
          <div className="h-40 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-800" />
          <div className="flex items-center gap-3 p-4 pt-3">
            <span className="-mt-10 flex h-16 w-16 items-center justify-center rounded-full border-4 border-white bg-rose-100 text-lg font-semibold text-rose-700">
              {subject.name
                .split(" ")
                .map((w) => w[0])
                .slice(0, 2)
                .join("")}
            </span>
            <span className="text-lg font-semibold text-gray-900">
              {subject.name}
            </span>
            <span className="flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1 text-xs text-gray-700">
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
                        : "border-gray-200 bg-white hover:border-gray-300"
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
