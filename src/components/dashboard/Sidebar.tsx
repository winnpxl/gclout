"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronRight,
  ChevronDown,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import {
  HomeIcon,
  UsersIcon,
  MessagesIcon,
  ContentIcon,
  ReportIcon,
  SettingsIcon,
  HelpIcon,
} from "@/components/icons/nav-icons";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: HomeIcon },
  {
    label: "Users",
    href: "/dashboard/users",
    icon: UsersIcon,
    subItems: [
      { label: "Role Change Requests", href: "/dashboard/users/role-requests" },
      { label: "Election Observers", href: "/dashboard/users/observers" },
    ],
  },
  { label: "Messages", href: "/dashboard/messages", icon: MessagesIcon },
  {
    label: "Content",
    href: "/dashboard/content",
    icon: ContentIcon,
    subItems: [
      { label: "Your Posts", href: "/dashboard/content/your-posts" },
    ],
  },
  { label: "Report", href: "/dashboard/report", icon: ReportIcon },
  { label: "Settings", href: "/dashboard/settings", icon: SettingsIcon },
  { label: "Help", href: "/dashboard/help", icon: HelpIcon },
];

const STORAGE_KEY = "gclout-sidebar-collapsed";

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  // Restore the collapsed preference so the toggle survives refreshes.
  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) === "1") setCollapsed(true);
    } catch {
      /* localStorage unavailable — fall back to expanded */
    }
  }, []);

  function toggle() {
    setCollapsed((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(STORAGE_KEY, next ? "1" : "0");
      } catch {
        /* ignore */
      }
      return next;
    });
  }

  return (
    <aside
      className={cn(
        "flex min-h-screen shrink-0 flex-col border-r border-gray-200 bg-surface transition-[width] duration-200",
        collapsed ? "w-16" : "w-56"
      )}
    >
      {/* Header: logo + collapse toggle */}
      <div
        className={cn(
          "py-4",
          collapsed
            ? "flex flex-col items-center gap-3 px-2"
            : "flex items-center gap-2 px-4"
        )}
      >
        <Logo className="h-9 w-9 shrink-0" />
        {!collapsed && (
          <div className="flex-1 leading-tight">
            <div className="text-sm font-semibold text-gray-900">Gclout</div>
            <div className="text-xs text-gray-500">Admin</div>
          </div>
        )}
        <button
          type="button"
          onClick={toggle}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          aria-expanded={!collapsed}
          className="text-gray-400 hover:text-gray-600"
        >
          {collapsed ? (
            <PanelLeftOpen size={18} />
          ) : (
            <PanelLeftClose size={18} />
          )}
        </button>
      </div>

      <nav className="flex-1 space-y-1 px-2 py-2">
        {navItems.map(({ label, href, icon: Icon, subItems }) => {
          const sectionOpen =
            !collapsed &&
            !!subItems?.length &&
            (pathname === href || pathname.startsWith(href + "/"));
          const active = pathname === href;
          return (
            <div key={href}>
              <Link
                href={href}
                title={collapsed ? label : undefined}
                className={cn(
                  "flex items-center rounded-md py-2 text-sm transition-colors",
                  collapsed ? "justify-center px-2" : "gap-3 px-3",
                  active
                    ? "bg-blue-50 text-primary font-medium"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <Icon size={18} filled={active} />
                {!collapsed && <span className="flex-1">{label}</span>}
                {!collapsed &&
                  !!subItems &&
                  (sectionOpen ? (
                    <ChevronDown size={14} className="text-gray-400" />
                  ) : (
                    <ChevronRight size={14} className="text-gray-400" />
                  ))}
              </Link>
              {sectionOpen && (
                <div className="mt-1 space-y-1 pl-9">
                  {subItems.map((sub) => (
                    <Link
                      key={sub.href}
                      href={sub.href}
                      className={cn(
                        "block rounded-md px-3 py-1.5 text-sm transition-colors",
                        pathname === sub.href
                          ? "text-primary font-medium"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      )}
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      <div
        className={cn(
          "flex items-center border-t border-gray-200 py-3",
          collapsed ? "justify-center px-2" : "gap-2 px-4"
        )}
      >
        <span
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-primary"
          title={collapsed ? "James Akintaro" : undefined}
        >
          JA
        </span>
        {!collapsed && (
          <>
            <div className="flex-1 overflow-hidden leading-tight">
              <div className="truncate text-sm font-medium text-gray-900">
                James Akintaro
              </div>
              <div className="truncate text-xs text-gray-500">
                jakintaro@gclout.com
              </div>
            </div>
          </>
        )}
      </div>
    </aside>
  );
}
