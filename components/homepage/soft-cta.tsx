import { Button } from "@/components/ui/button";
import Link from "next/link";

export function SoftCTA() {
  return (
    <section className="w-full py-24 md:py-32 bg-white" aria-labelledby="cta-heading">
      <div className="container mx-auto px-4 md:px-8 max-w-2xl text-center">
        <h2 id="cta-heading" className="text-2xl md:text-3xl font-medium text-black mb-6">
          Begin your journey
        </h2>
        <p className="text-gray-500 mb-10">
          Discover collections crafted with intention and attention to detail.
        </p>
        <Button
          asChild
          size="lg"
          className="bg-black text-white hover:bg-gray-900 border-0 px-10 py-6 text-sm font-medium tracking-wide"
        >
          <Link href="/collections">Explore the Collection</Link>
        </Button>
      </div>
    </section>
  );
}