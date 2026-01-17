import Image from "next/image";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
}

const products: Product[] = [
  {
    id: "1",
    name: "Minimalist Blazer",
    price: "PKR 24,999",
    image: "https://images.unsplash.com/photo-1593030103066-0093718efeb9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "2",
    name: "Essential Trench",
    price: "PKR 32,999",
    image: "https://images.unsplash.com/photo-1552374196-3dcc8e5d3ef3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "3",
    name: "Architectural Dress",
    price: "PKR 18,999",
    image: "https://images.unsplash.com/photo-1571265005346-ae8f1c44f0c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "4",
    name: "Structural Coat",
    price: "PKR 39,999",
    image: "https://images.unsplash.com/photo-1591069817640-426ad17fc58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
];

export function SignatureEdit() {
  return (
    <section className="w-full py-24 md:py-32 bg-black" aria-labelledby="signature-heading">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <header className="text-center mb-16 md:mb-20">
          <h2 id="signature-heading" className="text-2xl md:text-3xl font-medium text-white mb-4">
            The Signature Edit
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Carefully curated pieces that embody our design philosophy
          </p>
        </header>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <Link
              href={`/product/${product.id}`}
              key={product.id}
              className="group block"
            >
              <article>
                <div className="relative aspect-[3/4] bg-gray-900 overflow-hidden mb-4">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-medium text-white group-hover:text-gray-300 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {product.price}
                  </p>
                </div>
              </article>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12 md:mt-16">
          <Link
            href="/collections"
            className="inline-block text-sm text-white border-b border-white pb-0.5 transition-all hover:border-gray-500 hover:text-gray-300"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}