import { Metadata } from "next";
import { Suspense } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { AllCollections } from "@/components/domain/all-collections";
import { getAllProducts } from "@/lib/services/product.service";

export const metadata: Metadata = {
  title: "All Collections | Mirhapret",
  description: "Explore our complete range of curated collections and discover pieces for every moment.",
  openGraph: {
    title: "All Collections | Mirhapret",
    description: "Explore our complete range of curated collections and discover pieces for every moment.",
  },
};

export default async function CollectionsPage() {
  const allProducts = await getAllProducts();

  return (
    <div className="grid min-h-dvh grid-rows-[auto_1fr_auto]">
      <Header />
      <main>
        <Suspense fallback={<div className="w-full h-screen bg-white" />}>
          <AllCollections products={allProducts} />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
