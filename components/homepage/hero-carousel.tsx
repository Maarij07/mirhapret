"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

interface Slide {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  cta: string;
  href: string;
}

const slides: Slide[] = [
  {
    id: "brand-statement",
    title: "Elevated Simplicity",
    subtitle: "Where form meets function in perfect harmony",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    cta: "Explore Collection",
    href: "/collections",
  },
  {
    id: "pret",
    title: "Pret",
    subtitle: "Everyday silhouettes, elevated",
    image: "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    cta: "Explore Pret",
    href: "/category/pret",
  },
  {
    id: "desire",
    title: "Desire",
    subtitle: "Evenings with intention",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    cta: "Explore Desire",
    href: "/category/desire",
  },
  {
    id: "octa-west-2026",
    title: "Octa-West 2026",
    subtitle: "A future collection",
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    cta: "Explore 2026",
    href: "/category/octa-west-2026",
  },
];

export function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, []);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(goToNext, 6000);
    return () => clearInterval(interval);
  }, [isPaused, goToNext]);

  const currentSlide = slides[currentIndex];

  return (
    <section
      className="relative w-full h-[100dvh] overflow-hidden bg-black"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Featured collections carousel"
    >
      {/* Background Images */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={slide.image}
            alt=""
            fill
            className="object-cover"
            priority={index === 0}
            sizes="100vw"
          />
          {/* Overlay - solid black with opacity, no gradient */}
          <div className="absolute inset-0 bg-black/40" aria-hidden="true" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 md:px-8">
        <div className="max-w-3xl text-center space-y-6">
          {slides[currentIndex] && (
            <>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-white">
                {slides[currentIndex].title}
              </h1>
              <p className="text-lg md:text-xl text-gray-200 font-light">
                {slides[currentIndex].subtitle}
              </p>
              <div className="pt-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-black hover:bg-gray-100 border-0 px-8 py-6 text-sm font-medium tracking-wide"
                >
                  <Link href={slides[currentIndex].href}>{slides[currentIndex].cta}</Link>
                </Button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Navigation Indicators */}
      <nav
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3"
        aria-label="Slide navigation"
      >
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => goToSlide(index)}
            className={`h-0.5 transition-all duration-300 ${
              index === currentIndex
                ? "w-8 bg-white"
                : "w-4 bg-white/40 hover:bg-white/60"
            }`}
            aria-label={`Go to slide ${index + 1}: ${slide.title}`}
            aria-current={index === currentIndex ? "true" : undefined}
          />
        ))}
      </nav>
    </section>
  );
}