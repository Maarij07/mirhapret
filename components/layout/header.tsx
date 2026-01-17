"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ShoppingCart, Menu, User } from "lucide-react";
import { cn } from "@/lib/utils";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white dark:bg-gray-950/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold text-black dark:text-white">mirhapret</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/pret" className="text-sm font-medium text-black dark:text-white transition-colors hover:text-gray-900 dark:hover:text-gray-50">
            Pret
          </Link>
          <Link href="/desire" className="text-sm font-medium text-black dark:text-white transition-colors hover:text-gray-900 dark:hover:text-gray-50">
            Desire
          </Link>
          <Link href="/octa-west-2026" className="text-sm font-medium text-black dark:text-white transition-colors hover:text-gray-900 dark:hover:text-gray-50">
            Octa-West 2026
          </Link>
        </nav>

        {/* Right Icons */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="relative text-black dark:text-white">
            <ShoppingCart className="h-5 w-5" />
            <span className="sr-only">Cart</span>
          </Button>
          
          <Button variant="ghost" size="icon" className="relative text-black dark:text-white">
            <User className="h-5 w-5" />
            <span className="sr-only">Account</span>
          </Button>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-4 mt-8">
                <Link href="/pret" className="text-sm font-medium">
                  Pret
                </Link>
                <Link href="/desire" className="text-sm font-medium">
                  Desire
                </Link>
                <Link href="/octa-west-2026" className="text-sm font-medium">
                  Octa-West 2026
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}