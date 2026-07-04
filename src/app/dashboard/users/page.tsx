"use client";

import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  ListFilter,
  MoreVertical,
  Search,
  Upload,
} from "lucide-react";
import {
  SuspendUserModal,
  ReactivateUserModal,
} from "@/components/dashboard/modals";
import { users as initialUsers, type UserStatus } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const statusStyles: Record<UserStatus, string> = {
  Active: "bg-green-50 text-green-600 border border-green-200",
  Suspended: "bg-amber-50 text-amber-600 border border-amber-200",
};

const avatarColors = [
  "bg-blue-100 text-blue-700",
  "bg-purple-100 text-purple-700",
  "bg-rose-100 text-rose-700",
  "bg-teal-100 text-teal-700",
  "bg-amber-100 text-amber-700",
];

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

type ModalState =
  | { type: "suspend"; email: string; name: string }
  | { type: "reactivate"; email: string; name: string }
  | null;

export default function UsersPage() {
  const [query, setQuery] = useState("");
  const [userList, setUserList] = useState(initialUsers);
  const [menuFor, setMenuFor] = useState<string | null>(null);
  const [modal, setModal] = useState<ModalState>(null);

  const q = query.trim().toLowerCase();
  const filtered = q
    ? userList.filter((u) =>
        [u.name, u.email, u.phone, u.role].some((f) =>
          f.toLowerCase().includes(q)
        )
      )
    : userList;

  function setStatus(email: string, status: UserStatus) {
    setUserList((prev) =>
      prev.map((u) => (u.email === email ? { ...u, status } : u))
    );
  }

  return (
    <main className="px-6 py-6 space-y-6" onClick={() => setMenuFor(null)}>
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            User Management
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            View and manage existing user accounts and permissions.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="flex items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
          >
            Choose country <ChevronDown size={14} className="text-gray-400" />
          </button>
          <button
            type="button"
            className="flex items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
          >
            Filter <ListFilter size={14} className="text-gray-500" />
          </button>
          <button
            type="button"
            className="flex items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
          >
            <Upload size={14} className="text-gray-500" /> Export
          </button>
        </div>
      </div>

      <div className="relative w-72">
        <Search
          size={14}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="search"
          className="w-full rounded-full border border-gray-200 bg-white py-2 pl-9 pr-4 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="rounded-xl border border-gray-200 bg-white">
        <table className="w-full">
          <thead className="border-b border-gray-100 bg-gray-50/50">
            <tr>
              {["Name", "Email", "Phone Number", "Role", "Status", "Last login", ""].map(
                (h, i) => (
                  <th
                    key={i}
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500"
                  >
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map((user, i) => (
              <tr key={user.email} className="hover:bg-gray-50/50">
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <span
                      className={cn(
                        "flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
                        avatarColors[i % avatarColors.length]
                      )}
                    >
                      {initials(user.name)}
                    </span>
                    <span className="text-sm font-medium text-gray-900">
                      {user.name}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-4 text-sm text-gray-600">{user.email}</td>
                <td className="px-4 py-4 text-sm text-gray-600">{user.phone}</td>
                <td className="px-4 py-4 text-sm text-gray-600">{user.role}</td>
                <td className="px-4 py-4">
                  <span
                    className={cn(
                      "inline-block rounded-full px-2.5 py-0.5 text-xs font-medium",
                      statusStyles[user.status]
                    )}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="px-4 py-4 text-sm text-gray-600">
                  {user.lastLogin}
                </td>
                <td className="relative px-4 py-4">
                  <button
                    type="button"
                    aria-label={`Actions for ${user.name}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setMenuFor(menuFor === user.email ? null : user.email);
                    }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <MoreVertical size={14} />
                  </button>
                  {menuFor === user.email && (
                    <div
                      className="absolute right-4 top-10 z-10 w-44 rounded-lg border border-gray-200 bg-white py-1 shadow-lg"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        type="button"
                        className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
                      >
                        View details
                      </button>
                      {user.status === "Active" ? (
                        <button
                          type="button"
                          onClick={() => {
                            setMenuFor(null);
                            setModal({
                              type: "suspend",
                              email: user.email,
                              name: user.name,
                            });
                          }}
                          className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                        >
                          Suspend user
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            setMenuFor(null);
                            setModal({
                              type: "reactivate",
                              email: user.email,
                              name: user.name,
                            });
                          }}
                          className="block w-full px-4 py-2 text-left text-sm text-primary hover:bg-blue-50"
                        >
                          Reactivate user
                        </button>
                      )}
                    </div>
                  )}
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-10 text-center text-sm text-gray-500"
                >
                  No users match &ldquo;{query}&rdquo;
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="flex items-center justify-between border-t border-gray-100 px-4 py-3">
          <button
            type="button"
            className="flex items-center gap-2 rounded-md border border-gray-200 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50"
          >
            <ArrowLeft size={14} /> Previous
          </button>
          <div className="flex items-center gap-1 text-sm">
            {[1, 2, 3].map((n) => (
              <button
                key={n}
                type="button"
                className={cn(
                  "h-8 w-8 rounded-md",
                  n === 1
                    ? "bg-gray-100 font-medium text-gray-900"
                    : "text-gray-600 hover:bg-gray-50"
                )}
              >
                {n}
              </button>
            ))}
            <span className="px-1 text-gray-400">…</span>
            {[8, 9, 10].map((n) => (
              <button
                key={n}
                type="button"
                className="h-8 w-8 rounded-md text-gray-600 hover:bg-gray-50"
              >
                {n}
              </button>
            ))}
          </div>
          <button
            type="button"
            className="flex items-center gap-2 rounded-md border border-gray-200 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50"
          >
            Next <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {modal?.type === "suspend" && (
        <SuspendUserModal
          userName={modal.name}
          onClose={() => setModal(null)}
          onConfirm={() => {
            setStatus(modal.email, "Suspended");
            setModal(null);
          }}
        />
      )}
      {modal?.type === "reactivate" && (
        <ReactivateUserModal
          userName={modal.name}
          onClose={() => setModal(null)}
          onConfirm={() => {
            setStatus(modal.email, "Active");
            setModal(null);
          }}
        />
      )}
    </main>
  );
}
