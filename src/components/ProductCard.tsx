import { Check, MessageCircle, Sparkles } from "lucide-react";
import type { Producto } from "@/data/types";
import { whatsappLink } from "@/data/site";

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
  const esCombo = producto.nombre.includes("Pack Higiene Comercial");

  return (
    <article className="group relative flex w-64 shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-navy-600/50 bg-white shadow-sm transition-all duration-300 hover:border-accent-500/40 hover:shadow-xl hover:shadow-accent-500/10 sm:w-72">
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
        <p className="max-w-full leading-relaxed text-mist-300 text-xs">
          {producto.especificaciones}
        </p>
        <a
          href={whatsappLink(producto.nombre)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-500 px-3 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-emerald-400"
        >
          <MessageCircle className="h-4 w-4" />
          Consultar por WhatsApp
        </a>
      </div>
    </article>
  );
}