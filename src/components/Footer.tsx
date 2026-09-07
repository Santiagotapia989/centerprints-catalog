import { Clock, Mail, MapPin, Phone, MessageCircle } from "lucide-react";
import Logo from "./Logo";
import { SITE, phoneTel, whatsappLink } from "@/data/site";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-navy-950">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Logo />
            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/60">
              Librería comercial y escolar con más de 25 años de trayectoria.
              Papelería, archivo, higiene e insumos de oficina en el centro de
              la Ciudad Autónoma de Buenos Aires.
            </p>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              <MessageCircle className="h-4 w-4 text-emerald-400" />
              Consultar por WhatsApp
            </a>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white/50">
              Contacto
            </h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href={phoneTel(SITE.telefono1)}
                  className="flex items-center gap-3 text-white/80 transition-colors hover:text-white"
                >
                  <Phone className="h-4 w-4 text-accent-300" />
                  {SITE.telefono1} / {SITE.telefono2}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="flex items-center gap-3 text-white/80 transition-colors hover:text-white"
                >
                  <Mail className="h-4 w-4 text-accent-300" />
                  {SITE.email}
                </a>
              </li>
              <li className="flex items-center gap-3 text-white/80">
                <MapPin className="h-4 w-4 text-accent-300" />
                {SITE.direccion}
              </li>
              <li className="flex items-center gap-3 text-white/80">
                <Clock className="h-4 w-4 text-accent-300" />
                Lunes a Viernes · 09 a 18 hs
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white/50">
              Categorías
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-white/80">
              <li>
                <a href="#papeleria" className="transition-colors hover:text-white hover:underline">Papelería y Resmas</a>
              </li>
              <li>
                <a href="#escritura" className="transition-colors hover:text-white hover:underline">Escritura y Marcadores</a>
              </li>
              <li>
                <a href="#agendas" className="transition-colors hover:text-white hover:underline">Agendas y Cuadernos</a>
              </li>
              <li>
                <a href="#archivo" className="transition-colors hover:text-white hover:underline">Formularios y Archivo</a>
              </li>
              <li>
                <a href="#higiene" className="transition-colors hover:text-white hover:underline">Higiene y Limpieza</a>
              </li>
              <li>
                <a href="#escolar" className="transition-colors hover:text-white hover:underline">Escolar</a>
              </li>
              <li>
                <a href="#oficina" className="transition-colors hover:text-white hover:underline">Herramientas de Oficina</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {SITE.nombre}. Todos los derechos
            reservados.
          </p>
          <p>Av. Rivadavia 938 · CABA · Argentina</p>
        </div>
      </div>
    </footer>
  );
}