import Link from "next/link";

import {
  formatBanglaPrice,
  toBanglaNumber,
} from "@/lib/helpers";

export default function ProductCard({ product }) {
  const productLink =
    product.slug || product.id;

  const name =
    product.nameBn || "পণ্যের নাম";

  const emoji =
    product.image ||
    product.categoryIcon ||
    "🛒";

  const price =
    Number(product.today) || 0;

  const unit =
    product.unit || "";

  const changeDirection =
    product.change?.dir || "flat";

  const changePercent =
    Number(product.change?.pct) || 0;

  const getChangeStyle = () => {
    if (changeDirection === "up") {
      return {
        text: `▲ ${toBanglaNumber(
          Math.abs(changePercent)
        )}%`,
        className:
          "bg-[#e8f6ed] text-[#05893e]",
      };
    }

    if (changeDirection === "down") {
      return {
        text: `▼ ${toBanglaNumber(
          Math.abs(changePercent)
        )}%`,
        className:
          "bg-[#fdecec] text-[#d03739]",
      };
    }

    return {
      text: "— ০%",
      className:
        "bg-[#f0f2f0] text-[#667069]",
    };
  };

  const changeInfo = getChangeStyle();

  return (
    <Link
      href={`/product/${productLink}`}
      className="group flex min-h-[138px] items-center gap-4 rounded-2xl border border-[#e1e8e1] bg-white p-5 transition hover:-translate-y-0.5 hover:border-[#05893e]/40 hover:shadow-sm"
    >
      {/* PRODUCT IMAGE / EMOJI */}
      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#f0f5f0] text-4xl">
        {emoji}
      </div>

      {/* PRODUCT INFO */}
      <div className="min-w-0 flex-1">
        <h3 className="truncate text-lg font-semibold text-[#1d271f]">
          {name}
        </h3>

        <p className="mt-1 text-sm text-[#667069]">
          {unit}
        </p>

        <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs text-[#667069]">
              আজকের দাম
            </p>

            <p className="mt-0.5 text-lg font-bold text-[#1d271f]">
              {formatBanglaPrice(price)}
            </p>
          </div>

          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${changeInfo.className}`}
          >
            {changeInfo.text}
          </span>
        </div>
      </div>
    </Link>
  );
}