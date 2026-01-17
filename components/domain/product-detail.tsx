"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProductImageGallery } from "@/components/domain/product-image-gallery";
import { PriceTag } from "@/components/domain/price-tag";
import { VariantSelector, type SelectedVariants } from "@/components/domain/variant-selector";
import { QuantitySelector } from "@/components/domain/quantity-selector";
import { ProductCard } from "@/components/domain/product-card";
import { SizeChartModal } from "@/components/domain/size-chart-modal";
import { useCartStore } from "@/store/cart.store";
import type { Product } from "@/lib/services/product.service";
import { ChevronDown } from "lucide-react";

interface ProductDetailProps {
  product: Product;
  relatedProducts: Product[];
}

interface DetailsSection {
  label: string;
  content: string[];
}

export function ProductDetail({
  product,
  relatedProducts,
}: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedVariants, setSelectedVariants] = useState<SelectedVariants>({});
  const [addedToCart, setAddedToCart] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    details: true,
    care: false,
    sizeChart: false,
  });
  
  const addToCart = useCartStore((state) => state.addItem);

  const handleVariantSelect = useCallback((variants: SelectedVariants) => {
    setSelectedVariants(variants);
  }, []);

  const handleAddToCart = useCallback(() => {
    const primaryImage = product.images?.[0];
    if (!primaryImage) return;

    addToCart({
      id: `${product.id}-${Date.now()}`,
      productId: product.id,
      name: product.name,
      price: product.price,
      currency: product.currency,
      image: primaryImage.url,
      quantity,
      variants: selectedVariants,
    });

    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  }, [product, quantity, selectedVariants, addToCart]);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const getSizeChartCategory = (): "tops" | "bottoms" | "dresses" | "traditional" => {
    const name = product.name.toLowerCase();
    if (name.includes("pant") || name.includes("trouser") || name.includes("short") || name.includes("chino") || name.includes("jogger")) {
      return "bottoms";
    }
    if (name.includes("dress") || name.includes("gown") || name.includes("skirt")) {
      return "dresses";
    }
    if (name.includes("kurta") || name.includes("saree") || name.includes("lehenga") || name.includes("dupatta") || name.includes("shawl")) {
      return "traditional";
    }
    return "tops";
  };

  const detailsContent: DetailsSection[] = [
    {
      label: "Fabric Details",
      content: [
        "Top Fabric: " + (product.fabricDetails?.top || "Premium Cotton"),
        "Bottom Fabric: " + (product.fabricDetails?.bottom || "Breathable Blend"),
        "Dupatta Fabric: " + (product.fabricDetails?.dupatta || "Silk Blend"),
        "Material: " + (product.fabricDetails?.material || "Natural Fibers"),
      ]
    }
  ];

  const careContent: DetailsSection[] = [
    {
      label: "Care Instructions",
      content: [
        "Dry clean recommended for best results",
        "Keep away from direct sunlight when storing",
        "Use mild detergent if hand washing",
        "Do not bleach or wring out",
      ]
    }
  ];

  return (
    <div className="bg-white font-sans">
      {/* Breadcrumb Section */}
      <section className="py-8 md:py-10 border-b border-gray-100">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-3 text-xs text-gray-500">
            <Link href="/" className="hover:text-black transition-colors">
              Home
            </Link>
            <span className="text-gray-400">•</span>
            <Link 
              href={`/category/${product.collection}`}
              className="hover:text-black transition-colors capitalize"
            >
              {product.collection.replace(/-/g, " ")}
            </Link>
            <span className="text-gray-400">•</span>
            <span className="text-gray-600">{product.name}</span>
          </nav>
        </div>
      </section>

      {/* Main Product Section */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left: Image Gallery */}
            <div className="lg:sticky lg:top-8 lg:self-start">
              <ProductImageGallery
                images={product.images}
                productName={product.name}
              />
            </div>

            {/* Right: Product Information */}
            <div className="flex flex-col">
              {/* Category */}
              <span className="text-xs text-gray-400 uppercase tracking-[0.15em] mb-2 font-medium">
                {product.collection.replace(/-/g, " ")}
              </span>

              {/* Product Title */}
              <h1 className="text-3xl md:text-4xl font-medium text-black mb-3 leading-tight">
                {product.name}
              </h1>

              {/* Price */}
              <div className="mb-3">
                <PriceTag
                  price={product.price}
                  currency={product.currency}
                  size="lg"
                />
              </div>

              {/* Product ID */}
              <p className="text-xs text-gray-400 uppercase tracking-[0.1em] mb-6">
                SKU: {product.id}
              </p>

              {/* Size Selection */}
              {product.variants.length > 0 && (
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-medium text-black">
                      Select Size
                    </label>
                    <SizeChartModal category={getSizeChartCategory()} />
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
                      <button
                        key={size}
                        className="w-10 h-10 border border-gray-300 hover:border-black transition-colors text-xs font-medium text-black flex items-center justify-center"
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="mb-6">
                <label className="text-sm font-medium text-black mb-3 block">
                  Quantity
                </label>
                <QuantitySelector onQuantityChange={setQuantity} />
              </div>

              {/* Add To Bag Button */}
              <Button
                onClick={handleAddToCart}
                size="lg"
                className="w-full bg-black text-white hover:bg-gray-900 border-0 py-3 text-sm font-medium tracking-wide transition-all duration-300 rounded-full mb-6"
                disabled={!product.inStock}
              >
                {!product.inStock 
                  ? "Out of Stock" 
                  : addedToCart 
                    ? "✓ Added to Bag" 
                    : "Add to Bag"
                }
              </Button>

              {/* Collapsible Sections */}
              <div className="space-y-0">
                {/* Details Section */}
                <div className="border-t border-gray-100">
                  <button
                    onClick={() => toggleSection("details")}
                    className="flex items-center justify-between w-full py-3 text-sm font-medium text-black hover:text-gray-600 transition-colors"
                  >
                    <span>Details</span>
                    <ChevronDown 
                      className={`w-4 h-4 transition-transform ${expandedSections.details ? "rotate-180" : ""}`}
                    />
                  </button>
                  {expandedSections.details && (
                    <div className="pb-3 text-xs text-gray-600 space-y-2 px-0">
                      {detailsContent[0].content.map((item, idx) => {
                        const [label, value] = item.split(": ");
                        return (
                          <p key={idx}>
                            <span className="font-semibold text-black">{label}:</span> {value}
                          </p>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Care Instructions Section */}
                <div className="border-t border-gray-100">
                  <button
                    onClick={() => toggleSection("care")}
                    className="flex items-center justify-between w-full py-3 text-sm font-medium text-black hover:text-gray-600 transition-colors"
                  >
                    <span>Care Instructions</span>
                    <ChevronDown 
                      className={`w-4 h-4 transition-transform ${expandedSections.care ? "rotate-180" : ""}`}
                    />
                  </button>
                  {expandedSections.care && (
                    <div className="pb-3 text-xs text-gray-600 space-y-2 px-0">
                      {careContent[0].content.map((item, idx) => (
                        <p key={idx}>{item}</p>
                      ))}
                    </div>
                  )}
                </div>

                {/* Size Chart Section */}
                <div className="border-t border-gray-100">
                  <button
                    onClick={() => toggleSection("sizeChart")}
                    className="flex items-center justify-between w-full py-3 text-sm font-medium text-black hover:text-gray-600 transition-colors"
                  >
                    <span>Size Chart</span>
                    <ChevronDown 
                      className={`w-4 h-4 transition-transform ${expandedSections.sizeChart ? "rotate-180" : ""}`}
                    />
                  </button>
                  {expandedSections.sizeChart && (
                    <div className="pb-3 text-xs">
                      <SizeChartModal category={getSizeChartCategory()} inline />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Story Section */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <div className="text-center mb-16">
            <span className="text-xs text-gray-400 uppercase tracking-[0.2em] mb-4 block">
              The Details
            </span>
            <h2 className="text-2xl md:text-3xl font-medium text-black">
              About This Piece
            </h2>
          </div>
          <p className="text-gray-600 text-lg leading-relaxed text-center max-w-2xl mx-auto">
            {product.longDescription}
          </p>
        </div>
      </section>

      {/* Fabric & Care Section */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {/* Composition */}
            <article className="text-center md:text-left">
              <h3 className="text-xs font-medium text-black mb-6 uppercase tracking-[0.2em]">
                Composition
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {product.fabricComposition}
              </p>
            </article>

            {/* Care */}
            <article className="text-center md:text-left">
              <h3 className="text-xs font-medium text-black mb-6 uppercase tracking-[0.2em]">
                Care Instructions
              </h3>
              <ul className="space-y-3">
                {product.careInstructions.map((instruction, index) => (
                  <li key={index} className="text-gray-600 flex items-start gap-3 justify-center md:justify-start">
                    <span className="text-gray-300 text-xs mt-1">●</span>
                    <span>{instruction}</span>
                  </li>
                ))}
              </ul>
            </article>

            {/* Sustainability */}
            <article className="text-center md:text-left">
              <h3 className="text-xs font-medium text-black mb-6 uppercase tracking-[0.2em]">
                Our Promise
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Crafted with intention. Each piece is designed to last, reducing the need for replacement and contributing to a more sustainable wardrobe.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* Need Help Section */}
      <section className="py-16 bg-black text-white">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl text-center">
          <h2 className="text-xl md:text-2xl font-medium mb-4">
            Need Assistance?
          </h2>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            Our team is here to help with sizing, styling, or any questions about this piece.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="mailto:hello@mirhapret.com" 
              className="px-8 py-3 border border-white text-sm font-medium hover:bg-white hover:text-black transition-colors"
            >
              Email Us
            </a>
            <a 
              href="https://wa.me/923001234567" 
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 border border-white text-sm font-medium hover:bg-white hover:text-black transition-colors"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-20 md:py-28" aria-labelledby="related-heading">
          <div className="container mx-auto px-4 md:px-8 max-w-7xl">
            <div className="text-center mb-12">
              <span className="text-xs text-gray-400 uppercase tracking-[0.2em] mb-4 block">
                Complete the Look
              </span>
              <h2 id="related-heading" className="text-2xl md:text-3xl font-medium text-black">
                You May Also Like
              </h2>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {relatedProducts.map((relatedProduct) => {
                const primaryImage = relatedProduct.images?.[0];
                if (!primaryImage) return null;
                
                return (
                  <ProductCard
                    key={relatedProduct.id}
                    id={relatedProduct.id}
                    name={relatedProduct.name}
                    price={relatedProduct.price}
                    currency={relatedProduct.currency}
                    image={primaryImage.url}
                    imageAlt={primaryImage.alt}
                  />
                );
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
