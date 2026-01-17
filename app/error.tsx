"use client";

import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Settings, Home, RotateCw } from "lucide-react";
import { useEffect } from "react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Error caught:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <div className="flex-1 flex items-center justify-center px-4 md:px-8">
        <div className="max-w-2xl w-full text-center space-y-8 py-16">
          {/* Settings Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border border-gray-200 bg-gray-50">
            <Settings className="w-8 h-8 text-black animate-spin" style={{ animationDuration: '3s' }} />
          </div>

          {/* Error Display */}
          <div className="space-y-4">
            <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest">
              Maintenance
            </p>
            <h1 className="text-5xl md:text-6xl font-medium text-black tracking-tight">
              We're Upgrading
            </h1>
          </div>

          {/* Description */}
          <div className="space-y-3">
            <p className="text-lg text-gray-600 max-w-md mx-auto">
              We're currently performing maintenance to serve you better. We'll be back shortly. Thank you for your patience.
            </p>
            {error.digest && (
              <p className="text-xs text-gray-400 font-mono">
                Reference ID: {error.digest}
              </p>
            )}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            {/* Retry Button */}
            <button
              onClick={() => reset()}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-black text-white text-sm font-semibold hover:bg-gray-900 transition-colors rounded-full"
            >
              <RotateCw className="w-4 h-4" />
              Try Again
            </button>

            {/* Home Button */}
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-black text-black text-sm font-semibold hover:bg-gray-50 transition-colors rounded-full"
            >
              <Home className="w-4 h-4" />
              Go Home
            </Link>
          </div>

          {/* Support */}
          <div className="border-t border-gray-200 pt-8 space-y-3">
            <p className="text-xs text-gray-400">Questions?</p>
            <a
              href="https://wa.me/923215551851?text=Hi%2C%20I%20have%20a%20question%20about%20the%20maintenance"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-black font-medium hover:text-gray-600 transition-colors"
            >
              Message us on WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Footer Spacing */}
      <div className="h-16" />
    </div>
  );
}
