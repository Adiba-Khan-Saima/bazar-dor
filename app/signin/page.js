"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  Eye,
  EyeOff,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";

export default function SignInPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");
  const [showPassword, setShowPassword] =
    useState(false);
  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      toast.error(
        "ইমেইল এবং পাসওয়ার্ড দিন।"
      );
      return;
    }

    try {
      setLoading(true);

      const result =
        await authClient.signIn.email({
          email,
          password,
        });

      if (result.error) {
        toast.error(
          result.error.message ||
            "সাইন ইন করা যায়নি।"
        );
        return;
      }

      toast.success(
        "সফলভাবে সাইন ইন হয়েছে।"
      );

      router.push("/");
      router.refresh();
    } catch (error) {
      toast.error(
        "সাইন ইন করা যায়নি। আবার চেষ্টা করুন।"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (
    provider
  ) => {
    try {
      await authClient.signIn.social({
        provider,
        callbackURL: "/",
      });
    } catch (error) {
      toast.error(
        "Social sign in শুরু করা যায়নি।"
      );
    }
  };

  return (
    <main className="min-h-screen bg-[#fafcfa] px-4 py-10">
      {/* LOGO */}
      <div className="mx-auto mb-8 flex max-w-md justify-center">
        <Link
          href="/"
          className="flex items-center gap-2"
        >
          <Image
            src="/assets/logo-icon.png"
            alt="বাজার দর"
            width={42}
            height={42}
          />

          <span className="text-2xl font-bold text-[#1d271f]">
            বাজার দর
          </span>
        </Link>
      </div>

      {/* CARD */}
      <section className="mx-auto max-w-[440px] rounded-2xl border border-[#e1e8e1] bg-white p-6 shadow-sm sm:p-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#1d271f]">
            সাইন ইন করুন
          </h1>

          <p className="mt-2 text-sm text-[#667069]">
            আপনার অ্যাকাউন্টে প্রবেশ করুন
          </p>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="mt-7 space-y-5"
        >
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-[#1d271f]"
            >
              ইমেইল
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              placeholder="example@email.com"
              className="h-11 w-full rounded-lg border border-[#d8e2d8] bg-white px-4 text-sm outline-none transition placeholder:text-[#9aa39c] focus:border-[#05893e]"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-[#1d271f]"
            >
              পাসওয়ার্ড
            </label>

            <div className="relative">
              <input
                id="password"
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                value={password}
                onChange={(event) =>
                  setPassword(
                    event.target.value
                  )
                }
                placeholder="আপনার পাসওয়ার্ড"
                className="h-11 w-full rounded-lg border border-[#d8e2d8] bg-white px-4 pr-11 text-sm outline-none transition placeholder:text-[#9aa39c] focus:border-[#05893e]"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    (current) => !current
                  )
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#667069]"
                aria-label="Show or hide password"
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex h-11 w-full items-center justify-center rounded-lg bg-[#05893e] text-sm font-semibold text-white transition hover:bg-[#047f39] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading
              ? "সাইন ইন হচ্ছে..."
              : "সাইন ইন"}
          </button>
        </form>

        {/* DIVIDER */}
        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-[#e1e8e1]" />

          <span className="text-xs text-[#667069]">
            অথবা
          </span>

          <div className="h-px flex-1 bg-[#e1e8e1]" />
        </div>

        {/* SOCIAL LOGIN */}
        <div className="grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={() =>
              handleSocialLogin("google")
            }
            className="flex h-11 items-center justify-center gap-2 rounded-lg border border-[#d8e2d8] bg-white text-sm font-medium text-[#1d271f] transition hover:bg-[#f0f5f0]"
          >
            <span className="text-lg font-bold">
              G
            </span>
            Google
          </button>

          <button
            type="button"
            onClick={() =>
              handleSocialLogin("github")
            }
            className="flex h-11 items-center justify-center gap-2 rounded-lg border border-[#d8e2d8] bg-white text-sm font-medium text-[#1d271f] transition hover:bg-[#f0f5f0]"
          >
            <span className="text-xs font-bold">
              GH
            </span>
            GitHub
          </button>
        </div>

        {/* SIGN UP LINK */}
        <p className="mt-7 text-center text-sm text-[#667069]">
          অ্যাকাউন্ট নেই?{" "}
          <Link
            href="/signup"
            className="font-semibold text-[#05893e] hover:underline"
          >
            সাইন আপ করুন
          </Link>
        </p>
      </section>
    </main>
  );
}