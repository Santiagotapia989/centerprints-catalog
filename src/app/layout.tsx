import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Center Print's S.R.L. | Proveedor de Empresa",
    template: "%s | Center Print's S.R.L.",
  },
  description:
    "Papelería, resmas, escritura, agendas, archivo, higiene y herramientas de oficina de primeras marcas. Av. Rivadavia 938, CABA.",
  keywords: [
    "Center Prints",
    "papeleria",
    "resmas",
    "agendas",
    "higiene",
    "proveedor de empresa",
    "oficina",
    "CABA",
    "mayorista",
  ],
  authors: [{ name: "Center Print's S.R.L." }],
  icons: {
    icon: "/icono.png",
    apple: "/icono.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-paper-50 font-sans text-mist-100">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}