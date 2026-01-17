import { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CategoryListing } from "@/components/domain/category-listing";
import { getProductsByCollection } from "@/lib/services/product.service";

const categoryMetadata: Record<
  string,
  { name: string; description: string; title: string; metaDescription: string }
> = {
  pret: {
    name: "Pret",
    title: "Pret Collection | Mirhapret",
    metaDescription: "Everyday silhouettes, elevated. Designed for movement and intention.",
    description: "Everyday silhouettes, elevated. Designed for movement and intention.",
  },
  desire: {
    name: "Desire",
    title: "Desire Collection | Mirhapret",
    metaDescription: "Evenings with intention. Pieces that make moments memorable.",
    description: "Evenings with intention. Pieces that make moments memorable.",
  },
  "octa-west-2026": {
    name: "Octa-West 2026",
    title: "Octa-West 2026 Collection | Mirhapret",
    metaDescription: "A future collection. Tomorrow's simplicity, today.",
    description: "A future collection. Tomorrow's simplicity, today.",
  },
};

interface PageProps {
  params: Promise<{
    category: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params;
  const meta = categoryMetadata[category];

  return {
    title: meta?.title || "Collection | Mirhapret",
    description: meta?.metaDescription || "Browse our curated collections.",
    openGraph: {
      title: meta?.name || "Collection",
      description: meta?.metaDescription || "Browse our curated collections.",
    },
  };
}

export async function generateStaticParams() {
  return [
    { category: "pret" },
    { category: "desire" },
    { category: "octa-west-2026" },
  ];
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;
  const meta =
    categoryMetadata[category] || {
      name: "Collection",
      description: "",
      title: "Collection",
      metaDescription: "",
    };

  const products = await getProductsByCollection(
    category as "pret" | "desire" | "octa-west-2026"
  );

  return (
    <div className="grid min-h-dvh grid-rows-[auto_1fr_auto] bg-white">
      <Header />
      <main className="flex flex-col">
        <CategoryListing
          category={category}
          categoryName={meta.name}
          categoryDescription={meta.description}
          products={products}
        />
      </main>
      <Footer />
    </div>
  );
}
