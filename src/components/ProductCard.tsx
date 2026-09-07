import { MessageCircle } from "lucide-react";
import type { Producto } from "@/data/types";
import { whatsappLink } from "@/data/site";

export default function ProductCard({ producto }: { producto: Producto }) {
  return (
    <article className="group relative flex w-64 shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-navy-600/50 bg-white shadow-sm transition-all duration-300 hover:border-accent-500/40 hover:shadow-xl hover:shadow-accent-500/10 sm:w-72">
      <div className="relative aspect-square overflow-hidden bg-paper-100">
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