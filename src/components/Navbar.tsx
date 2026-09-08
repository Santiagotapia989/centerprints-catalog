"use client";

import { useEffect, useState } from "react";
import { Menu, MessageCircle, X, ShoppingBag } from "lucide-react";
import Logo from "./Logo";
import { useCartStore } from "@/store/cart";
import { SITE, whatsappLink } from "@/data/site";

const links = [
  { href: "#inicio", label: "Inicio" },
  { href: "#catalogo", label: "Catálogo" },
  { href: "#donde-encontrarnos", label: "Dónde Encontrarnos" },
  { href: "#contacto", label: "Contacto" },
];

export default function Navbar() {
  const {
    items,
    isOpen: cartIsOpen,
    openCart,
    closeCart,
    toggleCart,
  } = useCartStore();

  const [navbarOpen, setNavbarOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setNavbarOpen(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 w-full transition-all duration-300 ${
        navbarOpen || cartIsOpen
          ? "border-b border-white/10 bg-navy-950/90 shadow-lg shadow-black/30 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-3 sm:px-4 lg:px-6">
        {/* Logo - always visible */}
        <a href="#inicio" aria-label="Ir al inicio" className="transition-opacity hover:opacity-80 flex-shrink-0">
          <Logo />
        </a>

        {/* Mobile: Cart button + Hamburger menu */}
        <div className="flex items-center gap-2 md:hidden">
          {/* Cart button - mobile only */}
          <button
            onClick={openCart}
            className="relative p-2 rounded-lg bg-zinc-800 text-white transition-colors hover:bg-zinc-700"
            aria-label="Abrir carrito"
          >
            <ShoppingBag className="h-5 w-5" />
            {items.length > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 min-w-5 rounded-full bg-emerald-500 text-[10px] font-bold flex items-center justify-center text-white">
                {items.length > 9 ? "9+" : items.length}
              </span>
            )}
          </button>

          {/* Hamburger menu */}
          <button
            onClick={() => setNavbarOpen(!navbarOpen)}
            className="p-2 rounded-lg bg-navy-950/80 text-white transition-colors hover:bg-navy-900"
            aria-label={navbarOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={navbarOpen}
          >
            {navbarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Desktop: Navigation links */}
        <div className="hidden items-center gap-1 md:flex flex-1 justify-end gap-2">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop: WhatsApp button */}
        <div className="hidden md:block">
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-950/40 transition-all hover:bg-emerald-400"
          >
            <MessageCircle className="h-4 w-4" />
            Consultar
          </a>
        </div>

        {/* Desktop: Cart button with label */}
        <button
          onClick={openCart}
          className="relative hidden md:block inline-flex items-center gap-2 rounded-lg bg-zinc-800 px-3 py-2 text-sm font-medium text-white shadow-sm shadow-zinc-900/40 transition-all hover:bg-zinc-700"
        >
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M7 8l4 4 4-4M7 4l4 4 4-4" />
          </svg>
          Carrito
        </button>
      </nav>

      {/* Mobile dropdown menu */}
      {navbarOpen && (
        <div className="border-t border-white/5 bg-navy-950/95 px-4 pb-5 pt-3 backdrop-blur-md md:hidden">
          <div className="flex flex-col gap-1">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setNavbarOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
              >
                {link.label}
              </a>
            ))}
            <div className="border-t border-white/10 my-2" />
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setNavbarOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-400"
            >
              <MessageCircle className="h-4 w-4" />
              Consultar por WhatsApp ({SITE.telefono1})
            </a>
          </div>
        </div>
      )}
    </header>
  );
}