interface PriceTagProps {
  price: number;
  currency: string;
  size?: "sm" | "md" | "lg";
}

export function PriceTag({ price, currency, size = "md" }: PriceTagProps) {
  const sizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  const formattedPrice = new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
  }).format(price);

  return (
    <span className={`font-medium text-black ${sizeClasses[size]}`}>
      {formattedPrice}
    </span>
  );
}
