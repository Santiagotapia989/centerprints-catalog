"use client";

import { useState } from "react";
import { Check, MessageCircle, Sparkles } from "lucide-react";
import type { Producto } from "@/data/types";
import { whatsappLink } from "@/data/site";
import { useCartStore } from "@/store/cart";

function ComboPanel({ producto }: { producto: Producto }) {
  const items = producto.especificaciones
    .split("·")
    .map((item) => item.trim())
    .filter(Boolean);

  return (
    <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-accent-600 via-accent-500 to-accent-300 p-5">
      <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-accent-600">
        {producto.marca}
      </span>
      <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
        <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white/15 text-white ring-1 ring-white/30">
          <Sparkles className="h-7 w-7" />
        </span>
        <ul className="w-full space-y-2">
          {items.map((item) => (
            <li
              key={item}
              className="flex items-center justify-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white ring-1 ring-white/20"
            >
              <Check className="h-3.5 w-3.5 text-emerald-300" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function ProductCard({ producto }: { producto: Producto }) {
  const { addItem } = useCartStore();
  const [quantity, setQuantity] = useState(1);
  const esCombo = producto.nombre.includes("Pack Higiene Comercial");

  const basePrice = producto.price || producto.precio || 1500;
  const totalPrice = basePrice * quantity;

  const handleAddToCart = () => {
    addItem(producto, quantity);
  };

  return (
    <article
      className="group relative flex w-64 shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-navy-600/50 bg-white shadow-sm transition-all duration-300 hover:border-accent-500/40 hover:shadow-xl hover:shadow-accent-500/10 sm:w-72"
    >
      <div className="relative aspect-square overflow-hidden bg-paper-100">
        {esCombo ? (
          <ComboPanel producto={producto} />
        ) : (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={producto.imagen}
              alt={producto.nombre}
              loading="lazy"
              className="h-full w-full object-contain p-3 transition-transform duration-500 group-hover:scale-105"
            />
            <span className="absolute left-3 top-3 rounded-full bg-navy-950/85 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white backdrop-blur">
              {producto.marca}
            </span>
          </>
        )}
      </div>

      <div className="flex flex-1 flex-col items-center gap-2 p-4 text-center">
        <h4 className="text-sm font-semibold leading-snug text-navy-900">
          {producto.nombre}
        </h4>

        <p className="text-xs text-zinc-500">
          ${basePrice.toLocaleString("es-AR")} c/u
        </p>

        {/* Quantity selector - larger touch targets on mobile */}
        <div className="flex items-center justify-center gap-3 mb-3">
          <button
            onClick={() => setQuantity((q: number) => Math.max(1, q - 1))}
            className="rounded-lg w-10 h-10 flex items-center justify-center bg-zinc-100 text-zinc-700 transition-colors hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={quantity <= 1}
            aria-label="Disminuir cantidad"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </button>

          <span className="text-zinc-600 font-medium w-10 text-center text-base">
            {quantity}
          </span>

          <button
            onClick={() => setQuantity((q: number) => Math.min(50, q + 1))}
            className="rounded-lg w-10 h-10 flex items-center justify-center bg-zinc-100 text-zinc-700 transition-colors hover:bg-zinc-200"
            aria-label="Aumentar cantidad"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </button>
        </div>

        <p className="text-sm font-bold text-zinc-900 mb-3">
          Total: ${totalPrice.toLocaleString("es-AR")}
        </p>

        <p className="max-w-full leading-relaxed text-mist-300 text-xs mb-4">
          {producto.especificaciones}
        </p>

        {/* Buttons - stacked on mobile, side by side on desktop */}
        <div className="flex flex-col sm:flex-row gap-2 w-full">
          <button
            onClick={handleAddToCart}
            className="flex-1 rounded-lg bg-slate-800 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-700 active:bg-slate-900 min-h-[48px]"
          >
            Agregar al carrito
          </button>

          <a
            href={whatsappLink(producto.nombre)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 rounded-lg bg-[#059669] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#047857] active:bg-[#065f46] flex items-center justify-center gap-1 min-h-[48px]"
          >
            <MessageCircle className="h-4 w-4" />
            Consultar por WhatsApp
          </a>
        </div>
      </div>
    </article>
  );
}