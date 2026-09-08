import { NextResponse } from "next/server";
import { MercadoPagoConfig, Preference } from "mercadopago";

export async function POST(req: Request) {
  try {
    const accessToken = process.env.MP_ACCESS_TOKEN;

    if (!accessToken) {
      console.error("Falta el MP_ACCESS_TOKEN en las variables de entorno");
      return NextResponse.json(
        { error: "Credenciales de Mercado Pago no configuradas" },
        { status: 500 }
      );
    }

    const { items, customerDetails } = await req.json();

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: "El carrito está vacío" },
        { status: 400 }
      );
    }

    // Validar y asegurar precios: mínimo 1000 ARS
    const validatedItems = items.map((item: any) => {
      const price = Number(item.price);
      const validPrice = price > 0 ? price : 1000;
      return {
        ...item,
        price: validPrice,
      };
    });

    // Inicializar cliente de Mercado Pago
    const client = new MercadoPagoConfig({ accessToken });
    const preference = new Preference(client);

    // Mapear los productos al formato requerido por MP
    const mpItems = validatedItems.map((item: any) => ({
      id: String(item.id),
      title: item.name,
      quantity: Number(item.quantity),
      unit_price: Number(item.price),
      currency_id: "ARS",
    }));

    // Verificar que todos los unit_price sean > 0
    const invalidItems = mpItems.filter((item: { unit_price: number }) => item.unit_price <= 0);
    if (invalidItems.length > 0) {
      console.error("Productos con precio inválido:", invalidItems);
      return NextResponse.json(
        { error: "Algunos productos tienen precio inválido (0 o negativo)" },
        { status: 400 }
      );
    }

    // Crear la preferencia de pago
    const response = await preference.create({
      body: {
        items: mpItems,
        payer: {
          name: customerDetails?.nombre || "Cliente",
          phone: {
            number: customerDetails?.telefono || "",
          },
        },
        back_urls: {
          success: "https://centerprints-catalog.vercel.app/?status=success",
          failure: "https://centerprints-catalog.vercel.app/?status=failure",
          pending: "https://centerprints-catalog.vercel.app/?status=pending",
        },
        auto_return: "approved",
      },
    });

    return NextResponse.json({ init_point: response.init_point });
  } catch (error: any) {
    console.error("Error en Mercado Pago Checkout:", error);
    return NextResponse.json(
      { error: error?.message || "Error al procesar la orden" },
      { status: 500 }
    );
  }
}