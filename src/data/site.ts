export const SITE = {
  nombre: "Center Print's S.R.L.",
  tagline: "Librería Comercial, Escolar e Insumos para Empresas",
  direccion: "Pleno centro, CABA",
  telefono1: "4345-2640",
  telefono2: "4343-7514",
  email: "info@centerprint.com.ar",
  horario: "Lunes a Viernes · 09:00 a 18:00 hs",
  heroImagen:
    "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1920&q=80",
};

export const getWhatsappNumber = () => {
  return process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5491126485586";
};

export const whatsappLink = (mensaje?: string) => {
  const num = getWhatsappNumber();
  const text = mensaje ? `?text=${encodeURIComponent(mensaje)}` : "";
  return `https://wa.me/${num}${text}`;
};

export function phoneTel(fijo: string): string {
  return `tel:+5411${fijo.replace(/\D/g, "")}`;
}