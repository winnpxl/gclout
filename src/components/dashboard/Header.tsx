import { Bell, Search } from "lucide-react";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { MobileMenuButton } from "@/components/dashboard/MobileNav";

export function Header() {
  return (
    <header className="flex items-center justify-between gap-3 border-b border-gray-200 bg-surface px-4 py-3 sm:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <MobileMenuButton />
        <div className="min-w-0">
          <h2 className="truncate text-lg font-semibold text-gray-900">
            Hello, James
          </h2>
          <p className="truncate text-xs text-gray-500">
            It&apos;s Tuesday, June 10th
          </p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-4">
        <div className="relative hidden sm:block">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="search"
            placeholder="search"
            className="w-48 rounded-full lg:w-64 border border-gray-200 bg-surface py-2 pl-9 pr-4 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <ThemeToggle />
        <button
          type="button"
          aria-label="Notifications"
          className="text-gray-500 hover:text-gray-700"
        >
          <Bell size={18} />
        </button>
      </div>
    </header>
  );
}
