"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import {
  ArrowLeft,
  Save,
  UserRound,
} from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { authClient } from "@/lib/auth-client";

export default function UpdateProfilePage() {
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
    <UpdateProfileForm
      key={user.id}
      initialName={user.name || ""}
      email={user.email || ""}
      router={router}
    />
  );
}

function UpdateProfileForm({
  initialName,
  email,
  router,
}) {
  const [name, setName] =
    useState(initialName);

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!name.trim()) {
      toast.error("নাম লিখুন।");
      return;
    }

    try {
      setLoading(true);

      const result =
        await authClient.updateUser({
          name: name.trim(),
        });

      if (result?.error) {
        toast.error(
          result.error.message ||
            "তথ্য আপডেট করা যায়নি।"
        );
        return;
      }

      toast.success(
        "তথ্য সফলভাবে আপডেট হয়েছে।"
      );

      router.push("/profile");
      router.refresh();
    } catch {
      toast.error(
        "তথ্য আপডেট করা যায়নি।"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <main className="mx-auto min-h-[65vh] max-w-[600px] px-4 py-10 sm:px-5">
        <Link
          href="/profile"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#667069] hover:text-[#05893e]"
        >
          <ArrowLeft size={17} />
          প্রোফাইলে ফিরে যান
        </Link>

        <section className="mt-6 rounded-2xl border border-[#e1e8e1] bg-white p-6 shadow-sm sm:p-8">
          <div className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#e8f6ed] text-[#05893e]">
              <UserRound size={30} />
            </div>

            <h1 className="mt-4 text-2xl font-bold text-[#1d271f]">
              তথ্য আপডেট করুন
            </h1>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-7 space-y-5"
          >
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-[#1d271f]"
              >
                নাম
              </label>

              <input
                id="name"
                type="text"
                value={name}
                onChange={(event) =>
                  setName(event.target.value)
                }
                className="h-11 w-full rounded-lg border border-[#d8e2d8] px-4 text-sm outline-none focus:border-[#05893e]"
              />
            </div>

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
                disabled
                className="h-11 w-full cursor-not-allowed rounded-lg border border-[#e1e8e1] bg-[#f0f5f0] px-4 text-sm text-[#667069]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#05893e] text-sm font-semibold text-white transition hover:bg-[#047f39] disabled:opacity-60"
            >
              <Save size={17} />

              {loading
                ? "আপডেট হচ্ছে..."
                : "আপডেট করুন"}
            </button>
          </form>
        </section>
      </main>

      <Footer />
    </>
  );
}