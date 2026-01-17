"use client";

import { useState, useMemo } from "react";
import { ProductCard } from "@/components/domain/product-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Product } from "@/lib/services/product.service";

interface CategoryListingProps {
  category: string;
  categoryName: string;
  categoryDescription: string;
  products: Product[];
}

type SortOption = "newest" | "price-low" | "price-high";
const PRODUCTS_PER_PAGE = 12;

export function CategoryListing({
  category,
  categoryName,
  categoryDescription,
  products,
}: CategoryListingProps) {
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [currentPage, setCurrentPage] = useState(1);

  const sortedProducts = useMemo(() => {
    const sorted = [...products];

    switch (sortBy) {
      case "price-low":
        return sorted.sort((a, b) => a.price - b.price);
      case "price-high":
        return sorted.sort((a, b) => b.price - a.price);
      case "newest":
      default:
        return sorted;
    }
  }, [products, sortBy]);

  const paginatedProducts = useMemo(() => {
    const startIdx = (currentPage - 1) * PRODUCTS_PER_PAGE;
    const endIdx = startIdx + PRODUCTS_PER_PAGE;
    return sortedProducts.slice(startIdx, endIdx);
  }, [sortedProducts, currentPage]);

  const totalPages = Math.ceil(sortedProducts.length / PRODUCTS_PER_PAGE);
  const hasNextPage = currentPage < totalPages;
  const hasPrevPage = currentPage > 1;

  const handleNextPage = () => {
    if (hasNextPage) {
      setCurrentPage((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrevPage = () => {
    if (hasPrevPage) {
      setCurrentPage((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Category Header */}
      <section className="border-b border-gray-100 py-4 md:py-5">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-medium text-black leading-tight">
              {categoryName}
            </h1>
            <p className="text-gray-500 max-w-xl text-sm leading-relaxed">
              {categoryDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Controls */}
      {products.length > 0 && (
        <section className="border-b border-gray-800 py-8">
          <div className="container mx-auto px-4 md:px-8 max-w-7xl">
            <div className="flex items-center justify-between gap-8">
              <span className="text-sm text-gray-400">
                {sortedProducts.length} product{sortedProducts.length !== 1 ? "s" : ""}
              </span>

              <div className="flex items-center gap-4">
                <label htmlFor="sort" className="text-sm text-gray-400">
                  Sort by
                </label>
                <Select value={sortBy} onValueChange={(value) => {
                  setSortBy(value as SortOption);
                  setCurrentPage(1);
                }}>
                  <SelectTrigger className="w-48 bg-white border border-gray-300 text-black hover:border-black transition-colors">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-gray-300">
                    <SelectItem value="newest" className="text-black hover:bg-black hover:text-white">Newest</SelectItem>
                    <SelectItem value="price-low" className="text-black hover:bg-black hover:text-white">Price: Low to High</SelectItem>
                    <SelectItem value="price-high" className="text-black hover:bg-black hover:text-white">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Product Grid */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          {paginatedProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {paginatedProducts.map((product) => {
                  const primaryImage = product.images?.[0];
                  if (!primaryImage) return null;

                  return (
                    <ProductCard
                      key={product.id}
                      id={product.id}
                      name={product.name}
                      price={product.price}
                      currency={product.currency}
                      image={primaryImage.url}
                      imageAlt={primaryImage.alt}
                    />
                  );
                })}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="mt-16 md:mt-20 flex items-center justify-between border-t border-gray-800 pt-8">
                  <button
                    onClick={handlePrevPage}
                    disabled={!hasPrevPage}
                    className="px-4 py-2 text-sm text-black border border-gray-800 disabled:text-gray-400 disabled:border-gray-800 transition-colors hover:bg-black hover:text-white disabled:hover:bg-transparent disabled:hover:text-gray-400"
                    aria-label="Previous page"
                  >
                    ← Previous
                  </button>

                  <span className="text-sm text-gray-400">
                    Page {currentPage} of {totalPages}
                  </span>

                  <button
                    onClick={handleNextPage}
                    disabled={!hasNextPage}
                    className="px-4 py-2 text-sm text-black border border-gray-800 disabled:text-gray-400 disabled:border-gray-800 transition-colors hover:bg-black hover:text-white disabled:hover:bg-transparent disabled:hover:text-gray-400"
                    aria-label="Next page"
                  >
                    Next →
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-24">
              <p className="text-gray-400 text-base mb-2">
                No products available in this collection.
              </p>
              <p className="text-gray-500 text-sm">
                Check back soon for new pieces.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
