# Center Print's S.R.L. — Sitio Web Interactivo

Aplicación web corporativa para **Center Print's S.R.L. – Librería Comercial, Escolar e Insumos para Empresas**, construida con **Next.js (App Router) + TypeScript + Tailwind CSS + Lucide Icons**.

Incluye:

- Header con isotipo y logotipo original.
- Hero con imagen de fondo y overlay oscuro.
- Catálogo dinámico con carruseles deslizables por categoría, alimentado por `src/data/products.json`.
- Botón "Consultar por WhatsApp" por producto con mensaje precargado.
- Mapa interactivo de Google Maps (Av. Rivadavia 938, CABA).
- Formulario de contacto/presupuesto que envía un `POST` a `/api/contacto`, el cual dispara un email vía **Resend** (`src/app/api/contacto/route.ts`).

## Requisitos

- **Node.js 20+** (probado con Node 24) y npm.
- Una cuenta en [Resend](https://resend.com) con una **API key**.

## Puesta en marcha desde PowerShell

Abrí PowerShell en la carpeta del proyecto y ejecutá:

```powershell
npm install
npm run dev
```

Después abrí en el navegador: **http://localhost:3000**

## Configuración rápida

Todos los datos de contacto se centralizan en `src/data/site.ts`:

| Constante | Descripción |
| --- | --- |
| `whatsappNumero` | Numero de WhatsApp con código de país, ej. `"54911xxxxxxxx"`. Sin el `+`. |
| `heroImagen` | URL de la imagen de fondo del Hero. |

> **Importante:** reemplazá `whatsappNumero` por el número real para que los botones de WhatsApp funcionen.

### Catálogo y fotos de productos

- El catálogo se edita en `src/data/products.json` (agregar/quitar categorías y productos sin tocar código).
- Las imágenes se sirven desde `public/images/products/` y provienen de `capturas/` y `capturas/procesadas/` (fotos recortadas y capturas de los productos). Solo se muestran ítems con fotografía real; si un producto no tiene PNG en las capturas, se elimina del catálogo. `scripts/generate-product-images.cjs` queda disponible para futuros placeholders neutros.
- El logo va en `public/logo.png` y el favicon en `public/icono.png` (referenciados desde `src/components/Logo.tsx` y `src/app/layout.tsx`).
- Para regenerar solo los placeholders: `npm run generate:images`.

## Formulario de contacto — Resend

El formulario del frontend (`src/components/ContactSection.tsx`) hace un `POST` a `/api/contacto`. La API Route lee los datos, los valida y envía un email con **Resend** al destinatario configurado (por defecto `sbazan@fie.undef.edu.ar`).

### Variables de entorno

Creá un archivo `.env.local` en la raíz del proyecto:

```env
RESEND_API_KEY=re_xxxxxxxxxxxx
EMAIL_FROM=onboarding@resend.dev
```

| Variable | Descripción |
| --- | --- |
| `RESEND_API_KEY` | **Obligatoria.** API key generada en el dashboard de Resend (Settings → API Keys). |
| `EMAIL_FROM` | Remitente del email. En modo prueba usá `onboarding@resend.dev`. Con un dominio verificado usá algo como `consultas@tudominio.com.ar`. |

En **Vercel**: Project → Settings → Environment Variables, agregá ambas variables (para Production, Preview y Development).

> **Importante:** con `onboarding@resend.dev` los emails solo pueden llegar a la dirección con la que creaste la cuenta de Resend. Para enviar a otros destinatarios y que tenga pinta profesional tenés que verificar tu dominio en Resend y cambiar `EMAIL_FROM`.

### Probar el envío

Con el servidor de desarrollo activo, desde PowerShell:

```powershell
Invoke-RestMethod -Method POST -Uri "http://localhost:3000/api/contacto" -ContentType "application/json" -Body '{"nombre":"Juan Pérez","email":"juan@test.com","telefono":"11 1234 5678","producto":"Resma Ledesma Autor 80g A4","mensaje":"Hola, quisiera un presupuesto."}'
```

O directamente desde el formulario en http://localhost:3000.

## Scripts disponibles

| Comando | Descripción |
| --- | --- |
| `npm run dev` | Servidor de desarrollo (http://localhost:3000) |
| `npm run build` | Build de producción |
| `npm start` | Servir el build de producción |
| `npm run lint` | Linter ESLint |
| `npm run generate:images` | Regenerar imágenes placeholder del catálogo |

## Estructura del proyecto

```
centerprint/
├── public/images/products/                   # Fotos de productos (PNG y SVG)
├── scripts/generate-product-images.cjs       # Placeholder de imágenes
└── src/
    ├── app/                                  # Layout, página, estilos globales
    │   └── api/contacto/route.ts             # API Route: envía consultas por Resend
    ├── components/                           # Logo, Navbar, Hero, Catálogo,
    │                                         # Carrusel, Ficha, Mapa, Contacto, Footer
    └── data/                                 # products.json, site.ts, types.ts
```