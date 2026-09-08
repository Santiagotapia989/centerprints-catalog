"use client";

import React, { useState } from "react";
import { useCartStore } from "@/store/cart";
import { X, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";

export const CartDrawer = () => {
  const { items, isOpen, closeCart, updateQuantity, removeItem, clearCart } =
    useCartStore();
  const [view, setView] = useState<"cart" | "checkout">("cart");
  const [isPaying, setIsPaying] = useState(false);

  // Formulario
  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    metodoEntrega: "retiro",
    direccion: "",
    localidad: "",
  });

  if (!isOpen) return null;

  const subtotal = items.reduce(
    (acc, item) => acc + (item.price || item.precio || 0) * item.quantity,
    0
  );

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPaying(true);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items, customerDetails: formData }),
      });

      const data = await res.json();
      if (data.init_point) {
        window.location.href = data.init_point;
      } else {
        alert("Error al generar el pago con Mercado Pago");
        setIsPaying(false);
      }
    } catch (err) {
      console.error(err);
      alert("Ocurrió un error en la conexión");
      setIsPaying(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white text-zinc-900 shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 border-b border-zinc-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-zinc-800"/>
              <h2 className="text-xl font-bold text-zinc-900">
                {view === "cart" ? "Tu Carrito" : "Datos de Envío"}
              </h2>
            </div>
            <button
              onClick={closeCart}
              className="p-2 rounded-full hover:bg-zinc-100 text-zinc-800 transition-colors"
            >
              <X className="w-6 h-6"/>
            </button>
          </div>

          {/* Body */}
          <div className="p-6 flex-1 overflow-y-auto">
            {view === "cart" ? (
              items.length === 0 ? (
                <div className="text-center py-12 text-zinc-500">
                  El carrito está vacío
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 p-3 border border-zinc-200 rounded-lg bg-zinc-50"
                    >
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-14 h-14 object-cover rounded bg-white"
                        />
                      )}
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm text-zinc-900">
                          {item.name}
                        </h4>
                        <p className="text-xs text-zinc-500">
                          ${(item.price || item.precio || 0).toLocaleString("es-AR")} c/u
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="p-1 border rounded bg-white hover:bg-zinc-100 text-zinc-800"
                          >
                            <Minus className="w-3 h-3"/>
                          </button>
                          <span className="text-xs font-bold w-6 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="p-1 border rounded bg-white hover:bg-zinc-100 text-zinc-800"
                          >
                            <Plus className="w-3 h-3"/>
                          </button>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-sm text-zinc-900">
                          ${((item.price || item.precio || 0) * item.quantity).toLocaleString("es-AR")}
                        </p>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700 mt-2 p-1"
                        >
                          <Trash2 className="w-4 h-4"/>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )
            ) : (
              <form id="checkout-form" onSubmit={handleCheckout} className="space-y-4 text-left">
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1">
                    Nombre / Empresa
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.nombre}
                    onChange={(e) =>
                      setFormData({ ...formData, nombre: e.target.value })
                    }
                    className="w-full p-2 border border-zinc-300 rounded text-sm bg-white text-zinc-900"
                    placeholder="Ej: Juan Pérez"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1">
                    Teléfono / WhatsApp
                  </label>
                  <input
                    required
                    type="tel"
                    value={formData.telefono}
                    onChange={(e) =>
                      setFormData({ ...formData, telefono: e.target.value })
                    }
                    className="w-full p-2 border border-zinc-300 rounded text-sm bg-white text-zinc-900"
                    placeholder="Ej: 1122334455"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1">
                    Método de Entrega
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, metodoEntrega: "retiro" })
                      }
                      className={`p-2 border text-xs rounded text-center font-medium ${
                        formData.metodoEntrega === "retiro"
                          ? "border-zinc-900 bg-zinc-900 text-white"
                          : "border-zinc-200 bg-white text-zinc-700"
                      }`}
                    >
                      Retiro en nuestro local en pleno centro
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, metodoEntrega: "envio" })
                      }
                      className={`p-2 border text-xs rounded text-center font-medium ${
                        formData.metodoEntrega === "envio"
                          ? "border-zinc-900 bg-zinc-900 text-white"
                          : "border-zinc-200 bg-white text-zinc-700"
                      }`}
                    >
                      Envío a domicilio
                    </button>
                  </div>
                </div>

                {formData.metodoEntrega === "envio" && (
                  <>
                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 mb-1">
                        Dirección de entrega
                      </label>
                      <input
                        required
                        type="text"
                        value={formData.direccion}
                        onChange={(e) =>
                          setFormData({ ...formData, direccion: e.target.value })
                        }
                        className="w-full p-2 border border-zinc-300 rounded text-sm bg-white text-zinc-900"
                        placeholder="Calle, Número, Piso"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 mb-1">
                        Localidad / CABA
                      </label>
                      <input
                        required
                        type="text"
                        value={formData.localidad}
                        onChange={(e) =>
                          setFormData({ ...formData, localidad: e.target.value })
                        }
                        className="w-full p-2 border border-zinc-300 rounded text-sm bg-white text-zinc-900"
                      />
                    </div>
                  </>
                )}
              </form>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="p-6 border-t border-zinc-200 bg-zinc-50">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-semibold text-zinc-600">Total:</span>
                <span className="text-xl font-bold text-zinc-900">
                  ${subtotal.toLocaleString("es-AR")}
                </span>
              </div>

              {view === "cart" ? (
                <button
                  onClick={() => setView("checkout")}
                  className="w-full bg-zinc-900 hover:bg-zinc-800 text-white py-3 rounded-lg font-bold text-sm transition-colors"
                >
                  Continuar a datos de envío
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setView("cart")}
                    className="w-1/3 border border-zinc-300 hover:bg-zinc-100 text-zinc-700 py-3 rounded-lg font-semibold text-sm transition-colors"
                  >
                    Volver
                  </button>
                  <button
                    form="checkout-form"
                    type="submit"
                    disabled={isPaying}
                    className="w-2/3 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold text-sm transition-colors disabled:opacity-50"
                  >
                    {isPaying ? "Procesando..." : "Pagar con Mercado Pago"}
                  </button>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};