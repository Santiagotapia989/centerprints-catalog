import { SITE } from "@/data/site";

const medidas = {
  md: {
    cont: "h-14 w-14 rounded-2xl",
    img: "h-14 w-14",
    nombre: "text-base",
    tagline: "text-[10px]",
  },
  lg: {
    cont: "h-28 w-28 rounded-3xl shadow-xl shadow-navy-950/30 ring-2 ring-white/40 sm:h-32 sm:w-32",
    img: "h-28 w-28 sm:h-32 sm:w-32",
    nombre: "text-xl sm:text-2xl",
    tagline: "text-[11px] sm:text-xs",
  },
};

const tema = {
  dark: { nombre: "text-white", tagline: "text-accent-300" },
  light: { nombre: "text-navy-950", tagline: "text-accent-600" },
};

export default function Logo({
  compact = false,
  size = "md",
  theme = "dark",
}: {
  compact?: boolean;
  size?: keyof typeof medidas;
  theme?: keyof typeof tema;
}) {
  const m = medidas[size];
  const t = tema[theme];
  return (
    <span className="flex items-center gap-3">
      <span
        className={`grid shrink-0 place-items-center overflow-hidden bg-white ring-white/20 ${m.cont}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo.png"
          alt={`Logo ${SITE.nombre}`}
          className={`object-contain ${m.img}`}
        />
      </span>
      <span className="leading-tight">
        <span className={`block font-bold ${t.nombre} ${m.nombre}`}>
          {SITE.nombre}
        </span>
        <span
          className={`block font-semibold uppercase tracking-[0.18em] ${
            t.tagline
          } ${compact ? "text-[9px]" : m.tagline}`}
        >
          {SITE.tagline}
        </span>
      </span>
    </span>
  );
}