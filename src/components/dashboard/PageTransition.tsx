"use client";

import { usePathname } from "next/navigation";

/**
 * Replays an enter animation on every route change by remounting on pathname.
 * App Router renders the incoming page before the old one unmounts, so exit
 * animations are unreliable — animating the enter keyed by pathname is the
 * robust approach.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div key={pathname} className="page-transition">
      {children}
    </div>
  );
}
