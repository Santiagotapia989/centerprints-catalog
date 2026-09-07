import type { LucideIcon } from "lucide-react";
import {
  Archive,
  BookOpen,
  FileText,
  PenLine,
  PencilRuler,
  Sparkles,
  Wrench,
} from "lucide-react";
import { catalogo } from "@/data/catalog";
import ProductCarousel from "./ProductCarousel";

const iconos: Record<string, LucideIcon> = {
  file: FileText,
  pen: PenLine,
  book: BookOpen,
  archive: Archive,
  sparkles: Sparkles,
  brush: PencilRuler,
  wrench: Wrench,
};

export default function Catalog() {
  return (
    <section
      id="catalogo"
      className="relative overflow-hidden py-24"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(29,78,140,0.07),transparent_60%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-accent-600">
            Catálogo completo
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-navy-900 sm:text-4xl">
            Productos para cada necesidad de tu negocio
          </h2>
          <p className="mt-4 text-base leading-relaxed text-mist-300">
            Navegá las categorías y deslizá para descubrir todos los ítems.
            Ante cualquier consulta, escribinos directo por WhatsApp.
          </p>
        </div>

        <div className="mt-14 space-y-16">
          {catalogo.categorias.map((categoria) => {
            const Icono = iconos[categoria.icono] ?? FileText;
            return (
              <div key={categoria.id} id={categoria.id}>
                <div className="flex flex-wrap items-end justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-accent-500/15 to-accent-600/15 ring-1 ring-accent-500/25">
                      <Icono className="h-6 w-6 text-accent-600" />
                    </span>
                    <div>
                      <h3 className="text-xl font-bold text-navy-900 sm:text-2xl">
                        {categoria.titulo}
                      </h3>
                      <p className="mt-1 max-w-xl text-sm text-mist-300">
                        {categoria.descripcion}
                      </p>
                    </div>
                  </div>
                  <span className="rounded-full border border-navy-600/50 bg-white px-3 py-1 text-xs font-medium text-navy-900">
                    {categoria.productos.length}{" "}
                    {categoria.productos.length === 1 ? "producto" : "productos"}
                  </span>
                </div>

                <ProductCarousel productos={categoria.productos} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}