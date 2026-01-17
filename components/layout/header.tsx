"use client";

import Link from "next/link";
import { CartDrawer } from "@/components/domain/cart-drawer";
import { AuthModal } from "@/components/auth/auth-modal";
import { User, LogOut } from "lucide-react";
import { useState } from "react";
import { useUser } from "@/lib/context/user-context";
import { signOutUser } from "@/lib/firebase/auth";
import Image from "next/image";

const categories = [
  { name: "Pret", href: "/category/pret" },
  { name: "Desire", href: "/category/desire" },
  { name: "Octa-West 2026", href: "/category/octa-west-2026" },
];

export function Header() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const { user, setUser } = useUser();

  const handleLogout = async () => {
    await signOutUser();
    setUser(null);
    setIsProfileMenuOpen(false);
  };

  const getInitials = (displayName: string) => {
    return displayName
      .split(" ")
      .map((name) => name[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

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
            
            {user ? (
              <div className="relative">
                <button 
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors text-xs font-bold"
                  aria-label="Profile"
                >
                  {user.photoURL ? (
                    <Image 
                      src={user.photoURL} 
                      alt={user.displayName || "User"} 
                      width={36}
                      height={36}
                      className="rounded-full w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-xs font-bold text-black">
                      {getInitials(user.displayName)}
                    </span>
                  )}
                </button>

                {/* Profile Dropdown Menu */}
                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    <div className="px-4 py-3 border-b border-gray-200">
                      <p className="text-sm font-semibold text-black">{user.displayName || user.email}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-3 text-sm text-black hover:bg-gray-50 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button 
                onClick={() => setIsAuthModalOpen(true)}
                className="p-2 hover:bg-gray-50 transition-colors" 
                aria-label="Account"
              >
                <User className="h-5 w-5 text-black" />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)}
        initialTab="login"
      />

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