import Image from "next/image";
import Link from "next/link";
import { PriceTag } from "./price-tag";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  currency: string;
  image: string;
  imageAlt: string;
  layout?: "horizontal" | "vertical";
}

export function ProductCard({
  id,
  name,
  price,
  currency,
  image,
  imageAlt,
  layout = "vertical",
}: ProductCardProps) {
  return (
    <Link href={`/product/${id}`}>
      <article className="group cursor-pointer">
        <div className="relative aspect-square bg-gray-100 overflow-hidden mb-4">
          <Image
            src={image}
            alt={imageAlt}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        </div>
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-black group-hover:text-gray-700 transition-colors">
            {name}
          </h3>
          <PriceTag price={price} currency={currency} size="sm" />
        </div>
      </article>
    </Link>
  );
}
