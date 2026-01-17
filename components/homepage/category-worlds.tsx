import Image from "next/image";
import Link from "next/link";

interface Category {
  id: string;
  title: string;
  description: string;
  image: string;
}

const categories: Category[] = [
  {
    id: "pret",
    title: "Pret",
    description: "Everyday silhouettes, elevated",
    image: "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1070&q=80",
  },
  {
    id: "desire",
    title: "Desire",
    description: "Evenings with intention",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1070&q=80",
  },
  {
    id: "octa-west-2026",
    title: "Octa-West 2026",
    description: "A future collection",
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1070&q=80",
  },
];

export function CategoryWorlds() {
  return (
    <section className="w-full py-24 md:py-32 bg-white" aria-labelledby="category-heading">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <header className="text-center mb-16 md:mb-20">
          <h2 id="category-heading" className="text-2xl md:text-3xl font-medium text-black mb-4">
            Discover Our Worlds
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Three distinct collections, each with its own character
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {categories.map((category) => (
            <Link
              href={`/category/${category.id}`}
              key={category.id}
              className="group block"
            >
              <article className="relative overflow-hidden">
                <div className="relative aspect-[3/4] bg-gray-100">
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="pt-6 pb-2">
                  <h3 className="text-lg font-medium text-black mb-1">
                    {category.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-3">
                    {category.description}
                  </p>
                  <span className="text-xs text-black border-b border-black pb-0.5 transition-all group-hover:border-gray-400">
                    Explore
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}