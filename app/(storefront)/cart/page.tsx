"use client";

import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/store/cart.store";
import { Button } from "@/components/ui/button";

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const totalPrice = useCartStore((state) => state.getTotalPrice());
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);

  const shippingCost = totalPrice > 5000 ? 0 : totalPrice > 0 ? 300 : 0;
  const finalTotal = totalPrice + shippingCost;

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <div className="text-center space-y-6">
          <svg
            className="w-20 h-20 text-gray-300 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
          <h1 className="text-2xl font-medium text-black">Your cart is empty</h1>
          <p className="text-gray-500">Start shopping to add items to your cart</p>
          <Link href="/category/pret">
            <Button className="bg-black text-white hover:bg-gray-900 py-6">
              Start Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Page Header */}
      <section className="border-b border-gray-100 py-8 md:py-12">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <h1 className="text-3xl md:text-4xl font-medium text-black">Your Cart</h1>
        </div>
      </section>

      {/* Cart Layout */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="space-y-6">
                {items.map((item) => (
                  <div key={item.productId} className="flex gap-6 pb-6 border-b border-gray-100">
                    {/* Image */}
                    <Link href={`/product/${item.productId}`} className="flex-shrink-0">
                      <div className="relative w-32 h-40 bg-gray-100">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="128px"
                        />
                      </div>
                    </Link>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <Link
                          href={`/product/${item.productId}`}
                          className="text-lg font-medium text-black hover:text-gray-700 transition-colors"
                        >
                          {item.name}
                        </Link>

                        {/* Variants */}
                        {Object.entries(item.variants).length > 0 && (
                          <p className="text-sm text-gray-500 mt-2">
                            {Object.entries(item.variants)
                              .map(([key, value]) => `${key}: ${value}`)
                              .join(" • ")}
                          </p>
                        )}

                        {/* Price */}
                        <p className="text-lg font-medium text-black mt-4">
                          {item.currency} {(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-between">
                        {/* Quantity */}
                        <div className="flex items-center gap-3 border border-gray-300">
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                            className="px-3 py-2 hover:bg-gray-50 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            −
                          </button>
                          <span className="px-3 py-2 min-w-[2rem] text-center text-sm">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                            className="px-3 py-2 hover:bg-gray-50 transition-colors"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>

                        {/* Remove */}
                        <button
                          onClick={() => removeItem(item.productId)}
                          className="text-sm text-gray-400 hover:text-black transition-colors"
                          aria-label="Remove item"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Continue Shopping */}
              <div className="mt-8">
                <Link href="/category/pret">
                  <button className="text-sm text-gray-500 hover:text-black transition-colors">
                    ← Continue Shopping
                  </button>
                </Link>
              </div>
            </div>

            {/* Order Summary */}
            <div className="h-fit sticky top-24">
              <div className="bg-gray-50 p-8 space-y-6">
                <h2 className="text-lg font-medium text-black">Order Summary</h2>

                {/* Subtotal */}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-black font-medium">
                    {items[0]?.currency} {totalPrice.toLocaleString()}
                  </span>
                </div>

                {/* Shipping */}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-black font-medium">
                    {shippingCost === 0 ? "Free" : `${items[0]?.currency} ${shippingCost}`}
                  </span>
                </div>

                {shippingCost > 0 && (
                  <p className="text-xs text-gray-400">
                    Free shipping on orders over {items[0]?.currency} 5,000
                  </p>
                )}

                {/* Total */}
                <div className="border-t border-gray-200 pt-6 flex justify-between">
                  <span className="font-medium text-black">Total</span>
                  <span className="text-xl font-medium text-black">
                    {items[0]?.currency} {finalTotal.toLocaleString()}
                  </span>
                </div>

                {/* CTA */}
                <Link href="/checkout" className="block">
                  <Button className="w-full bg-black text-white hover:bg-gray-900 py-6 text-sm font-medium">
                    Proceed to Checkout
                  </Button>
                </Link>

                {/* Trust Info */}
                <div className="space-y-3 pt-4 border-t border-gray-200 text-xs text-gray-500">
                  <div className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Secure checkout with cash on delivery</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>14-day easy returns policy</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
