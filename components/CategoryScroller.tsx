const quickCategories: { label: string; category: string; image: string }[] =
  [
    {
      label: "Khussa",
      category: "Khussa & Flats",
      image:
        "https://images.unsplash.com/photo-1543508282-6319a3e2621f?auto=format&fit=crop&w=300&q=70",
    },
    {
      label: "Heels",
      category: "Heels",
      image:
        "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=300&q=70",
    },
    {
      label: "Sandals",
      category: "Sandals",
      image:
        "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=300&q=70",
    },
    {
      label: "Handbags",
      category: "Bags",
      image:
        "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=300&q=70",
    },
    {
      label: "Fragrances",
      category: "Fragrances",
      image:
        "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=300&q=70",
    },
    {
      label: "Clearance",
      category: "Clearance Sale",
      image:
        "https://images.unsplash.com/photo-1554062614-6da4fa0afd91?auto=format&fit=crop&w=300&q=70",
    },
  ];

export default function CategoryScroller({
  onSelect,
}: {
  onSelect: (category: string) => void;
}) {
  return (
    <section className="max-w-7xl mx-auto px-5 md:px-8 py-12">
      <div className="flex gap-6 overflow-x-auto no-scrollbar">
        {quickCategories.map((c) => (
          <button
            key={c.label}
            onClick={() => {
              onSelect(c.category);
              const el = document.getElementById("shop");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="flex flex-col items-center gap-3 shrink-0 group"
          >
            <span className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border border-charcoal/10 transition-transform duration-300 group-hover:scale-105">
              <img
                src={c.image}
                alt={c.label}
                className="w-full h-full object-cover"
              />
            </span>
            <span className="text-[12px] tracking-wide text-ink/80">
              {c.label}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
