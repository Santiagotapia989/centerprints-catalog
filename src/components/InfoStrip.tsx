import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { SITE, phoneTel } from "@/data/site";

const items = [
  {
    icono: Clock,
    titulo: "Horario de atención",
    detalle: SITE.horario,
  },
  {
    icono: MapPin,
    titulo: "Dirección",
    detalle: SITE.direccion,
  },
  {
    icono: Phone,
    titulo: "Teléfonos",
    detalle: `${SITE.telefono1} / ${SITE.telefono2}`,
  },
  {
    icono: Mail,
    titulo: "Email",
    detalle: SITE.email,
  },
];

export default function InfoStrip() {
  return (
    <section className="relative z-10 mx-auto -mt-14 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid gap-4 rounded-2xl border border-navy-600/50 bg-white p-5 shadow-xl shadow-navy-950/10 sm:grid-cols-2 lg:grid-cols-4 lg:p-6">
        {items.map((item) => (
          <div key={item.titulo} className="flex items-start gap-3">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent-500/10 text-accent-600 ring-1 ring-accent-500/20">
              <item.icono className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wider text-mist-400">
                {item.titulo}
              </p>
              <p className="mt-1 truncate text-sm font-medium text-navy-900">
                {item.detalle}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}