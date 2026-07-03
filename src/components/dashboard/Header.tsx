import { Bell, Search } from "lucide-react";

export function Header() {
  return (
    <header className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-3">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Hello, James</h2>
        <p className="text-xs text-gray-500">It&apos;s Tuesday, June 10th</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="search"
            placeholder="search"
            className="w-64 rounded-full border border-gray-200 bg-white py-2 pl-9 pr-4 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
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
