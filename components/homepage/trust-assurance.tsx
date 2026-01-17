interface Assurance {
  title: string;
  description: string;
}

const assurances: Assurance[] = [
  {
    title: "Cash on Delivery",
    description: "Pay when your order arrives",
  },
  {
    title: "Nationwide Shipping",
    description: "We deliver across Pakistan",
  },
  {
    title: "Easy Returns",
    description: "Hassle-free returns within 14 days",
  },
];

export function TrustAssurance() {
  return (
    <section className="w-full py-16 md:py-20 bg-black border-t border-gray-800" aria-label="Service guarantees">
      <div className="container mx-auto px-4 md:px-8 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {assurances.map((item, index) => (
            <article key={index} className="text-center">
              <h3 className="text-sm font-medium text-white mb-2">
                {item.title}
              </h3>
              <p className="text-xs text-gray-500">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}