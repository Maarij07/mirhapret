import Image from "next/image";
import Link from "next/link";

interface Occasion {
  id: string;
  title: string;
  description: string;
  image: string;
}

const occasions: Occasion[] = [
  {
    id: "work",
    title: "Work",
    description: "Professional elegance redefined",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "evening",
    title: "Evening",
    description: "Sophistication for night",
    image: "https://images.unsplash.com/photo-1560343090-f071b2188e7d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "celebration",
    title: "Celebration",
    description: "Moments worth dressing for",
    image: "https://images.unsplash.com/photo-1529139573780-772524d50bc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "travel",
    title: "Travel",
    description: "Journeys in comfort",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
];

export function OccasionStyling() {
  return (
    <section className="w-full py-24 md:py-32 bg-black" aria-labelledby="occasion-heading">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <header className="text-center mb-16 md:mb-20">
          <h2 id="occasion-heading" className="text-2xl md:text-3xl font-medium text-white mb-4">
            Dress for the Moment
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Each designed for the moments that matter
          </p>
        </header>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {occasions.map((occasion) => (
            <Link
              href={`/occasion/${occasion.id}`}
              key={occasion.id}
              className="group block"
            >
              <article>
                <div className="relative aspect-[3/4] bg-gray-900 overflow-hidden mb-4">
                  <Image
                    src={occasion.image}
                    alt={occasion.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
                <h3 className="text-sm font-medium text-white mb-1">
                  {occasion.title}
                </h3>
                <p className="text-xs text-gray-500">
                  {occasion.description}
                </p>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}