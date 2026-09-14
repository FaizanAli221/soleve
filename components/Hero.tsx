export default function Hero({
  onShopHeels,
  onShopKhussa,
}: {
  onShopHeels: () => void;
  onShopKhussa: () => void;
}) {
  return (
    <section className="relative bg-charcoal text-blush overflow-hidden">
      <div className="absolute inset-0 opacity-[0.55]">
        <img
          src="https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1600&q=70"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/60 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-5 md:px-8 py-24 md:py-36">
        <p className="text-[13px] tracking-[0.3em] text-champagne mb-5">
          FOOTWEAR COLLECTION '26
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl leading-[1.08] max-w-xl mb-6">
          Elegance in every step
        </h1>
        <p className="text-blush/70 max-w-md mb-9 text-[15px] leading-relaxed">
          Hand-finished leather, quiet gold detailing, and silhouettes built
          to outlast the season. This is footwear as a considered choice.
        </p>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => {
              onShopHeels();
              const el = document.getElementById("shop");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="bg-champagne text-charcoal px-7 py-3.5 text-[13px] tracking-wide hover:bg-blush transition-colors"
          >
            Shop Heels
          </button>
          <button
            onClick={() => {
              onShopKhussa();
              const el = document.getElementById("shop");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="border border-blush/40 px-7 py-3.5 text-[13px] tracking-wide hover:border-blush transition-colors"
          >
            Explore Festive Khussa
          </button>
        </div>
      </div>
    </section>
  );
}
