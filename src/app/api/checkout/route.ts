export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { checkoutSchema } from '@/lib/validations'
import { resend, FROM_EMAIL } from '@/lib/resend'
import { emailConfirmacionCliente, emailNuevoPedidoAdmin } from '@/lib/emails'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = checkoutSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: 'Datos inválidos' },
        { status: 400 }
      )
    }

    const { nombre, email, telefono, ciudad, direccion, cantidad } = parsed.data
    const precioUnitario = 59800
    const total = precioUnitario * cantidad

    // Crear o actualizar cliente
    let clienteId: string
    const { data: clienteExistente } = await supabaseAdmin
      .from('clientes')
      .select('id')
      .eq('email', email)
      .single()

    if (clienteExistente) {
      clienteId = clienteExistente.id
      await supabaseAdmin
        .from('clientes')
        .update({ nombre, telefono, ciudad, direccion })
        .eq('id', clienteId)
    } else {
      const { data: nuevoCliente, error: errorCliente } = await supabaseAdmin
        .from('clientes')
        .insert({ nombre, email, telefono, ciudad, direccion })
        .select('id')
        .single()

      if (errorCliente || !nuevoCliente) throw new Error('Error al registrar el cliente')
      clienteId = nuevoCliente.id
    }

    // Crear pedido con estado pendiente (contra entrega)
    const { data: pedido, error: errorPedido } = await supabaseAdmin
      .from('pedidos')
      .insert({
        cliente_id: clienteId,
        producto: 'Cápsulas Ganoderma Lucidum',
        cantidad,
        precio_unitario: precioUnitario,
        total,
        estado: 'pendiente',
        canal: 'web',
        metodo_pago: 'efectivo',
      })
      .select('id, numero_orden')
      .single()

    if (errorPedido || !pedido) throw new Error('Error al crear el pedido')

    // Historial
    await supabaseAdmin
      .from('estados_pedido')
      .insert({
        pedido_id: pedido.id,
        estado: 'pendiente',
        nota: 'Pedido recibido — pago contra entrega',
      })

    // Email al cliente
    const templateCliente = emailConfirmacionCliente({
      nombre,
      orden: pedido.numero_orden,
      total,
      producto: 'Cápsulas Ganoderma Lucidum',
      cantidad,
      direccion,
      ciudad,
    })

    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: templateCliente.subject,
      html: templateCliente.html,
    })

    // Email al admin
    const adminEmail = process.env.ADMIN_EMAIL
    if (adminEmail) {
      const templateAdmin = emailNuevoPedidoAdmin({
        orden: pedido.numero_orden,
        nombreCliente: nombre,
        email,
        telefono,
        total,
        ciudad,
        direccion,
        appUrl: process.env.NEXT_PUBLIC_APP_URL!,
      })

      await resend.emails.send({
        from: FROM_EMAIL,
        to: adminEmail,
        subject: templateAdmin.subject,
        html: templateAdmin.html,
      })
    }

    return NextResponse.json({
      success: true,
      numero_orden: pedido.numero_orden,
    })

  } catch (err: unknown) {
    console.error('[API /checkout]', err)
    const mensaje = err instanceof Error ? err.message : 'Error interno'
    return NextResponse.json({ success: false, error: mensaje }, { status: 500 })
  }
}