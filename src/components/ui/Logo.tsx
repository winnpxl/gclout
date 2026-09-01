import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

/**
 * Renders the brand logo from /images/logo.png. Replace that file to update the
 * logo everywhere (login, splash, sidebar, settings). Sized with h-* w-auto by
 * callers so it works for a square mark or a wide wordmark.
 */
export function Logo({ className }: LogoProps) {
  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src="/images/logo.png"
      alt="Gclout"
      className={cn("h-8 w-auto object-contain", className)}
    />
  );
}
