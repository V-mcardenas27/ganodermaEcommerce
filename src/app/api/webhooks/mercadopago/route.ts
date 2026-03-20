export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { MercadoPagoConfig, Payment } from 'mercadopago'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // MercadoPago envía diferentes tipos de notificaciones
    if (body.type !== 'payment') {
      return NextResponse.json({ ok: true })
    }

    const paymentId = body.data?.id
    if (!paymentId) {
      return NextResponse.json({ ok: true })
    }

    // Consultar el pago en MercadoPago para verificarlo
    const client = new MercadoPagoConfig({
      accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
    })
    const paymentClient = new Payment(client)
    const pago = await paymentClient.get({ id: paymentId })

    const numeroOrden = pago.external_reference
    const estadoPago = pago.status // approved, rejected, pending

    if (!numeroOrden) {
      return NextResponse.json({ ok: true })
    }

    // Buscar el pedido por número de orden
    const { data: pedido } = await supabaseAdmin
      .from('pedidos')
      .select('id, estado')
      .eq('numero_orden', numeroOrden)
      .single()

    if (!pedido) {
      console.error('[Webhook MP] Pedido no encontrado:', numeroOrden)
      return NextResponse.json({ ok: true })
    }

    // Registrar la transacción
    await supabaseAdmin
      .from('transacciones')
      .insert({
        pedido_id: pedido.id,
        pasarela: 'mercadopago',
        pasarela_payment_id: String(paymentId),
        pasarela_status: estadoPago,
        monto: pago.transaction_amount ?? 0,
        moneda: 'COP',
        raw_data: pago as unknown as Record<string, unknown>,
      })

    // Actualizar estado del pedido según respuesta de MP
    if (estadoPago === 'approved') {
      await supabaseAdmin
        .from('pedidos')
        .update({ estado: 'pagado', metodo_pago: 'mercadopago' })
        .eq('id', pedido.id)

      await supabaseAdmin
        .from('estados_pedido')
        .insert({
          pedido_id: pedido.id,
          estado: 'pagado',
          nota: `Pago aprobado por MercadoPago. ID: ${paymentId}`,
        })

    } else if (estadoPago === 'rejected') {
      await supabaseAdmin
        .from('pedidos')
        .update({ estado: 'cancelado' })
        .eq('id', pedido.id)

      await supabaseAdmin
        .from('estados_pedido')
        .insert({
          pedido_id: pedido.id,
          estado: 'cancelado',
          nota: `Pago rechazado por MercadoPago. ID: ${paymentId}`,
        })
    }

    return NextResponse.json({ ok: true })

  } catch (err) {
    console.error('[Webhook MP]', err)
    // Siempre retornar 200 a MercadoPago para evitar reintentos
    return NextResponse.json({ ok: true })
  }
}