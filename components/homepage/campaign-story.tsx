import Image from "next/image";

export function CampaignStory() {
  return (
    <section className="w-full py-24 md:py-32 bg-white" aria-labelledby="campaign-heading">
      <div className="container mx-auto px-4 md:px-8 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <div className="relative aspect-[4/5] bg-gray-100 overflow-hidden order-2 lg:order-1">
            <Image
              src="https://images.unsplash.com/photo-1558171813-4c088753af8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
              alt="Campaign visual showing fabric in motion"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <span className="text-xs tracking-widest text-gray-400 uppercase mb-6 block">
              The Philosophy
            </span>
            <h2 id="campaign-heading" className="text-2xl md:text-3xl font-medium text-black mb-8 leading-relaxed">
              Designed around movement
            </h2>
            <div className="space-y-6 text-gray-600 leading-relaxed">
              <p>
                This collection was designed around movement — how fabric follows 
                the body, not controls it.
              </p>
              <p>
                Each piece is intended to feel like a second skin, moving with you 
                through the day&apos;s rhythms. We believe clothing should enhance 
                your life, not restrict it.
              </p>
            </div>
            <div className="mt-10 pt-10 border-t border-gray-200">
              <blockquote className="text-sm text-gray-500 italic">
                &ldquo;Clothing should be invisible in its perfection.&rdquo;
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}