import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  variant?: "dark" | "light";
}

export function Logo({ className, variant = "dark" }: LogoProps) {
  const color = variant === "light" ? "text-white" : "text-[#2563EB]";
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span className={cn("text-2xl font-bold leading-none", color)}>
        G<sup className="text-sm">+</sup>
      </span>
    </div>
  );
}
