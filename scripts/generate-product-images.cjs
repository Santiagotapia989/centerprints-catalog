const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const data = JSON.parse(
  fs.readFileSync(path.join(root, "src", "data", "products.json"), "utf8")
);
const outDir = path.join(root, "public", "images", "products");
fs.mkdirSync(outDir, { recursive: true });

const palettes = {
  papeleria: ["#0ea5e9", "#1e3a8a"],
  escritura: ["#a78bfa", "#4c1d95"],
  agendas: ["#fbbf24", "#78350f"],
  archivo: ["#cbd5e1", "#334155"],
  higiene: ["#2dd4bf", "#134e4a"],
  escolar: ["#34d399", "#065f46"],
  oficina: ["#fb7185", "#881337"],
};

function escapeXml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function wrapLines(text, max = 34) {
  const words = String(text).split(/\s+/).filter(Boolean);
  const lines = [];
  let current = "";
  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length > max && current) {
      lines.push(current);
      current = word;
    } else {
      current = candidate;
    }
  }
  if (current) lines.push(current);
  return lines.slice(0, 3).map((l) => escapeXml(l));
}

let count = 0;

for (const categoria of data.categorias) {
  const [c1, c2] = palettes[categoria.id] || ["#0ea5e9", "#1e3a8a"];
  for (const producto of categoria.productos) {
    if (!producto.imagen.endsWith(".svg")) continue;
    const lines = wrapLines(producto.nombre);
    const nameSpans = lines
      .map(
        (line, i) =>
          `<tspan x="300" y="${340 + i * 40}" font-size="${lines.length > 1 ? 30 : 36}" font-weight="bold">${line}</tspan>`
      )
      .join("\n  ");
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#f7f4ec"/>
      <stop offset="100%" stop-color="#ffffff"/>
    </linearGradient>
    <linearGradient id="tint" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${c2}" stop-opacity="0.10"/>
      <stop offset="100%" stop-color="${c1}" stop-opacity="0.06"/>
    </linearGradient>
  </defs>
  <rect width="600" height="600" fill="url(#bg)"/>
  <rect width="600" height="600" fill="url(#tint)"/>
  <circle cx="300" cy="150" r="120" fill="${c2}" fill-opacity="0.05"/>
  <g transform="translate(224 96)">
    <rect x="0" y="0" width="152" height="108" rx="10" fill="${c2}" fill-opacity="0.08" stroke="${c2}" stroke-opacity="0.25" stroke-width="3"/>
    <circle cx="44" cy="36" r="12" fill="${c2}" fill-opacity="0.35"/>
    <path d="M 12 92 L 56 56 L 90 80 L 112 62 L 142 92 Z" fill="${c2}" fill-opacity="0.35"/>
  </g>
  <text x="300" y="300" font-family="Arial, Helvetica, sans-serif" font-size="20" font-weight="bold" letter-spacing="4" text-anchor="middle" fill="${c2}" fill-opacity="0.55">${escapeXml((producto.marca || "Producto").toUpperCase())}</text>
  <text font-family="Arial, Helvetica, sans-serif" text-anchor="middle" fill="#2b3448">
  ${nameSpans}
  </text>
  <text x="300" y="470" font-family="Arial, Helvetica, sans-serif" font-size="44" text-anchor="middle" fill="#2b3448" fill-opacity="0.16">${escapeXml(String(producto.marca).toUpperCase())}</text>
  <text x="300" y="530" font-family="Arial, Helvetica, sans-serif" font-size="18" text-anchor="middle" fill="#7c859a">Foto disponible</text>
</svg>
`;
    const outFile = path.join(outDir, path.basename(producto.imagen));
    if (fs.existsSync(outFile)) continue;
    fs.writeFileSync(outFile, svg, "utf8");
    count += 1;
  }
}

console.log(`Generadas ${count} imágenes placeholder en public/images/products/`);