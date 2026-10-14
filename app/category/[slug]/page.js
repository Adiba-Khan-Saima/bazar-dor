"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ChevronDown, Home } from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import ProductSkeleton from "@/components/ProductSkeleton";

import {
  API_BASE,
  toBanglaNumber,
} from "@/lib/helpers";

const categoryInfo = {
  chal: {
    name: "চাল",
    icon: "🍚",
  },
  dal: {
    name: "ডাল",
    icon: "🫘",
  },
  tel: {
    name: "তেল",
    icon: "🛢️",
  },
  sobji: {
    name: "সবজি",
    icon: "🥬",
  },
  mach: {
    name: "মাছ",
    icon: "🐟",
  },
  mangsho: {
    name: "মাংস",
    icon: "🍗",
  },
  "dim-dui": {
    name: "ডিম-দুধ",
    icon: "🥛",
  },
  mosla: {
    name: "মসলা",
    icon: "🌶️",
  },
};

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("default");

  const category = categoryInfo[slug];

  useEffect(() => {
    async function getProducts() {
      if (!category) {
        setProducts([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const response = await fetch(
          `${API_BASE}/products?category=${slug}`
        );

        if (!response.ok) {
          throw new Error("Failed to load category");
        }

        const data = await response.json();

        const productList = Array.isArray(data)
          ? data
          : data.products ||
            data.data ||
            [];

        setProducts(productList);
      } catch (error) {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    getProducts();
  }, [slug, category]);

  const sortedProducts = useMemo(() => {
    const sorted = [...products];

    if (sortBy === "low") {
      sorted.sort(
        (a, b) =>
          Number(a.today || 0) -
          Number(b.today || 0)
      );
    }

    if (sortBy === "high") {
      sorted.sort(
        (a, b) =>
          Number(b.today || 0) -
          Number(a.today || 0)
      );
    }

    return sorted;
  }, [products, sortBy]);

  return (
    <>
      <Navbar />

      <main className="mx-auto min-h-[65vh] max-w-[1152px] px-4 py-10 sm:px-5 lg:px-4">
        {!loading &&
        (!category || sortedProducts.length === 0) ? (
          <EmptyCategory />
        ) : (
          <>
            {/* HEADER */}
            <section className="flex flex-col gap-5 border-b border-[#e1e8e1] pb-7 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <span className="text-4xl">
                    {category?.icon}
                  </span>

                  <h1 className="text-3xl font-bold text-[#1d271f]">
                    {category?.name}
                  </h1>
                </div>

                {!loading && (
                  <p className="mt-2 text-sm text-[#667069]">
                    মোট{" "}
                    {toBanglaNumber(products.length)}
                    টি পণ্য পাওয়া গেছে
                  </p>
                )}
              </div>

              {/* SORT */}
              <div className="w-full sm:w-auto">
                <label
                  htmlFor="sort"
                  className="mb-2 block text-sm font-medium text-[#667069]"
                >
                  সাজান
                </label>

                <div className="relative">
                  <select
                    id="sort"
                    value={sortBy}
                    onChange={(event) =>
                      setSortBy(event.target.value)
                    }
                    className="h-11 w-full appearance-none rounded-lg border border-[#d8e2d8] bg-white pl-4 pr-10 text-sm font-medium text-[#1d271f] outline-none transition focus:border-[#05893e] sm:w-[210px]"
                  >
                    <option value="default">
                      ডিফল্ট
                    </option>

                    <option value="low">
                      দাম: কম থেকে বেশি
                    </option>

                    <option value="high">
                      দাম: বেশি থেকে কম
                    </option>
                  </select>

                  <ChevronDown
                    size={17}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#667069]"
                  />
                </div>
              </div>
            </section>

            {/* PRODUCTS */}
            <section className="pt-8">
              {loading ? (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {Array.from({
                    length: 9,
                  }).map((_, index) => (
                    <ProductSkeleton
                      key={index}
                    />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {sortedProducts.map(
                    (product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                      />
                    )
                  )}
                </div>
              )}
            </section>
          </>
        )}
      </main>

      <Footer />
    </>
  );
}

function EmptyCategory() {
  return (
    <div className="flex min-h-[480px] flex-col items-center justify-center text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#f0f5f0] text-3xl">
        🛒
      </div>

      <p className="mt-5 text-sm font-semibold text-[#05893e]">
        404
      </p>

      <h1 className="mt-2 text-3xl font-bold text-[#1d271f]">
        কোনো পণ্য পাওয়া যায়নি
      </h1>

      <p className="mt-3 max-w-md text-sm leading-6 text-[#667069]">
        এই ক্যাটাগরিটি পাওয়া যায়নি অথবা এখানে
        এখনো কোনো পণ্য নেই।
      </p>

      <Link
        href="/"
        className="mt-6 inline-flex h-11 items-center gap-2 rounded-lg bg-[#05893e] px-5 text-sm font-semibold text-white transition hover:bg-[#047f39]"
      >
        <Home size={17} />
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}