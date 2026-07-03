"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  MessageSquare,
  FileText,
  Flag,
  Settings,
  HelpCircle,
  ChevronRight,
  ChevronsUpDown,
} from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Users", href: "/dashboard/users", icon: Users, expandable: true },
  { label: "Messages", href: "/dashboard/messages", icon: MessageSquare },
  { label: "Content", href: "/dashboard/content", icon: FileText, expandable: true },
  { label: "Report", href: "/dashboard/report", icon: Flag },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
  { label: "Help", href: "/dashboard/help", icon: HelpCircle },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-56 shrink-0 border-r border-gray-200 bg-white flex flex-col min-h-screen">
      <div className="flex items-center gap-2 px-4 py-4">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
          <Logo className="text-white text-lg" />
        </span>
        <div className="flex-1 leading-tight">
          <div className="text-sm font-semibold text-gray-900">Gclout</div>
          <div className="text-xs text-gray-500">Admin</div>
        </div>
        <ChevronsUpDown size={14} className="text-gray-400" />
      </div>

      <nav className="flex-1 px-2 py-2 space-y-1">
        {navItems.map(({ label, href, icon: Icon, expandable }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                active
                  ? "bg-blue-50 text-primary font-medium"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <Icon size={16} />
              <span className="flex-1">{label}</span>
              {expandable && <ChevronRight size={14} className="text-gray-400" />}
            </Link>
          );
        })}
      </nav>

      <div className="flex items-center gap-2 border-t border-gray-200 px-4 py-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-primary">
          JA
        </span>
        <div className="flex-1 leading-tight overflow-hidden">
          <div className="truncate text-sm font-medium text-gray-900">
            James Akintaro
          </div>
          <div className="truncate text-xs text-gray-500">jakintaro@gclout.com</div>
        </div>
        <ChevronsUpDown size={14} className="text-gray-400" />
      </div>
    </aside>
  );
}
