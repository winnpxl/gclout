"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

/**
 * Shared open/closed state for the sidebar drawer on small screens
 * (below the `md` breakpoint). On larger screens the sidebar is always
 * visible and this state is ignored.
 */
const MobileNavContext = createContext<{
  open: boolean;
  setOpen: (open: boolean) => void;
}>({ open: false, setOpen: () => {} });

export function useMobileNav() {
  return useContext(MobileNavContext);
}

export function MobileNavProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // Remember which page the drawer was opened on. Navigating to another
  // page makes `open` false automatically, so the drawer closes itself.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const setOpen = (next: boolean) => setOpenOn(next ? pathname : null);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenOn(null);
    };
    // If the window grows to desktop width, drop the drawer state.
    const desktop = window.matchMedia("(min-width: 768px)");
    const onResize = () => desktop.matches && setOpenOn(null);

    // Stop the page behind the drawer from scrolling.
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onResize);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onResize);
    };
  }, [open]);

  return (
    <MobileNavContext.Provider value={{ open, setOpen }}>
      {children}
    </MobileNavContext.Provider>
  );
}

export function MobileMenuButton() {
  const { open, setOpen } = useMobileNav();
  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      aria-label="Open menu"
      aria-expanded={open}
      aria-controls="dashboard-sidebar"
      className="-ml-1 rounded-md p-1 text-gray-500 hover:bg-gray-50 hover:text-gray-700 md:hidden"
    >
      <Menu size={22} />
    </button>
  );
}
