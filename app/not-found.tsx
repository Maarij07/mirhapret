"use client";

import Link from "next/link";
import { Header } from "@/components/layout/header";
import { ArrowRight, Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <div className="flex-1 flex items-center justify-center px-4 md:px-8">
        <div className="max-w-2xl w-full text-center space-y-8 py-16">
          {/* 404 Display */}
          <div className="space-y-4">
            <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest">
              Error 404
            </p>
            <h1 className="text-6xl md:text-7xl font-medium text-black tracking-tight">
              Page Not Found
            </h1>
          </div>

          {/* Description */}
          <div className="space-y-3">
            <p className="text-lg text-gray-600 max-w-md mx-auto">
              The page you're looking for doesn't exist or has been moved. But the collection you're seeking is just a click away.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            {/* Home Button */}
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-black text-white text-sm font-semibold hover:bg-gray-900 transition-colors rounded-full"
            >
              <Home className="w-4 h-4" />
              Go Home
            </Link>

            {/* Browse Collections Button */}
            <Link
              href="/collections"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-black text-black text-sm font-semibold hover:bg-gray-50 transition-colors rounded-full"
            >
              <Search className="w-4 h-4" />
              Browse Collections
            </Link>
          </div>

          {/* Category Links */}
          <div className="border-t border-gray-200 pt-8">
            <p className="text-xs text-gray-400 uppercase tracking-widest mb-6">
              Or explore our collections
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              {[
                { name: "Pret", href: "/category/pret" },
                { name: "Desire", href: "/category/desire" },
                { name: "Octa-West 2026", href: "/category/octa-west-2026" },
              ].map((category) => (
                <Link
                  key={category.href}
                  href={category.href}
                  className="group inline-flex items-center gap-2 text-sm font-medium text-black hover:text-gray-600 transition-colors"
                >
                  {category.name}
                  <ArrowRight className="w-3 h-3 opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                </Link>
              ))}
            </div>
          </div>

          {/* Help Text */}
          <div className="border-t border-gray-200 pt-8 space-y-3">
            <p className="text-xs text-gray-400">Need help?</p>
            <a
              href="https://wa.me/923215551851?text=Hi%2C%20I%20need%20help%20finding%20something"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-black font-medium hover:text-gray-600 transition-colors"
            >
              Message us on WhatsApp
              <ArrowRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Spacing */}
      <div className="h-16" />
    </div>
  );
}
