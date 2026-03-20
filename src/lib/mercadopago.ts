import { MercadoPagoConfig, Preference } from 'mercadopago'

export function getMercadoPagoClient() {
  return new MercadoPagoConfig({
    accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
  })
}

export async function crearPreferencia({
  numeroOrden,
  cantidad,
  precioUnitario,
  nombreCliente,
  email,
}: {
  numeroOrden: string
  cantidad: number
  precioUnitario: number
  nombreCliente: string
  email: string
}) {
  const client = getMercadoPagoClient()
  const preference = new Preference(client)
  const appUrl = process.env.NEXT_PUBLIC_APP_URL!

  const response = await preference.create({
    body: {
      external_reference: numeroOrden,
      items: [
        {
          id: 'capsulas-ganoderma-420mg',
          title: 'Cápsulas Ganoderma Lucidum · 60 caps · 420mg',
          quantity: cantidad,
          unit_price: precioUnitario,
          currency_id: 'COP',
        },
      ],
      payer: {
        name: nombreCliente,
        email,
      },
      back_urls: {
        success: `${appUrl}/confirmacion`,
        failure: `${appUrl}/cancelacion`,
        pending: `${appUrl}/confirmacion`,
      },
      auto_return: 'approved', // descomentar en producción
      notification_url: `${appUrl}/api/webhooks/mercadopago`,
      statement_descriptor: 'GANAVITA',
    },
  })

  return response
}