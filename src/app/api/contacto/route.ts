import { NextResponse } from "next/server";
import { Resend } from "resend";

const DESTINO = "sbazan@fie.undef.edu.ar";

interface DatosConsulta {
  nombre?: string;
  empresa?: string;
  email?: string;
  telefono?: string;
  producto?: string;
  tipo?: string;
  mensaje?: string;
}

function escapar(valor: string | undefined): string {
  return (valor ?? "").trim();
}

export async function POST(request: Request) {
  let datos: DatosConsulta;
  try {
    datos = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Cuerpo inválido" },
      { status: 400 }
    );
  }

  const nombre = escapar(datos.nombre);
  const email = escapar(datos.email);

  if (!nombre || !email) {
    return NextResponse.json(
      { ok: false, error: "Nombre y email son obligatorios" },
      { status: 400 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("Falta la variable de entorno RESEND_API_KEY");
    return NextResponse.json(
      { ok: false, error: "Servidor mal configurado" },
      { status: 500 }
    );
  }

  const resend = new Resend(apiKey);
  const desde =
    process.env.EMAIL_FROM || "onboarding@resend.dev";
  const mensaje = escapar(datos.mensaje);

  const cuerpo = [
    `Nombre y apellido: ${nombre}`,
    `Empresa: ${escapar(datos.empresa) || "-"}`,
    `Email: ${email}`,
    `Teléfono: ${escapar(datos.telefono) || "-"}`,
    `Producto consultado: ${escapar(datos.producto) || "-"}`,
    `Tipo de consulta: ${escapar(datos.tipo) || "-"}`,
    "",
    "Mensaje:",
    mensaje || "-",
  ].join("\n");

  try {
    const { error } = await resend.emails.send({
      from: desde,
      to: [DESTINO],
      replyTo: email,
      subject: "Nueva consulta desde la web - Center Print's",
      text: cuerpo,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { ok: false, error: "No se pudo enviar el email" },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Error enviando email:", err);
    return NextResponse.json(
      { ok: false, error: "No se pudo enviar el email" },
      { status: 500 }
    );
  }
}