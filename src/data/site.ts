export const SITE = {
  nombre: "Center Print's S.R.L.",
  tagline: "Librería Comercial, Escolar e Insumos para Empresas",
  direccion: "Av. Rivadavia 938, CABA",
  telefono1: "4345-2640",
  telefono2: "4343-7514",
  email: "centerprint@ciudad.com.ar",
  horario: "Lunes a Viernes · 09:00 a 18:00 hs",
  whatsappNumero: "5491126485586",
  webhookUrl: "http://localhost:5678/webhook/contacto",
  heroImagen:
    "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1920&q=80",
};

export function whatsappLink(producto?: string) {
  const texto = producto
    ? `Hola, quisiera consultar por el producto: ${producto}`
    : "Hola, quisiera hacer una consulta sobre sus productos.";
  return `https://wa.me/${SITE.whatsappNumero}?text=${encodeURIComponent(texto)}`;
}

export function phoneTel(fijo: string) {
  return `tel:+5411${fijo.replace(/\D/g, "")}`;
}