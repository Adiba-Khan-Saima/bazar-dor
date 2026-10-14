"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";
import {
  UserRound,
  Pencil,
  Link2,
  LogOut,
} from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { authClient } from "@/lib/auth-client";

export default function ProfilePage() {
  const router = useRouter();

  const {
    data: session,
    isPending,
  } = authClient.useSession();

  const user = session?.user;

  useEffect(() => {
    if (!isPending && !user) {
      router.replace("/signin");
    }
  }, [isPending, user, router]);

  const handleGoogleLink = async () => {
    try {
      const result =
        await authClient.linkSocial({
          provider: "google",
          callbackURL: "/profile",
        });

      if (result?.error) {
        toast.error(
          result.error.message ||
            "Google account connect করা যায়নি।"
        );
      }
    } catch {
      toast.error(
        "Google account connect করা যায়নি।"
      );
    }
  };

  const handleLogout = async () => {
    try {
      await authClient.signOut();

      toast.success(
        "সফলভাবে সাইন আউট হয়েছে।"
      );

      router.push("/");
      router.refresh();
    } catch {
      toast.error(
        "সাইন আউট করা যায়নি।"
      );
    }
  };

  if (isPending) {
    return (
      <>
        <Navbar />

        <main className="flex min-h-[60vh] items-center justify-center">
          <p className="text-sm text-[#667069]">
            লোড হচ্ছে...
          </p>
        </main>

        <Footer />
      </>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <>
      <Navbar />

      <main className="mx-auto min-h-[65vh] max-w-[700px] px-4 py-10 sm:px-5">
        <section className="rounded-2xl border border-[#e1e8e1] bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col items-center text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#e8f6ed] text-[#05893e]">
              <UserRound size={36} />
            </div>

            <h1 className="mt-4 text-2xl font-bold text-[#1d271f]">
              {user.name || "ব্যবহারকারী"}
            </h1>

            <p className="mt-1 text-sm text-[#667069]">
              {user.email}
            </p>
          </div>

          <div className="mt-8 grid gap-3">
            <Link
              href="/profile/update"
              className="flex h-11 items-center justify-center gap-2 rounded-lg bg-[#05893e] px-5 text-sm font-semibold text-white transition hover:bg-[#047f39]"
            >
              <Pencil size={17} />
              তথ্য আপডেট করুন
            </Link>

            <button
              type="button"
              onClick={handleGoogleLink}
              className="flex h-11 items-center justify-center gap-2 rounded-lg border border-[#d8e2d8] bg-white text-sm font-semibold text-[#1d271f] transition hover:bg-[#f0f5f0]"
            >
              <Link2 size={17} />
              Google Account Connect করুন
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="flex h-11 items-center justify-center gap-2 rounded-lg border border-[#f0d2d2] bg-white text-sm font-semibold text-[#d03739] transition hover:bg-[#fdecec]"
            >
              <LogOut size={17} />
              সাইন আউট
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}