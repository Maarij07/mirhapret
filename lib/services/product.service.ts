// Mock product data - will be replaced with Firebase/Firestore
import productsData from '@/lib/data/products.json'

export interface Product {
  id: string;
  name: string;
  price: number;
  currency: string;
  description: string;
  longDescription: string;
  images: {
    url: string;
    alt: string;
  }[];
  variants: {
    name: string;
    type: "size" | "color";
    options: {
      label: string;
      value: string;
    }[];
  }[];
  fabricComposition: string;
  careInstructions: string[];
  inStock: boolean;
  collection: "pret" | "desire" | "octa-west-2026";
  relatedProducts?: string[];
}

// Convert JSON to record format
const mockProducts: Record<string, Product> = productsData.reduce((acc, product) => {
  acc[product.id] = product as Product;
  return acc;
}, {} as Record<string, Product>);

// Product service functions
export async function getProductById(id: string): Promise<Product | null> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300));
  return mockProducts[id] || null;
}

export async function getRelatedProducts(
  collectionId: string,
  currentProductId: string,
  limit: number = 4
): Promise<Product[]> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return Object.values(mockProducts)
    .filter(
      (p) => p.collection === collectionId && p.id !== currentProductId
    )
    .slice(0, limit);
}

export async function getProductsByCollection(
  collectionId: string,
  limit?: number
): Promise<Product[]> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const filtered = Object.values(mockProducts).filter(
    (p) => p.collection === collectionId
  );
  return limit ? filtered.slice(0, limit) : filtered;
}
