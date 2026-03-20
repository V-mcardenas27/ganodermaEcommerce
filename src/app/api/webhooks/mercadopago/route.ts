export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { MercadoPagoConfig, Payment } from 'mercadopago'
import { supabaseAdmin } from '@/lib/supabase'
import { resend, FROM_EMAIL } from '@/lib/resend'
import { emailConfirmacionCliente, emailNuevoPedidoAdmin } from '@/lib/emails'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    if (body.type !== 'payment') {
      return NextResponse.json({ ok: true })
    }

    const paymentId = body.data?.id
    if (!paymentId) {
      return NextResponse.json({ ok: true })
    }

    const client = new MercadoPagoConfig({
      accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
    })
    const paymentClient = new Payment(client)
    const pago = await paymentClient.get({ id: paymentId })

    const numeroOrden = pago.external_reference
    const estadoPago = pago.status

    if (!numeroOrden) {
      return NextResponse.json({ ok: true })
    }

    const { data: pedido } = await supabaseAdmin
      .from('pedidos')
      .select('id, estado')
      .eq('numero_orden', numeroOrden)
      .single()

    if (!pedido) {
      console.error('[Webhook MP] Pedido no encontrado:', numeroOrden)
      return NextResponse.json({ ok: true })
    }

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

      console.log(`[NUEVO PEDIDO] Orden: ${numeroOrden} | Monto: $${pago.transaction_amount} COP`)

      // ── Emails automáticos ──────────────────────────────
      const { data: pedidoCompleto } = await supabaseAdmin
        .from('pedidos')
        .select('*, clientes(*)')
        .eq('id', pedido.id)
        .single()

      if (pedidoCompleto?.clientes?.email) {
        const cliente = pedidoCompleto.clientes

        // Email al cliente
        const templateCliente = emailConfirmacionCliente({
          nombre: cliente.nombre,
          orden: pedidoCompleto.numero_orden,
          total: pedidoCompleto.total,
          producto: pedidoCompleto.producto,
          cantidad: pedidoCompleto.cantidad,
          direccion: cliente.direccion ?? '',
          ciudad: cliente.ciudad ?? '',
        })

        await resend.emails.send({
          from: FROM_EMAIL,
          to: cliente.email,
          subject: templateCliente.subject,
          html: templateCliente.html,
        })

        // Email al admin
        const adminEmail = process.env.ADMIN_EMAIL
        if (adminEmail) {
          const templateAdmin = emailNuevoPedidoAdmin({
            orden: pedidoCompleto.numero_orden,
            nombreCliente: cliente.nombre,
            email: cliente.email,
            telefono: cliente.telefono ?? '—',
            total: pedidoCompleto.total,
            ciudad: cliente.ciudad ?? '—',
            direccion: cliente.direccion ?? '—',
            appUrl: process.env.NEXT_PUBLIC_APP_URL!,
          })

          await resend.emails.send({
            from: FROM_EMAIL,
            to: adminEmail,
            subject: templateAdmin.subject,
            html: templateAdmin.html,
          })
        }
      }
      // ────────────────────────────────────────────────────

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
    return NextResponse.json({ ok: true })
  }
}