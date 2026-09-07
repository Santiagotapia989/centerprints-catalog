"use client";

import { useState } from "react";
import {
  CheckCircle2,
  Inbox,
  Loader2,
  MessageCircle,
  Send,
} from "lucide-react";
import { SITE, whatsappLink } from "@/data/site";

type Estado = "idle" | "enviando" | "ok" | "error";

const valoresIniciales = {
  nombre: "",
  empresa: "",
  email: "",
  telefono: "",
  producto: "",
  tipo: "Consulta",
  mensaje: "",
};

const campo =
  "w-full rounded-xl border border-navy-600/60 bg-white px-4 py-3 text-sm text-navy-900 placeholder:text-mist-400 outline-none transition focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20";

const etiqueta =
  "mb-1.5 block text-xs font-semibold uppercase tracking-wider text-mist-400";

export default function ContactSection() {
  const [estado, setEstado] = useState<Estado>("idle");
  const [form, setForm] = useState(valoresIniciales);

  const actualizar = (
    campoForm: keyof typeof valoresIniciales,
    valor: string
  ) => setForm((prev) => ({ ...prev, [campoForm]: valor }));

  async function enviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setEstado("enviando");
    try {
      const respuesta = await fetch(SITE.webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          origen: "sitio-web",
          fecha: new Date().toISOString(),
        }),
      });
      if (!respuesta.ok) throw new Error("webhook_err");
      setEstado("ok");
    } catch {
      setEstado("error");
    }
  }

  return (
    <section id="contacto" className="relative overflow-hidden py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(29,78,140,0.06),transparent_60%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-accent-600">
              Contacto y presupuesto
            </span>
            <h2 className="mt-3 text-3xl font-extrabold text-navy-900 sm:text-4xl">
              Solicita tu presupuesto sin compromiso
            </h2>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-mist-300">
              Completá el formulario y te respondemos a la brevedad con precios,
              disponibilidad y formas de entrega para tu empresa.
            </p>

            <ul className="mt-8 space-y-3">
              {[
                "Respuesta rápida dentro del horario comercial",
                "Presupuestos mayoristas y minoristas",
                "Consultas por WhatsApp o por este formulario",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-mist-300">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent-600" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-navy-600/50 bg-white p-6 shadow-xl shadow-navy-950/10 sm:p-8">
            {estado === "ok" ? (
              <div className="flex flex-col items-center gap-4 py-10 text-center">
                <span className="grid h-16 w-16 place-items-center rounded-full bg-emerald-500/15 text-emerald-600 ring-1 ring-emerald-500/30">
                  <Inbox className="h-8 w-8" />
                </span>
                <h3 className="text-xl font-bold text-navy-900">
                  ¡Consulta recibida!
                </h3>
                <p className="max-w-sm text-sm text-mist-300">
                  Gracias por escribirnos. Nuestro equipo va a responder tu
                  consulta por email o teléfono a la brevedad.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setForm(valoresIniciales);
                    setEstado("idle");
                  }}
                  className="text-sm font-semibold text-accent-600 transition-colors hover:text-accent-500"
                >
                  Enviar otra consulta
                </button>
              </div>
            ) : (
              <form onSubmit={enviar} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="nombre" className={etiqueta}>
                      Nombre y apellido *
                    </label>
                    <input
                      id="nombre"
                      required
                      value={form.nombre}
                      onChange={(e) => actualizar("nombre", e.target.value)}
                      placeholder="Ej.: Juan Pérez"
                      className={campo}
                    />
                  </div>
                  <div>
                    <label htmlFor="empresa" className={etiqueta}>
                      Empresa
                    </label>
                    <input
                      id="empresa"
                      value={form.empresa}
                      onChange={(e) => actualizar("empresa", e.target.value)}
                      placeholder="Nombre de tu empresa"
                      className={campo}
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="email" className={etiqueta}>
                      Email *
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => actualizar("email", e.target.value)}
                      placeholder="tu@email.com"
                      className={campo}
                    />
                  </div>
                  <div>
                    <label htmlFor="telefono" className={etiqueta}>
                      Teléfono
                    </label>
                    <input
                      id="telefono"
                      value={form.telefono}
                      onChange={(e) => actualizar("telefono", e.target.value)}
                      placeholder="11 1234 5678"
                      className={campo}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="producto" className={etiqueta}>
                    Producto de interés
                  </label>
                  <input
                    id="producto"
                    value={form.producto}
                    onChange={(e) => actualizar("producto", e.target.value)}
                    placeholder="Ej.: Resma Ledesma Autor 80g A4"
                    className={campo}
                  />
                </div>

                <div>
                  <label htmlFor="tipo" className={etiqueta}>
                    Tipo de consulta
                  </label>
                  <select
                    id="tipo"
                    value={form.tipo}
                    onChange={(e) => actualizar("tipo", e.target.value)}
                    className={campo}
                  >
                    <option>Consulta</option>
                    <option>Presupuesto</option>
                    <option>Compra mayorista</option>
                    <option>Reclamo</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="mensaje" className={etiqueta}>
                    Mensaje
                  </label>
                  <textarea
                    id="mensaje"
                    rows={4}
                    value={form.mensaje}
                    onChange={(e) => actualizar("mensaje", e.target.value)}
                    placeholder="Contanos qué necesitás..."
                    className={`${campo} resize-none`}
                  />
                </div>

                <div className="flex flex-col gap-3 pt-1 sm:flex-row">
                  <button
                    type="submit"
                    disabled={estado === "enviando"}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-accent-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-navy-950/20 transition-all hover:bg-accent-400 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {estado === "enviando" ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Enviar consulta
                      </>
                    )}
                  </button>
                  <a
                    href={whatsappLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-navy-600/60 bg-white px-6 py-3.5 text-sm font-semibold text-navy-900 transition-colors hover:bg-paper-100"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Prefiero WhatsApp
                  </a>
                </div>

                {estado === "error" && (
                  <p className="rounded-xl border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-300">
                    No pudimos registrar la consulta.{" "}
                    <a
                      href={whatsappLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold underline underline-offset-2"
                    >
                      Escribinos por WhatsApp
                    </a>{" "}
                    o llamanos al {SITE.telefono1}.
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}