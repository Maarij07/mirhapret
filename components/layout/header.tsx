"use client";

import Link from "next/link";
import { CartDrawer } from "@/components/domain/cart-drawer";
import { User } from "lucide-react";

const categories = [
  { name: "Pret", href: "/category/pret" },
  { name: "Desire", href: "/category/desire" },
  { name: "Octa-West 2026", href: "/category/octa-west-2026" },
];

export function Header() {
  return (
    <>
      {/* Main Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white dark:bg-gray-950/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold text-black dark:text-white">mirhapret</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {categories.map((category) => (
              <Link
                key={category.href}
                href={category.href}
                className="text-sm font-medium text-black dark:text-white transition-colors hover:text-gray-900 dark:hover:text-gray-50"
              >
                {category.name}
              </Link>
            ))}
          </nav>

          {/* Right Icons */}
          <div className="flex items-center gap-4">
            <CartDrawer />
            
            <button className="p-2 hover:bg-gray-50 transition-colors" aria-label="Account">
              <User className="h-5 w-5 text-black" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Category Bar */}
      <nav className="md:hidden sticky top-16 z-40 border-b bg-white dark:bg-gray-950/95 backdrop-blur">
        <div className="container flex items-center gap-4 px-4 overflow-x-auto">
          {categories.map((category) => (
            <Link
              key={category.href}
              href={category.href}
              className="py-3 px-1 text-xs font-medium text-black dark:text-white whitespace-nowrap transition-colors hover:text-gray-600 border-b-2 border-transparent hover:border-black"
            >
              {category.name}
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}