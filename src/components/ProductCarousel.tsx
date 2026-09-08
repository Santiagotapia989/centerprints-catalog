"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Producto } from "@/data/types";
import ProductCard from "./ProductCard";

export default function ProductCarousel({
  productos,
}: {
  productos: Producto[];
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: "smooth" });
  };

  return (
    <div className="relative">
      {/* Mobile: Grid layout - 1 column on xs, 2 on sm */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
        {productos.map((producto) => (
          <ProductCard key={producto.id} producto={producto} />
        ))}
      </div>

      {/* Desktop: Horizontal scroll carousel */}
      <div className="hidden md:block">
        <div
          ref={trackRef}
          className="no-scrollbar mt-6 flex gap-5 overflow-x-auto scroll-smooth pb-4 pt-2 snap-x snap-mandatory"
        >
          {productos.map((producto) => (
            <ProductCard key={producto.id} producto={producto} />
          ))}
        </div>

        <button
          type="button"
          onClick={() => scroll(-1)}
          aria-label="Ver productos anteriores"
          className="absolute -left-3 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-navy-600/50 bg-white text-navy-900 shadow-lg shadow-navy-950/10 transition-colors hover:bg-accent-500 hover:text-white"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => scroll(1)}
          aria-label="Ver más productos"
          className="absolute -right-3 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-navy-600/50 bg-white text-navy-900 shadow-lg shadow-navy-950/10 transition-colors hover:bg-accent-500 hover:text-white"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}