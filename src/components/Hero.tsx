import { MessageCircle, PackageSearch } from "lucide-react";
import { SITE, whatsappLink } from "@/data/site";
import Logo from "./Logo";

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative isolate flex min-h-screen items-center overflow-hidden"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={SITE.heroImagen}
        alt=""
        className="absolute inset-0 -z-20 h-full w-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-navy-950/95 via-navy-900/90 to-navy-950/70" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(148,163,184,0.25),transparent_55%)]" />

      <div className="mx-auto w-full max-w-7xl px-4 pb-24 pt-32 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <Logo size="lg" />

          <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-accent-300/40 bg-navy-950/40 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-accent-200 backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-accent-300" />
            {SITE.tagline}
          </span>

          <h1 className="mt-6 text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
            Todo para tu{" "}
            <span className="bg-gradient-to-r from-accent-300 to-accent-500 bg-clip-text text-transparent">
              librería, oficina y escuela
            </span>
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/85">
            Papelería, resmas, escritura, agendas, higiene, archivo y
            herramientas de oficina de primeras marcas. Atención mayorista y
            minorista con entrega directa en{" "}
            <strong className="font-semibold text-white">
              Av. Rivadavia 938, CABA
            </strong>
            .
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#catalogo"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-navy-950/40 transition-all hover:bg-accent-400"
            >
              <PackageSearch className="h-4 w-4" />
              Ver catálogo
            </a>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/20"
            >
              <MessageCircle className="h-4 w-4" />
              Consultar por WhatsApp
            </a>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-white/70">
            <span>{SITE.horario}</span>
            <span className="hidden h-1 w-1 rounded-full bg-white/40 sm:block" />
            <span>{SITE.telefono1} / {SITE.telefono2}</span>
            <span className="hidden h-1 w-1 rounded-full bg-white/40 sm:block" />
            <span>{SITE.email}</span>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-navy-950/80 to-transparent" />
    </section>
  );
}