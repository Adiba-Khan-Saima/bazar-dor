"use client";

import { useEffect, useState } from "react";

import {
  API_BASE,
  toBanglaNumber,
} from "@/lib/helpers";

export default function PriceTicker() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function getProducts() {
      try {
        const response = await fetch(
          `${API_BASE}/products`
        );

        if (!response.ok) {
          throw new Error(
            "Failed to load ticker products"
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
        console.error(
          "Could not load ticker products:",
          error
        );
      }
    }

    getProducts();
  }, []);

  if (products.length === 0) {
    return null;
  }

  const tickerProducts = [
    ...products,
    ...products,
  ];

  return (
    <div className="overflow-hidden border-y border-[#e1e8e1] bg-[#f0f5f0]">
      <div className="ticker-track">
        {tickerProducts.map(
          (product, index) => {
            const name =
              product.nameBn ||
              "পণ্য";

            const emoji =
              product.image ||
              product.categoryIcon ||
              "🛒";

            const price =
              Number(product.today) || 0;

            const unit =
              product.unit || "";

            const direction =
              product.change?.dir ||
              "flat";

            const percentage =
              Number(
                product.change?.pct
              ) || 0;

            return (
              <div
                key={`${product.id}-${index}`}
                className="flex shrink-0 items-center gap-2 border-r border-[#d8e2d8] px-6 py-2 text-sm text-[#1d271f]"
              >
                <span className="text-lg">
                  {emoji}
                </span>

                <span className="font-medium">
                  {name}
                </span>

                <span className="text-[#667069]">
                  {toBanglaNumber(
                    price
                  )}{" "}
                  টাকা/{unit}
                </span>

                {direction === "up" && (
                  <span className="font-semibold text-[#05893e]">
                    ▲{" "}
                    {toBanglaNumber(
                      Math.abs(
                        percentage
                      )
                    )}
                    %
                  </span>
                )}

                {direction ===
                  "down" && (
                  <span className="font-semibold text-[#d03739]">
                    ▼{" "}
                    {toBanglaNumber(
                      Math.abs(
                        percentage
                      )
                    )}
                    %
                  </span>
                )}

                {direction ===
                  "flat" && (
                  <span className="font-semibold text-[#667069]">
                    — ০%
                  </span>
                )}
              </div>
            );
          }
        )}
      </div>
    </div>
  );
}