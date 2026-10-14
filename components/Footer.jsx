import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-[#e1e8e1] bg-white">
      <div className="mx-auto flex max-w-[1152px] flex-col gap-4 px-4 py-8 sm:px-5 md:flex-row md:items-center md:justify-between lg:px-4">
        <div>
          <Link
            href="/"
            className="text-lg font-bold text-[#05893e]"
          >
            বাজার দর
          </Link>

          <p className="mt-1 text-sm text-[#667069]">
            প্রয়োজনীয় পণ্যের দাম এক নজরে।
          </p>
        </div>

        <p className="max-w-md text-sm leading-6 text-[#667069] md:text-right">
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </p>
      </div>
    </footer>
  );
}