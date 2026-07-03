"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";

type Step = "email" | "password";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const inputClasses = cn(
  "w-full px-3 py-2 border border-gray-300 rounded text-sm",
  "placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
);

export default function LoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const canContinue =
    step === "email" ? EMAIL_RE.test(email.trim()) : password.length > 0;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canContinue) return;
    if (step === "email") {
      setStep("password");
    } else {
      // TODO: submit credentials to the auth API
      router.push("/dashboard");
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center bg-white">
      <div className="pt-8">
        <Logo />
      </div>

      <div className="flex flex-1 flex-col items-center justify-center w-full">
        <div className="w-full max-w-sm px-4">
          <div className="text-center mb-6">
            <h1 className="text-xl font-semibold text-gray-900">Gclout Admin</h1>
            <p className="text-sm text-gray-500 mt-1">
              Welcome, please enter your details
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {step === "email" ? (
              <div>
                <label htmlFor="email" className="block text-sm text-gray-700 mb-1">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@gclout.com"
                  autoFocus
                  className={inputClasses}
                />
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label htmlFor="password" className="text-sm text-gray-700">
                    Enter your password
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setStep("email");
                      setPassword("");
                    }}
                    className="text-xs text-primary hover:underline"
                  >
                    {email}
                  </button>
                </div>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoFocus
                    className={cn(inputClasses, "pr-10")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={!canContinue}
              className={cn(
                "w-full py-2 rounded text-sm font-medium text-white bg-primary",
                "hover:bg-blue-700 transition-colors",
                "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-primary"
              )}
            >
              Continue
            </button>

            <div className="text-center">
              <button type="button" className="text-sm text-primary hover:underline">
                Forgot password?
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
