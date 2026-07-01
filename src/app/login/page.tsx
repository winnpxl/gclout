"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";

type Step = "email" | "password";

export default function LoginPage() {
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function handleContinue() {
    if (step === "email" && email.trim()) {
      setStep("password");
    } else if (step === "password" && password) {
      // TODO: submit credentials
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center bg-white">
      {/* Top logo */}
      <div className="pt-8">
        <Logo />
      </div>

      {/* Centered card */}
      <div className="flex flex-1 flex-col items-center justify-center w-full">
        <div className="w-full max-w-sm px-4">
          <div className="text-center mb-6">
            <h1 className="text-xl font-semibold text-gray-900">Gclout Admin</h1>
            <p className="text-sm text-gray-500 mt-1">
              {step === "email"
                ? "Welcome, please enter your details"
                : "Enter your password"}
            </p>
          </div>

          <div className="space-y-4">
            {step === "email" ? (
              <div>
                <label className="block text-sm text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jakintaro@gclout.com"
                  onKeyDown={(e) => e.key === "Enter" && handleContinue()}
                  className={cn(
                    "w-full px-3 py-2 border border-gray-300 rounded text-sm",
                    "placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  )}
                />
              </div>
            ) : (
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Enter your password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleContinue()}
                    autoFocus
                    className={cn(
                      "w-full px-3 py-2 pr-10 border border-gray-300 rounded text-sm",
                      "placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    )}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
            )}

            <button
              onClick={handleContinue}
              className={cn(
                "w-full py-2 rounded text-sm font-medium text-white bg-[#2563EB]",
                "hover:bg-blue-700 transition-colors"
              )}
            >
              Continue
            </button>

            <div className="text-center">
              <button className="text-sm text-[#2563EB] hover:underline">
                Forgot password?
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
