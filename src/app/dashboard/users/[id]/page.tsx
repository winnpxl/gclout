"use client";

import { use, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, Mail } from "lucide-react";
import {
  SuspendUserModal,
  ReactivateUserModal,
} from "@/components/dashboard/modals";
import { UserContentTab } from "@/components/dashboard/UserContentTab";
import { users, type UserStatus } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const tabs = ["Overview", "Content", "Analytics"] as const;

function StatusPill({ status }: { status: UserStatus }) {
  return (
    <span
      className={cn(
        "inline-block rounded-full px-2.5 py-0.5 text-xs font-medium",
        status === "Active"
          ? "bg-green-50 text-green-600 border border-green-200"
          : "bg-amber-50 text-amber-600 border border-amber-200"
      )}
    >
      {status}
    </span>
  );
}

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between py-3">
      <span className="text-sm text-gray-500">{label}</span>
      <span className="text-sm font-medium text-gray-900">{value}</span>
    </div>
  );
}

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function UserProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const user = users.find((u) => u.id === id);
  const [status, setStatus] = useState<UserStatus | null>(user?.status ?? null);
  const [tab, setTab] = useState<(typeof tabs)[number]>("Overview");
  const [modal, setModal] = useState<"suspend" | "reactivate" | null>(null);

  if (!user || status === null) {
    notFound();
  }

  const [firstName, ...rest] = user.name.split(" ");
  const lastName = rest.join(" ");
  const p = user.profile;

  return (
    <main className="px-6 py-6">
      <div className="flex items-center gap-4">
        <Link
          href="/dashboard/users"
          className="flex items-center gap-1 text-sm text-gray-400 hover:text-gray-600"
        >
          <ChevronLeft size={16} /> Back
        </Link>
        <h1 className="text-base font-semibold text-gray-900">User profile</h1>
      </div>

      {/* Cover banner */}
      <div className="mt-4 h-56 rounded-xl bg-gradient-to-br from-rose-300 via-rose-400 to-rose-600" />

      {/* Avatar + name + actions */}
      <div className="flex items-start justify-between px-6">
        <div className="flex items-end gap-5 -mt-16">
          <span className="flex h-36 w-36 items-center justify-center rounded-full border-4 border-white bg-rose-100 text-3xl font-semibold text-rose-700 shadow">
            {initials(user.name)}
          </span>
          <div className="pb-1">
            <h2 className="text-2xl font-semibold text-gray-900">{user.name}</h2>
            <div className="mt-2 flex items-center gap-2">
              <span className="rounded-full border border-gray-200 bg-white px-3 py-0.5 text-xs font-medium text-gray-700">
                {user.role}
              </span>
              <StatusPill status={status} />
              <span className="flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-0.5 text-xs font-medium text-gray-700">
                <span aria-hidden>🇳🇬</span> {p.country}
              </span>
            </div>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-3">
          <button
            type="button"
            aria-label={`Email ${user.name}`}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 hover:bg-gray-50"
          >
            <Mail size={16} />
          </button>
          {status === "Active" ? (
            <button
              type="button"
              onClick={() => setModal("suspend")}
              className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Suspend user
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setModal("reactivate")}
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Reactivate user
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-8 flex gap-6 border-b border-gray-200">
        {tabs.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={cn(
              "-mb-px border-b-2 pb-3 text-sm transition-colors",
              tab === t
                ? "border-primary font-medium text-primary"
                : "border-transparent text-gray-500 hover:text-gray-700"
            )}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "Overview" ? (
        <div className="mt-6 grid grid-cols-1 items-start gap-4 lg:grid-cols-2">
          <section className="rounded-xl border border-gray-200 bg-white p-6">
            <h3 className="border-b border-gray-100 pb-4 text-base font-semibold text-gray-900">
              Personal Information
            </h3>
            <div className="mt-2 divide-y divide-gray-50 px-3">
              <InfoRow label="First Name" value={firstName} />
              <InfoRow label="Last Name" value={lastName} />
              <InfoRow label="Email" value={user.email} />
              <InfoRow label="Phone Number" value={user.phone} />
              <InfoRow label="Date of Birth" value={p.dateOfBirth} />
              <InfoRow label="Country" value={p.country} />
              <InfoRow label="Nationality" value={p.nationality} />
              <InfoRow label="State" value={p.state} />
              <InfoRow label="Ward" value={p.ward} />
              <InfoRow label="Status" value={<StatusPill status={status} />} />
            </div>
          </section>

          <section className="rounded-xl border border-gray-200 bg-white p-6">
            <h3 className="border-b border-gray-100 pb-4 text-base font-semibold text-gray-900">
              Other account information
            </h3>
            <div className="mt-2 divide-y divide-gray-50 px-3">
              <InfoRow label="Account type" value={p.accountType} />
              <InfoRow label="Party affiliation" value={p.partyAffiliation} />
              <InfoRow label="Date joined" value={p.dateJoined} />
              <InfoRow label="Joined as" value={p.joinedAs} />
              <InfoRow label="Status" value={<StatusPill status={status} />} />
            </div>
          </section>
        </div>
      ) : tab === "Content" ? (
        <UserContentTab
          author={{ name: user.name, title: `${user.role}, ${p.state} State` }}
        />
      ) : (
        <div className="mt-6 rounded-xl border border-gray-200 bg-white p-10 text-center text-sm text-gray-500">
          {tab} for {user.name} coming soon.
        </div>
      )}

      {modal === "suspend" && (
        <SuspendUserModal
          userName={user.name}
          onClose={() => setModal(null)}
          onConfirm={() => {
            setStatus("Suspended");
            setModal(null);
          }}
        />
      )}
      {modal === "reactivate" && (
        <ReactivateUserModal
          userName={user.name}
          onClose={() => setModal(null)}
          onConfirm={() => {
            setStatus("Active");
            setModal(null);
          }}
        />
      )}
    </main>
  );
}
