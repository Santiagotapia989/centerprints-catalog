# Center Print's S.R.L. — Sitio Web Corporativo

Sitio web corporativo para **Center Print's S.R.L. – Librería Comercial, Escolar e Insumos para Empresas**, desarrollado con **Next.js 14 (App Router) + TypeScript + Tailwind CSS + Lucide Icons**.

---

## Características

- **Catálogo dinámico** con carruseles deslizables por categoría, alimentado por `src/data/products.json`
- **Carrito de compras** lateral (Side Drawer) con persistencia en `localStorage`
- **Checkout con Mercado Pago** – API Route `/api/checkout` que genera preferencias de pago y redirige al checkout oficial
- **Formulario de contacto/presupuesto** con envío vía **Resend** (`/api/contacto`)
- **Botones WhatsApp** con mensaje precargado por producto y consulta general
- **Mapa interactivo** de Google Maps (Centro, CABA)
- **Diseño responsive** mobile-first con drawer full-width en móviles y carrusel horizontal en escritorio
- **Persistencia de carrito** en `localStorage` con Zustand

---

## Stack Tecnológico

| Capa | Tecnología |
|------|------------|
| Framework | Next.js 14 (App Router) |
| Lenguaje | TypeScript |
| Estilos | Tailwind CSS |
| Iconos | Lucide React |
| Estado | Zustand + persist (localStorage) |
| Pagos | Mercado Pago SDK |
| Email | Resend |
| Imágenes | Next.js Image / Static assets |

---

## Estructura del Proyecto

```
centerprint/
├── public/
│   ├── images/products/          # Fotos de productos (PNG)
│   ├── logo.png
│   └── icono.png
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── checkout/route.ts     # Mercado Pago preference
│   │   │   └── contacto/route.ts     # Email via Resend
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── CartDrawer.tsx           # Side Drawer + Checkout
│   │   ├── ProductCard.tsx          # Tarjeta con selector cantidad
│   │   ├── ProductCarousel.tsx      # Grid mobile / Carousel desktop
│   │   ├── Navbar.tsx               # Header + Cart + Mobile menu
│   │   ├── Hero.tsx / HeroBenefits.tsx
│   │   ├── Catalog.tsx / ProductCarousel.tsx
│   │   ├── Footer.tsx / ContactSection.tsx
│   │   └── ...
│   ├── data/
│   │   ├── products.json            # Catálogo completo
│   │   ├── site.ts                  # Config + WhatsApp link
│   │   └── types.ts
│   └── store/
│       └── cart.ts                  # Zustand store + persist
├── .env.local                       # Variables de entorno (no commiteado)
├── .gitignore
└── package.json
```

---

## Variables de Entorno

Crea `.env.local` en la raíz:

```env
# Mercado Pago
MP_ACCESS_TOKEN=APP_USR-xxxxxxxxxxxx

# WhatsApp (para desarrollo local usa tu número real)
NEXT_PUBLIC_WHATSAPP_NUMBER=54911xxxxxxxxx

# Resend (emails de contacto)
RESEND_API_KEY=re_xxxxxxxxxxxx
EMAIL_FROM=onboarding@resend.dev
```

> **Nota:** En producción (Vercel), configura estas variables en *Project → Settings → Environment Variables* para todos los entornos.

---

## Catálogo de Productos

El catálogo se gestiona íntegramente en `src/data/products.json` sin tocar código:

- Categorías con icono, título, descripción y lista de productos
- Cada producto: `id`, `marca`, `nombre`, `especificaciones`, `imagen`, `precio`
- Las imágenes se sirven desde `public/images/products/` (formato PNG)

---

## Flujo de Compra

1. Usuario selecciona cantidad en la tarjeta del producto
2. Clic en **"Agregar al carrito"** → abre *CartDrawer* lateral
3. Revisa items, ajusta cantidades, clic **"Continuar a datos de envío"**
4. Completa formulario: Nombre, Teléfono, Método (Retiro / Envío)
5. Clic **"Pagar con Mercado Pago"** → `POST /api/checkout` → redirección a `init_point` de Mercado Pago

---

## Despliegue

Optimizado para **Vercel**:

1. Conecta el repositorio
2. Configura variables de entorno en *Settings → Environment Variables*
3. Deploy automático en cada push a `main`

---

## Licencia

Proyecto privado – Center Print's S.R.L.