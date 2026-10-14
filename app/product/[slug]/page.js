"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Home,
  LoaderCircle,
} from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import {
  API_BASE,
  formatBanglaPrice,
  toBanglaNumber,
} from "@/lib/helpers";

const unitNames = {
  kg: "কেজি",
  litre: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
};

export default function ProductDetailsPage() {
  const params = useParams();
  const slug = params.slug;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function getProduct() {
      try {
        setLoading(true);
        setNotFound(false);

        const response = await fetch(
          `${API_BASE}/products`
        );

        if (!response.ok) {
          throw new Error(
            "Product load failed"
          );
        }

        const data = await response.json();

        const products = Array.isArray(data)
          ? data
          : data.products ||
            data.data ||
            [];

        const matchedProduct =
          products.find(
            (item) =>
              item.slug === slug ||
              String(item.id) ===
                String(slug)
          );

        if (!matchedProduct) {
          setNotFound(true);
          setProduct(null);
          return;
        }

        setProduct(matchedProduct);
      } catch {
        setNotFound(true);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      getProduct();
    }
  }, [slug]);

  const priceSummary = useMemo(() => {
    if (!product) {
      return {
        minimum: 0,
        maximum: 0,
        average: 0,
      };
    }

    const markets =
      product.markets || [];

    if (markets.length === 0) {
      const price =
        Number(product.today) || 0;

      return {
        minimum: price,
        maximum: price,
        average: price,
      };
    }

    const minimum = Math.min(
      ...markets.map(
        (market) =>
          Number(market.min) || 0
      )
    );

    const maximum = Math.max(
      ...markets.map(
        (market) =>
          Number(market.max) || 0
      )
    );

    const average =
      markets.reduce(
        (total, market) => {
          const min =
            Number(market.min) || 0;
          const max =
            Number(market.max) || 0;

          return (
            total + (min + max) / 2
          );
        },
        0
      ) / markets.length;

    return {
      minimum,
      maximum,
      average,
    };
  }, [product]);

  if (loading) {
    return (
      <>
        <Navbar />

        <main className="flex min-h-[65vh] flex-col items-center justify-center gap-3">
          <LoaderCircle
            size={34}
            className="animate-spin text-[#05893e]"
          />

          <p className="text-sm text-[#667069]">
            পণ্যের তথ্য লোড হচ্ছে...
          </p>
        </main>

        <Footer />
      </>
    );
  }

  if (notFound || !product) {
    return (
      <>
        <Navbar />

        <main className="flex min-h-[65vh] flex-col items-center justify-center px-4 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#f0f5f0] text-3xl">
            🛒
          </div>

          <p className="mt-5 font-semibold text-[#05893e]">
            404
          </p>

          <h1 className="mt-2 text-3xl font-bold text-[#1d271f]">
            পণ্যটি পাওয়া যায়নি
          </h1>

          <p className="mt-3 text-sm text-[#667069]">
            আপনি যে পণ্যটি খুঁজছেন সেটি
            পাওয়া যায়নি।
          </p>

          <Link
            href="/"
            className="mt-6 inline-flex h-11 items-center gap-2 rounded-lg bg-[#05893e] px-5 text-sm font-semibold text-white transition hover:bg-[#047f39]"
          >
            <Home size={17} />
            হোম পেজে ফিরে যান
          </Link>
        </main>

        <Footer />
      </>
    );
  }

  const direction =
    product.change?.dir || "flat";

  const percentage =
    Number(product.change?.pct) || 0;

  const unit =
    unitNames[product.unit] ||
    product.unit;

  return (
    <>
      <Navbar />

      <main className="mx-auto min-h-[65vh] max-w-[1152px] px-4 py-10 sm:px-5 lg:px-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#667069] transition hover:text-[#05893e]"
        >
          <ArrowLeft size={17} />
          ফিরে যান
        </Link>

        {/* PRODUCT TOP */}
        <section className="mt-7 rounded-2xl border border-[#e1e8e1] bg-white p-6 sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-[#f0f5f0] text-5xl">
              {product.image ||
                product.categoryIcon ||
                "🛒"}
            </div>

            <div className="flex-1">
              <h1 className="text-3xl font-bold text-[#1d271f]">
                {product.nameBn}
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#667069]">
                {product.nameBn} এর আজকের
                বাজারদর ও বিভিন্ন বাজারের
                সর্বনিম্ন এবং সর্বোচ্চ দামের
                তথ্য দেখুন।
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-full bg-[#e8f6ed] px-3 py-1 text-sm font-medium text-[#05893e]">
                  {product.categoryNameBn}
                </span>

                <span className="rounded-full bg-[#f0f5f0] px-3 py-1 text-sm font-medium text-[#667069]">
                  প্রতি {unit}
                </span>

                {direction === "up" && (
                  <span className="rounded-full bg-[#e8f6ed] px-3 py-1 text-sm font-semibold text-[#05893e]">
                    ▲{" "}
                    {toBanglaNumber(
                      Math.abs(percentage)
                    )}
                    %
                  </span>
                )}

                {direction ===
                  "down" && (
                  <span className="rounded-full bg-[#fdecec] px-3 py-1 text-sm font-semibold text-[#d03739]">
                    ▼{" "}
                    {toBanglaNumber(
                      Math.abs(percentage)
                    )}
                    %
                  </span>
                )}

                {direction ===
                  "flat" && (
                  <span className="rounded-full bg-[#f0f2f0] px-3 py-1 text-sm font-semibold text-[#667069]">
                    — ০%
                  </span>
                )}
              </div>

              <div className="mt-6">
                <p className="text-sm text-[#667069]">
                  আজকের দাম
                </p>

                <p className="mt-1 text-3xl font-bold text-[#05893e]">
                  {formatBanglaPrice(
                    product.today
                  )}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SUMMARY */}
        <section className="mt-9">
          <h2 className="text-2xl font-bold text-[#1d271f]">
            দামের সারসংক্ষেপ
          </h2>

          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <PriceSummary
              label="সর্বনিম্ন দাম"
              value={
                priceSummary.minimum
              }
            />

            <PriceSummary
              label="সর্বোচ্চ দাম"
              value={
                priceSummary.maximum
              }
            />

            <PriceSummary
              label="গড় দাম"
              value={
                priceSummary.average
              }
            />
          </div>
        </section>

        {/* MARKET LIST */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-[#1d271f]">
            বাজারভিত্তিক আজকের দাম
          </h2>

          <div className="mt-5 overflow-hidden rounded-2xl border border-[#e1e8e1] bg-white">
            {product.markets?.length >
            0 ? (
              <div className="divide-y divide-[#e1e8e1]">
                {product.markets.map(
                  (market, index) => (
                    <div
                      key={`${market.market}-${index}`}
                      className="flex flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6"
                    >
                      <div>
                        <p className="font-semibold text-[#1d271f]">
                          {
                            market.market
                          }
                        </p>

                        <p className="mt-1 text-xs text-[#667069]">
                          {
                            market.division
                          }
                        </p>
                      </div>

                      <div className="flex gap-7">
                        <div>
                          <p className="text-xs text-[#667069]">
                            সর্বনিম্ন
                          </p>

                          <p className="mt-1 font-bold text-[#1d271f]">
                            {formatBanglaPrice(
                              market.min
                            )}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs text-[#667069]">
                            সর্বোচ্চ
                          </p>

                          <p className="mt-1 font-bold text-[#05893e]">
                            {formatBanglaPrice(
                              market.max
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            ) : (
              <p className="p-8 text-center text-sm text-[#667069]">
                বাজারের তথ্য পাওয়া যায়নি।
              </p>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

function PriceSummary({
  label,
  value,
}) {
  return (
    <div className="rounded-2xl border border-[#e1e8e1] bg-white p-5">
      <p className="text-sm text-[#667069]">
        {label}
      </p>

      <p className="mt-2 text-2xl font-bold text-[#1d271f]">
        {formatBanglaPrice(
          Math.round(value || 0)
        )}
      </p>
    </div>
  );
}