import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const pedidoId = searchParams.get('pedido_id')
  const tipo = searchParams.get('tipo') // 'enviado' | 'entregado' | 'nuevo_pedido'

  if (!pedidoId || !tipo) {
    return NextResponse.json({ error: 'Faltan parámetros' }, { status: 400 })
  }

  const { data: pedido } = await supabaseAdmin
    .from('pedidos')
    .select('*, clientes(nombre, telefono)')
    .eq('id', pedidoId)
    .single()

  if (!pedido) {
    return NextResponse.json({ error: 'Pedido no encontrado' }, { status: 404 })
  }

  const nombre = pedido.clientes?.nombre ?? 'Cliente'
  const telefono = pedido.clientes?.telefono?.replace(/\D/g, '') ?? ''
  const orden = pedido.numero_orden
  const WA_ADMIN = process.env.NEXT_PUBLIC_WA_NUMBER ?? '573217657670'

  let msgCliente = ''
  let msgAdmin = ''

  if (tipo === 'enviado') {
    msgCliente = `¡Hola ${nombre}! 🚚 Tu pedido *${orden}* de Cápsulas Ganoderma Lucidum ha sido enviado. Pronto lo recibirás en tu dirección. ¡Gracias por confiar en GanodermaVida! 🍄`
    msgAdmin = `📦 Pedido *${orden}* marcado como ENVIADO. Cliente: ${nombre}`
  } else if (tipo === 'entregado') {
    msgCliente = `¡Hola ${nombre}! ✅ Tu pedido *${orden}* ha sido entregado. Esperamos que disfrutes tu Ganoderma Lucidum. ¡Nos encantaría conocer tu experiencia! 🍄`
    msgAdmin = `✅ Pedido *${orden}* marcado como ENTREGADO. Cliente: ${nombre}`
  } else if (tipo === 'nuevo_pedido') {
    msgAdmin = `🛒 *Nuevo pedido recibido*\nOrden: ${orden}\nCliente: ${nombre}\nTotal: $${pedido.total?.toLocaleString('es-CO')} COP`
  }

  const waCliente = telefono
    ? `https://wa.me/57${telefono}?text=${encodeURIComponent(msgCliente)}`
    : null

  const waAdmin = `https://wa.me/${WA_ADMIN}?text=${encodeURIComponent(msgAdmin)}`

  return NextResponse.json({ waCliente, waAdmin, pedido })
}