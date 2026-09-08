import { ArrowRight } from "lucide-react";
import { SITE } from "@/data/site";
import HeroBenefits from "./HeroBenefits";

export default function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden bg-navy-950">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(31,41,55,0.5),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-zinc-800" />

      <div className="relative mx-auto w-full max-w-6xl px-4 pb-20 pt-28 text-center sm:px-6 lg:pb-28 lg:pt-36">
        <span className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-400">
          {SITE.nombre}
        </span>

        <h1 className="mt-5 text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
          Tu librería comercial, escolar y de oficina
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">
          Venta mayorista y minorista con atención personalizada y envíos en el
          día desde nuestro local en Av. Rivadavia.
        </p>

        <div className="mt-10 flex justify-center">
          <a
            href="#catalogo"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent-500 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-accent-950/40 transition-colors hover:bg-accent-400"
          >
            Explorar catálogo
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <div className="mt-16 text-left">
          <HeroBenefits />
        </div>
      </div>
    </section>
  );
}