import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { SITE, phoneTel } from "@/data/site";

const mapSrc =
  "https://www.google.com/maps?q=Av.%20Rivadavia%20938%2C%20CABA%2C%20Argentina&output=embed&hl=es";

const tarjetas = [
  {
    icono: MapPin,
    titulo: "Dirección",
    lineas: [SITE.direccion],
  },
  {
    icono: Clock,
    titulo: "Horarios",
    lineas: ["Lunes a Viernes", "09:00 a 18:00 hs"],
  },
  {
    icono: Phone,
    titulo: "Teléfonos",
    enlaces: [
      { etiqueta: SITE.telefono1, href: phoneTel(SITE.telefono1) },
      { etiqueta: SITE.telefono2, href: phoneTel(SITE.telefono2) },
    ],
  },
  {
    icono: Mail,
    titulo: "Email",
    enlaces: [{ etiqueta: SITE.email, href: `mailto:${SITE.email}` }],
  },
];

export default function LocationSection() {
  return (
    <section
      id="donde-encontrarnos"
      className="relative border-t border-navy-600/40 bg-paper-100 py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-accent-600">
            Dónde encontrarnos
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-navy-900 sm:text-4xl">
            Te esperamos en pleno centro porteño
          </h2>
          <p className="mt-4 text-base leading-relaxed text-mist-300">
            Encontrános sobre Av. Rivadavia, en el corazón de la Ciudad de
            Buenos Aires. Venite a visitar el local o escribinos y coordinamos
            tu pedido.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-5">
          <div className="space-y-4 lg:col-span-2">
            {tarjetas.map((t) => (
              <div
                key={t.titulo}
                className="flex items-start gap-4 rounded-2xl border border-navy-600/50 bg-white p-5 shadow-sm"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent-500/10 text-accent-600 ring-1 ring-accent-500/20">
                  <t.icono className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-mist-400">
                    {t.titulo}
                  </p>
                  {t.lineas?.map((l) => (
                    <p key={l} className="mt-1 text-sm font-medium text-navy-900">
                      {l}
                    </p>
                  ))}
                  {t.enlaces?.map((e) => (
                    <a
                      key={e.etiqueta}
                      href={e.href}
                      className="mt-1 block text-sm font-medium text-accent-600 transition-colors hover:text-accent-500"
                    >
                      {e.etiqueta}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="overflow-hidden rounded-2xl border border-navy-600/50 lg:col-span-3">
            <iframe
              title="Mapa — Center Print's S.R.L., Av. Rivadavia 938, CABA"
              src={mapSrc}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full min-h-[420px] w-full"
              style={{
                border: 0,
                filter: "grayscale(25%) contrast(0.95)",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}