import Image from "next/image";

interface Detail {
  title: string;
  description: string;
  image: string;
}

const details: Detail[] = [
  {
    title: "Fabric",
    description: "Sourced from trusted mills",
    image: "https://images.unsplash.com/photo-1590078765969-4e3be3cee826?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Form",
    description: "Designed for movement",
    image: "https://images.unsplash.com/photo-1591369822091-8b8db6b08a0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Craft",
    description: "Attention to detail",
    image: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
];

export function FabricFormCraft() {
  return (
    <section className="w-full py-24 md:py-32 bg-white" aria-labelledby="craft-heading">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <header className="max-w-2xl mb-16 md:mb-20">
          <h2 id="craft-heading" className="text-2xl md:text-3xl font-medium text-black mb-4">
            Fabric, Form & Craft
          </h2>
          <p className="text-gray-500">
            The details that define our pieces. Each garment is a study in thoughtful construction.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {details.map((detail, index) => (
            <article key={index} className="group">
              <div className="relative aspect-[4/5] bg-gray-100 overflow-hidden mb-6">
                <Image
                  src={detail.image}
                  alt={detail.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <h3 className="text-lg font-medium text-black mb-2">
                {detail.title}
              </h3>
              <p className="text-sm text-gray-500">
                {detail.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}