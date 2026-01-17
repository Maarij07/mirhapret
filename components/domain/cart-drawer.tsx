"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import { useCartStore } from "@/store/cart.store";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export function CartDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  const items = useCartStore((state) => state.items);
  const totalPrice = useCartStore((state) => state.getTotalPrice());
  const itemCount = useCartStore((state) => state.getItemCount());
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        className="relative p-2 hover:bg-gray-50 transition-colors"
        aria-label="Shopping cart"
        disabled
      >
        <svg
          className="w-6 h-6 text-black"
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
      </button>
    );
  }

  const shippingCost = totalPrice > 5000 ? 0 : totalPrice > 0 ? 300 : 0;
  const finalTotal = totalPrice + shippingCost;

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <button
          className="relative p-2 hover:bg-gray-50 transition-colors"
          aria-label="Shopping cart"
          aria-badge={itemCount > 0 ? itemCount : undefined}
        >
          <svg
            className="w-6 h-6 text-black"
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
          {itemCount > 0 && (
            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-medium text-white bg-black rounded-full">
              {itemCount}
            </span>
          )}
        </button>
      </SheetTrigger>

      <SheetContent className="w-80 sm:w-96 flex flex-col bg-white border-l border-gray-100 p-0 max-h-screen overflow-hidden">
        <SheetHeader className="border-b border-gray-100 px-4 py-6 flex-shrink-0 w-full">
          <SheetTitle className="text-xl font-medium text-black">
            Your Cart
          </SheetTitle>
        </SheetHeader>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto py-6 min-h-0 w-full">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center px-4 text-center w-full">
              <svg
                className="w-12 h-12 text-gray-300 mb-4"
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
              <p className="text-gray-500 text-sm mb-4">Your cart is empty</p>
              <button
                onClick={() => setIsOpen(false)}
                className="text-xs underline underline-offset-4 text-black hover:text-gray-700"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <ul className="space-y-6 w-full">
              {items.map((item) => (
                <li key={item.productId} className="flex gap-4 pb-6 px-4 border-b border-gray-100">
                  {/* Image */}
                  <div className="relative w-20 h-20 bg-gray-100 flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col">
                    <Link
                      href={`/product/${item.productId}`}
                      className="text-sm font-medium text-black hover:text-gray-700 mb-1"
                    >
                      {item.name}
                    </Link>

                    {/* Variants */}
                    {Object.entries(item.variants).length > 0 && (
                      <p className="text-xs text-gray-400 mb-2">
                        {Object.entries(item.variants)
                          .map(([key, value]) => `${key}: ${value}`)
                          .join(" • ")}
                      </p>
                    )}

                    {/* Price */}
                    <p className="text-sm font-medium text-black mb-2">
                      {item.currency} {(item.price * item.quantity).toLocaleString()}
                    </p>

                    {/* Quantity Selector */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.productId, item.quantity - 1)
                        }
                        className="text-xs px-2 py-1 border border-gray-300 hover:border-black transition-colors text-black"
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="text-xs w-6 text-center text-black font-medium">{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.productId, item.quantity + 1)
                        }
                        className="text-xs px-2 py-1 border border-gray-300 hover:border-black transition-colors text-black"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeItem(item.productId)}
                        className="ml-auto text-red-500 hover:text-red-700 transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-100 space-y-4 px-4 py-6 flex-shrink-0 w-full">
            {/* Subtotal */}
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span className="text-black font-medium">
                {items[0]?.currency} {totalPrice.toLocaleString()}
              </span>
            </div>

            {/* Shipping */}
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">
                {shippingCost === 0 ? "Shipping" : "Shipping"}
              </span>
              <span className="text-black font-medium">
                {shippingCost === 0 ? "Free" : `${items[0]?.currency} ${shippingCost}`}
              </span>
            </div>

            {/* Total */}
            <div className="flex justify-between text-base border-t border-gray-100 pt-4">
              <span className="font-medium text-black">Total</span>
              <span className="font-medium text-black">
                {items[0]?.currency} {finalTotal.toLocaleString()}
              </span>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Link href="/checkout" onClick={() => setIsOpen(false)} className="flex-1">
                <Button className="w-full bg-black text-white hover:bg-gray-900 py-6 text-sm font-medium rounded-sm">
                  Proceed to Checkout
                </Button>
              </Link>
              <button
                onClick={() => setIsOpen(false)}
                className="flex-1 px-4 py-3 border border-black text-black hover:bg-black hover:text-white transition-colors text-sm font-medium rounded-sm"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
