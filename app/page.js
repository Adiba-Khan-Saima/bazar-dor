"use client";

import { useEffect, useMemo, useState } from "react";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import ProductSkeleton from "@/components/ProductSkeleton";
import Footer from "@/components/Footer";

import {
  API_BASE,
  toBanglaNumber,
} from "@/lib/helpers";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getProducts() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_BASE}/products`
        );

        if (!response.ok) {
          throw new Error(
            "Failed to load products"
          );
        }

        const data = await response.json();

        const productList = Array.isArray(data)
          ? data
          : data.products ||
            data.data ||
            [];

        setProducts(productList);
      } catch (error) {
        setError(
          "পণ্যের তথ্য লোড করা যায়নি।"
        );
      } finally {
        setLoading(false);
      }
    }

    getProducts();
  }, []);

  const getChange = (product) => {
    return Number(
      product.change?.pct || 0
    );
  };

  const priceRisers = useMemo(() => {
    return [...products]
      .filter(
        (product) =>
          product.change?.dir === "up"
      )
      .sort(
        (a, b) =>
          getChange(b) - getChange(a)
      )
      .slice(0, 6);
  }, [products]);

  const priceFallers = useMemo(() => {
    return [...products]
      .filter(
        (product) =>
          product.change?.dir === "down"
      )
      .sort(
        (a, b) =>
          getChange(a) - getChange(b)
      )
      .slice(0, 6);
  }, [products]);

  return (
    <>
      <Navbar />

      <main>
        <Hero />

        {/* PRICE RISERS */}
        <section className="mx-auto max-w-[1152px] px-4 pt-14 sm:px-5 lg:px-4">
          <div className="mb-5 flex items-center gap-2">
            <h2 className="text-2xl font-bold text-[#1d271f]">
              আজ দাম বেড়েছে
            </h2>

            <span className="text-lg font-bold text-[#05893e]">
              ▲
            </span>
          </div>

          {loading ? (
            <ProductSkeletonGrid />
          ) : priceRisers.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {priceRisers.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>
          ) : (
            <p className="text-sm text-[#667069]">
              আজ দাম বেড়েছে এমন কোনো পণ্য নেই।
            </p>
          )}
        </section>

        {/* PRICE FALLERS */}
        <section className="mx-auto max-w-[1152px] px-4 pt-14 sm:px-5 lg:px-4">
          <div className="mb-5 flex items-center gap-2">
            <h2 className="text-2xl font-bold text-[#1d271f]">
              আজ দাম কমেছে
            </h2>

            <span className="text-lg font-bold text-[#d03739]">
              ▼
            </span>
          </div>

          {loading ? (
            <ProductSkeletonGrid />
          ) : priceFallers.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {priceFallers.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>
          ) : (
            <p className="text-sm text-[#667069]">
              আজ দাম কমেছে এমন কোনো পণ্য নেই।
            </p>
          )}
        </section>

        {/* ALL PRODUCTS */}
        <section
          id="সব-পণ্য"
          className="mx-auto max-w-[1152px] scroll-mt-6 px-4 pt-14 sm:px-5 lg:px-4"
        >
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-[#1d271f]">
              সব পণ্য
            </h2>

            {!loading && !error && (
              <p className="mt-1 text-sm text-[#667069]">
                মোট{" "}
                {toBanglaNumber(
                  products.length
                )}
                টি পণ্য দেখানো হচ্ছে
              </p>
            )}
          </div>

          {loading && (
            <ProductSkeletonGrid count={9} />
          )}

          {!loading && error && (
            <div className="rounded-2xl border border-[#f0d2d2] bg-[#fff7f7] px-5 py-10 text-center">
              <p className="font-medium text-[#d03739]">
                {error}
              </p>
            </div>
          )}

          {!loading &&
            !error &&
            products.length > 0 && (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                  />
                ))}
              </div>
            )}

          {!loading &&
            !error &&
            products.length === 0 && (
              <div className="py-12 text-center text-[#667069]">
                কোনো পণ্য পাওয়া যায়নি।
              </div>
            )}
        </section>
      </main>

      <Footer />
    </>
  );
}

function ProductSkeletonGrid({
  count = 6,
}) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({
        length: count,
      }).map((_, index) => (
        <ProductSkeleton key={index} />
      ))}
    </div>
  );
} 