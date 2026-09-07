# Center Print's S.R.L. — Sitio Web Interactivo

Aplicación web corporativa para **Center Print's S.R.L. – Librería Comercial, Escolar e Insumos para Empresas**, construida con **Next.js (App Router) + TypeScript + Tailwind CSS + Lucide Icons**.

Incluye:

- Header con isotipo y logotipo original.
- Hero con imagen de fondo y overlay oscuro.
- Catálogo dinámico con carruseles deslizables por categoría, alimentado por `src/data/products.json`.
- Botón "Consultar por WhatsApp" por producto con mensaje precargado.
- Mapa interactivo de Google Maps (Av. Rivadavia 938, CABA).
- Formulario de contacto/presupuesto que envía un `POST` al webhook de n8n.
- Flujo de n8n exportado (`n8n/workflows/centerprint-webhook.json`) para recibir consultas, notificar por email y registrarlas en PostgreSQL.

## Requisitos

- **Node.js 20+** (probado con Node 24) y npm.
- Para el formulario: **n8n** corriendo en local. *(El sitio funciona igual sin n8n; solo verás el aviso de error en el formulario.)*

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
| `webhookUrl` | URL del webhook de n8n (`http://localhost:5678/webhook/contacto`). |
| `heroImagen` | URL de la imagen de fondo del Hero. |

> **Importante:** reemplazá `whatsappNumero` por el número real para que los botones de WhatsApp funcionen.

### Catálogo y fotos de productos

- El catálogo se edita en `src/data/products.json` (agregar/quitar categorías y productos sin tocar código).
- Las imágenes se sirven desde `public/images/products/` y provienen de `capturas/` y `capturas/procesadas/` (fotos recortadas y capturas de los productos). Solo se muestran ítems con fotografía real; si un producto no tiene PNG en las capturas, se elimina del catálogo. `scripts/generate-product-images.cjs` queda disponible para futuros placeholders neutros.
- El logo va en `public/logo.png` y el favicon en `public/icono.png` (referenciados desde `src/components/Logo.tsx` y `src/app/layout.tsx`).
- Para regenerar solo los placeholders: `npm run generate:images`.

## Integración con n8n

### Paso 1 — Levantar n8n en local

```powershell
npx n8n start
```

Esto inicia la interfaz de n8n en **http://localhost:5678**.

### Paso 2 — Importar el flujo

1. En n8n, andá a **Workflows** → botón de tres puntos → **Import from File**.
2. Seleccioná `n8n/workflows/centerprint-webhook.json`.
3. Configurá las credenciales que pide el flujo:
   - **Notificar por Email** → credencial **SMTP** (servidor, usuario y contraseña de correo).
   - **Registrar en PostgreSQL** → credencial **Postgres** con los datos de tu base.
4. Activá el flujo desde el toggle **Active** (por defecto viene desactivado para que no reciba solicitudes antes de tiempo).

El flujo:

1. **Webhook Contacto** recibe el `POST` en `http://localhost:5678/webhook/contacto`.
2. **Formatear datos del cliente** ordena nombre, empresa, email, producto de interés, etc.
3. **Notificar por Email** envía un correo con los datos formateados.
4. **Registrar en PostgreSQL** inserta la consulta en la tabla `contactos`.

### Base de datos (opcional pero recomendada)

Ejecutá la siguiente tabla en tu PostgreSQL:

```sql
CREATE TABLE IF NOT EXISTS contactos (
  id SERIAL PRIMARY KEY,
  nombre TEXT,
  empresa TEXT,
  email TEXT,
  telefono TEXT,
  producto TEXT,
  tipo TEXT,
  mensaje TEXT,
  origen TEXT,
  fecha TIMESTAMPTZ
);
```

> Si no querés usar PostgreSQL, eliminá el nodo **Registrar en PostgreSQL** del flujo en la interfaz de n8n y usá solo el email.

### Probar el webhook

Con n8n activo, desde PowerShell:

```powershell
Invoke-RestMethod -Method POST -Uri "http://localhost:5678/webhook/contacto" -ContentType "application/json" -Body '{"nombre":"Test","email":"test@test.com","producto":"Resma A4"}'
```

O desde el formulario del sitio en http://localhost:3000.

> **Nota sobre CORS:** si el navegador bloquea el envío desde localhost:3000, podés ejecutar n8n con la variable `N8N_DEFAULT_BINARY_DATA_MODE` o bien agregar el header CORS permitido en el nodo Webhook. En la práctica, para desarrollo normal con navegador en el mismo equipo suele funcionar sin cambios.

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
├── n8n/workflows/centerprint-webhook.json   # Flujo exportado de n8n
├── public/images/products/                   # Fotos de productos (PNG y SVG)
├── scripts/generate-product-images.cjs       # Placeholder de imágenes
└── src/
    ├── app/                                  # Layout, página y estilos globales
    ├── components/                           # Logo, Navbar, Hero, Catálogo,
    │                                         # Carrusel, Ficha, Mapa, Contacto, Footer
    └── data/                                 # products.json, site.ts, types.ts
```