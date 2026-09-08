"use client";

import { useEffect, useState } from "react";
import { Menu, MessageCircle, X } from "lucide-react";
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
    isOpen,
    openCart,
    closeCart,
    toggleCart,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
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
        navbarOpen || isOpen
          ? "border-b border-white/10 bg-navy-950/90 shadow-lg shadow-black/30 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <a href="#inicio" aria-label="Ir al inicio" className="transition-opacity hover:opacity-80">
          <Logo />
        </a>

        <div className="hidden items-center gap-1 md:flex">
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

      {navbarOpen && (
        <div className="border-t border-white/5 bg-navy-950/95 px-4 pb-5 pt-2 backdrop-blur-md md:hidden">
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