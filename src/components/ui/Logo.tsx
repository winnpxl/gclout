import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <span
      className={cn(
        "inline-flex items-start text-2xl font-bold leading-none text-primary",
        className
      )}
    >
      G<span className="text-sm leading-none">˙</span>
    </span>
  );
}
