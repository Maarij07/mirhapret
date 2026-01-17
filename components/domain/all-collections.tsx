"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Filter } from "lucide-react";
import { ProductCard } from "@/components/domain/product-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import type { Product } from "@/lib/services/product.service";

interface AllCollectionsProps {
  products: Product[];
}

type SortOption = "newest" | "price-low" | "price-high";
type CollectionFilter = "all" | "pret" | "desire" | "octa-west-2026";
const PRODUCTS_PER_PAGE = 12;

export function AllCollections({ products }: AllCollectionsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const priceDropdownRef = useRef<HTMLDivElement>(null);
  
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [filterBy, setFilterBy] = useState<CollectionFilter>("all");
  const [priceRange, setPriceRange] = useState<[number, number]>([1500, 100000]);
  const [isPriceDropdownOpen, setIsPriceDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Initialize from URL params on mount
  useEffect(() => {
    const collection = (searchParams.get("collection") || "all") as CollectionFilter;
    const sort = (searchParams.get("sort") || "newest") as SortOption;
    const min = searchParams.get("minPrice") ? parseInt(searchParams.get("minPrice")!, 10) : 1500;
    const max = searchParams.get("maxPrice") ? parseInt(searchParams.get("maxPrice")!, 10) : 100000;

    setFilterBy(collection);
    setSortBy(sort);
    setPriceRange([min, max]);
    setCurrentPage(1);
  }, [searchParams]);

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!isPriceDropdownOpen) {
      return;
    }

    function handleClickOutside(event: MouseEvent) {
      if (priceDropdownRef.current && !priceDropdownRef.current.contains(event.target as Node)) {
        setIsPriceDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isPriceDropdownOpen]);

  const updateURL = (newFilterBy?: CollectionFilter, newSortBy?: SortOption, newPriceRange?: [number, number]) => {
    const params = new URLSearchParams();
    
    const collection = newFilterBy !== undefined ? newFilterBy : filterBy;
    const sort = newSortBy !== undefined ? newSortBy : sortBy;
    const [min, max] = newPriceRange !== undefined ? newPriceRange : priceRange;

    if (collection !== "all") params.set("collection", collection);
    if (sort !== "newest") params.set("sort", sort);
    if (min !== 1500) params.set("minPrice", min.toString());
    if (max !== 100000) params.set("maxPrice", max.toString());

    const queryString = params.toString();
    router.push(queryString ? `/collections?${queryString}` : "/collections", { scroll: false });
  };

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

  const filteredProducts = useMemo(() => {
    let results = sortedProducts;

    // Filter by collection
    if (filterBy !== "all") {
      results = results.filter((p) => p.collection === filterBy);
    }

    // Filter by price range
    results = results.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

    return results;
  }, [sortedProducts, filterBy, priceRange]);

  const paginatedProducts = useMemo(() => {
    const startIdx = (currentPage - 1) * PRODUCTS_PER_PAGE;
    const endIdx = startIdx + PRODUCTS_PER_PAGE;
    return filteredProducts.slice(startIdx, endIdx);
  }, [filteredProducts, currentPage]);

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
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
      {/* Collections Header */}
      <section className="border-b border-gray-100 py-4 md:py-5">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-medium text-black leading-tight">
              All Collections
            </h1>
            <p className="text-gray-500 max-w-2xl text-sm leading-relaxed">
              Explore our complete range of curated collections and discover pieces for every moment.
            </p>
          </div>
        </div>
      </section>

      {/* Controls Bar */}
      {products.length > 0 && (
        <section className="border-b border-gray-800 py-8">
          <div className="container mx-auto px-4 md:px-8 max-w-7xl">
            <div className="space-y-6">
            {/* Filters */}
              <div className="flex flex-col gap-6">
                {/* Collection Filters and Price Filter */}
                <div className="flex items-end justify-between gap-6">
                  {/* Collection Tabs */}
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => {
                        setFilterBy("all");
                        updateURL("all", sortBy, priceRange);
                        setCurrentPage(1);
                      }}
                      className={`px-4 py-2 text-xs font-medium uppercase tracking-wide transition-colors ${
                        filterBy === "all"
                          ? "bg-black text-white"
                          : "text-black border border-gray-200 hover:border-black"
                      }`}
                    >
                      All
                    </button>
                    <button
                      onClick={() => {
                        setFilterBy("pret");
                        updateURL("pret", sortBy, priceRange);
                        setCurrentPage(1);
                      }}
                      className={`px-4 py-2 text-xs font-medium uppercase tracking-wide transition-colors ${
                        filterBy === "pret"
                          ? "bg-black text-white"
                          : "text-black border border-gray-200 hover:border-black"
                      }`}
                    >
                      Pret
                    </button>
                    <button
                      onClick={() => {
                        setFilterBy("desire");
                        updateURL("desire", sortBy, priceRange);
                        setCurrentPage(1);
                      }}
                      className={`px-4 py-2 text-xs font-medium uppercase tracking-wide transition-colors ${
                        filterBy === "desire"
                          ? "bg-black text-white"
                          : "text-black border border-gray-200 hover:border-black"
                      }`}
                    >
                      Desire
                    </button>
                    <button
                      onClick={() => {
                        setFilterBy("octa-west-2026");
                        updateURL("octa-west-2026", sortBy, priceRange);
                        setCurrentPage(1);
                      }}
                      className={`px-4 py-2 text-xs font-medium uppercase tracking-wide transition-colors ${
                        filterBy === "octa-west-2026"
                          ? "bg-black text-white"
                          : "text-black border border-gray-200 hover:border-black"
                      }`}
                    >
                      Octa-West 2026
                    </button>
                  </div>

                  {/* Price Filter Dropdown */}
                  <div className="relative" ref={priceDropdownRef}>
                    <button
                      onClick={() => setIsPriceDropdownOpen(!isPriceDropdownOpen)}
                      className="flex items-center gap-2 px-3 py-2 text-xs font-medium uppercase tracking-wide text-gray-400 hover:text-black transition-colors"
                    >
                      <Filter className="w-4 h-4" />
                      Price
                    </button>

                    {/* Dropdown Menu */}
                    {isPriceDropdownOpen && (
                      <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-gray-200 rounded shadow-lg z-50 p-6">
                        <div className="space-y-4">
                          {/* Slider */}
                          <style>{`
                            .price-slider [role="slider"] {
                              border: 2px solid black !important;
                            }
                          `}</style>
                          <Slider
                            value={priceRange}
                            onValueChange={(value) => {
                              setPriceRange([value[0] || 1500, value[1] || 100000]);
                              setCurrentPage(1);
                            }}
                            min={1500}
                            max={100000}
                            step={100}
                            className="price-slider w-full"
                          />

                          {/* Price Display */}
                          <div className="flex items-center justify-between text-xs font-medium text-black">
                            <span>Rs {priceRange[0].toLocaleString()}</span>
                            <span>Rs {priceRange[1].toLocaleString()}</span>
                          </div>

                          {/* Apply Button */}
                          <button
                            onClick={() => {
                              updateURL(filterBy, sortBy, priceRange);
                              setIsPriceDropdownOpen(false);
                            }}
                            className="w-full py-2 bg-black text-white text-xs font-medium uppercase tracking-wide hover:bg-gray-900 transition-colors rounded"
                          >
                            Apply
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Sort and Count */}
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs md:text-sm text-gray-400 font-medium uppercase tracking-wide">
                  {filteredProducts.length} Item{filteredProducts.length !== 1 ? "s" : ""}
                </span>

                <div className="flex items-center gap-3 md:gap-4">
                  <label htmlFor="sort" className="text-xs md:text-sm text-gray-400 font-medium uppercase tracking-wide">
                    Sort
                  </label>
                  <Select
                    value={sortBy}
                    onValueChange={(value) => {
                      setSortBy(value as SortOption);
                      updateURL(filterBy, value as SortOption, priceRange);
                      setCurrentPage(1);
                    }}
                  >
                    <SelectTrigger className="w-40 md:w-48 bg-white border border-gray-200 text-black text-sm hover:border-black transition-colors focus:border-black">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-gray-200">
                      <SelectItem value="newest" className="text-sm">
                        Newest
                      </SelectItem>
                      <SelectItem value="price-low" className="text-sm">
                        Price: Low to High
                      </SelectItem>
                      <SelectItem value="price-high" className="text-sm">
                        Price: High to Low
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Product Grid Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          {paginatedProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
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

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-12 md:mt-16 flex items-center justify-between border-t border-gray-100 pt-8">
                  <button
                    onClick={handlePrevPage}
                    disabled={!hasPrevPage}
                    className="px-6 py-2 text-xs font-medium uppercase tracking-wide text-black border border-gray-200 disabled:text-gray-300 disabled:border-gray-200 transition-colors hover:bg-black hover:text-white hover:border-black disabled:hover:bg-transparent disabled:hover:text-gray-300"
                    aria-label="Previous page"
                  >
                    Previous
                  </button>

                  <div className="flex items-center gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => {
                          setCurrentPage(page);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className={`w-8 h-8 text-xs font-medium transition-colors ${
                          currentPage === page
                            ? "bg-black text-white"
                            : "text-black border border-gray-200 hover:bg-gray-100"
                        }`}
                        aria-label={`Go to page ${page}`}
                        aria-current={currentPage === page ? "page" : undefined}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={handleNextPage}
                    disabled={!hasNextPage}
                    className="px-6 py-2 text-xs font-medium uppercase tracking-wide text-black border border-gray-200 disabled:text-gray-300 disabled:border-gray-200 transition-colors hover:bg-black hover:text-white hover:border-black disabled:hover:bg-transparent disabled:hover:text-gray-300"
                    aria-label="Next page"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-20">
              <p className="text-gray-400 text-sm">No products found</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
