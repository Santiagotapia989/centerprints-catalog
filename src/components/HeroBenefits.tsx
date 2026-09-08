import { Package, Store, Truck } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const beneficios: { icono: LucideIcon; titulo: string; detalle: string }[] = [
  {
    icono: Store,
    titulo: "Atención Mayorista",
    detalle: "Presupuestos a medida para empresas y colegios.",
  },
  {
    icono: Truck,
    titulo: "Entrega Rápida",
    detalle: "Despachos directos desde nuestro local en Av. Rivadavia.",
  },
  {
    icono: Package,
    titulo: "Stock Permanente",
    detalle: "Marcas líderes en papelería, escritura y oficina.",
  },
];

export default function HeroBenefits() {
  return (
    <dl className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-5">
      {beneficios.map(({ icono: Icono, titulo, detalle }) => (
        <div
          key={titulo}
          className="flex flex-col gap-2.5 rounded-xl border border-zinc-800 bg-zinc-900/80 p-6 text-left"
        >
          <dt className="flex items-center gap-2.5 text-sm font-semibold text-zinc-100">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-navy-900 ring-1 ring-zinc-800">
              <Icono className="h-4 w-4 text-accent-300" />
            </span>
            {titulo}
          </dt>
          <dd className="mt-1 text-sm leading-relaxed text-zinc-400">
            {detalle}
          </dd>
        </div>
      ))}
    </dl>
  );
}