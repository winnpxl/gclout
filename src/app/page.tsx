"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/ui/Logo";

export default function SplashPage() {
  const router = useRouter();

  useEffect(() => {
    const t = setTimeout(() => router.push("/login"), 2500);
    return () => clearTimeout(t);
  }, [router]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#a8c8f8] via-[#c5d9f8] to-[#e8f0fe]">
      <div className="flex items-center gap-3">
        <Logo variant="light" className="scale-150" />
        <span className="text-white text-3xl font-semibold tracking-wide">
          Gclout Admin
        </span>
      </div>
    </main>
  );
}
