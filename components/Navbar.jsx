"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  ChevronDown,
  LogOut,
  UserRound,
} from "lucide-react";

import PriceTicker from "@/components/PriceTicker";
import { authClient } from "@/lib/auth-client";
import { getBanglaDate } from "@/lib/helpers";

const categories = [
  {
    name: "চাল",
    icon: "🍚",
    slug: "chal",
  },
  {
    name: "ডাল",
    icon: "🫘",
    slug: "dal",
  },
  {
    name: "তেল",
    icon: "🛢️",
    slug: "tel",
  },
  {
    name: "সবজি",
    icon: "🥬",
    slug: "sobji",
  },
  {
    name: "মাছ",
    icon: "🐟",
    slug: "mach",
  },
  {
    name: "মাংস",
    icon: "🍗",
    slug: "mangsho",
  },
  {
    name: "ডিম-দুধ",
    icon: "🥛",
    slug: "dim-dui",
  },
  {
    name: "মসলা",
    icon: "🌶️",
    slug: "mosla",
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [menuOpen, setMenuOpen] = useState(false);

  const {
    data: session,
    isPending,
  } = authClient.useSession();

  const user = session?.user;

  const handleSignOut = async () => {
    try {
      const result =
        await authClient.signOut();

      if (result?.error) {
        toast.error(
          "সাইন আউট করা যায়নি।"
        );
        return;
      }

      setMenuOpen(false);

      toast.success(
        "সফলভাবে সাইন আউট হয়েছে।"
      );

      router.push("/");
      router.refresh();
    } catch (error) {
      toast.error(
        "সাইন আউট করা যায়নি।"
      );
    }
  };

  return (
    <>
      <header className="border-b border-[#e1e8e1] bg-white">
        {/* TOP ROW */}
        <div className="mx-auto flex min-h-[68px] max-w-[1164px] items-center justify-between gap-4 px-4 sm:px-5 lg:px-4">
          {/* LOGO */}
          <Link
            href="/"
            className="flex items-center gap-2"
          >
            <Image
              src="/assets/logo-icon.png"
              alt="বাজার দর"
              width={40}
              height={40}
              priority
              className="h-10 w-10 object-contain"
            />

            <div>
              <h2 className="text-[22px] font-bold leading-7 text-[#1d271f]">
                বাজার দর
              </h2>

              <p className="hidden text-[12px] leading-4 text-[#667069] sm:block">
                {getBanglaDate()}
              </p>
            </div>
          </Link>

          {/* LOGGED OUT */}
          {!isPending && !user && (
            <div className="flex items-center gap-2">
              <Link
                href="/signin"
                className="flex h-10 items-center justify-center rounded-lg px-4 text-sm font-semibold text-[#1d271f] transition hover:bg-[#f0f5f0]"
              >
                সাইন ইন
              </Link>

              <Link
                href="/signup"
                className="flex h-10 items-center justify-center rounded-lg bg-[#05893e] px-4 text-sm font-semibold text-white transition hover:bg-[#047f39]"
              >
                সাইন আপ
              </Link>
            </div>
          )}

          {/* LOGGED IN */}
          {!isPending && user && (
            <div className="relative">
              <button
                type="button"
                onClick={() =>
                  setMenuOpen(
                    (current) => !current
                  )
                }
                className="flex h-10 items-center gap-2 rounded-lg px-2 transition hover:bg-[#f0f5f0]"
              >
                <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-[#e8f6ed] text-[#05893e]">
                  {user.image ? (
                    <img
                      src={user.image}
                      alt={
                        user.name ||
                        "User"
                      }
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <UserRound size={19} />
                  )}
                </div>

                <span className="hidden max-w-[110px] truncate text-sm font-medium text-[#1d271f] sm:block">
                  {user.name ||
                    "ব্যবহারকারী"}
                </span>

                <ChevronDown
                  size={15}
                  className={`transition ${
                    menuOpen
                      ? "rotate-180"
                      : ""
                  }`}
                />
              </button>

              {menuOpen && (
                <div className="absolute right-0 top-12 z-50 w-44 overflow-hidden rounded-xl border border-[#e1e8e1] bg-white p-1.5 shadow-lg">
                  <Link
                    href="/profile"
                    onClick={() =>
                      setMenuOpen(false)
                    }
                    className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-[#1d271f] transition hover:bg-[#f0f5f0]"
                  >
                    <UserRound size={17} />
                    আমার প্রোফাইল
                  </Link>

                  <button
                    type="button"
                    onClick={
                      handleSignOut
                    }
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm text-[#d03739] transition hover:bg-[#fdecec]"
                  >
                    <LogOut size={17} />
                    সাইন আউট
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* CATEGORY NAV */}
        <div className="border-t border-[#f0f3f0]">
          <nav className="mx-auto max-w-[1152px] overflow-x-auto px-4 sm:px-5 lg:px-4">
            <div className="flex min-w-max items-center gap-1 py-2">
              {categories.map(
                (category) => {
                  const href =
                    `/category/${category.slug}`;

                  const isActive =
                    pathname === href;

                  return (
                    <Link
                      key={
                        category.slug
                      }
                      href={href}
                      className={`flex h-8 items-center gap-1.5 rounded-lg px-3 text-sm font-medium transition ${
                        isActive
                          ? "bg-[#05893e] text-white"
                          : "text-[#1d271f] hover:bg-[#f0f5f0]"
                      }`}
                    >
                      <span>
                        {
                          category.icon
                        }
                      </span>

                      <span>
                        {
                          category.name
                        }
                      </span>
                    </Link>
                  );
                }
              )}
            </div>
          </nav>
        </div>
      </header>

      <PriceTicker />
    </>
  );
}