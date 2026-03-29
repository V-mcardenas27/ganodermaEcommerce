export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { resend, FROM_EMAIL } from '@/lib/resend'
import { emailEstadoActualizado } from '@/lib/emails'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const estado = searchParams.get('estado')
  const buscar = searchParams.get('buscar')
  const limite = parseInt(searchParams.get('limite') ?? '50')

  let query = supabaseAdmin
    .from('pedidos')
    .select(`
      *,
      clientes (
        id, nombre, email, telefono, ciudad, direccion
      )
    `)
    .order('created_at', { ascending: false })
    .limit(limite)

  if (estado && estado !== 'todos') {
    query = query.eq('estado', estado)
  }

  if (buscar) {
    query = query.or(`numero_orden.ilike.%${buscar}%`)
  }

  const { data, error } = await query

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ data })
}

export async function PATCH(req: NextRequest) {
  const { id, estado, nota } = await req.json()

  const { error } = await supabaseAdmin
    .from('pedidos')
    .update({ estado })
    .eq('id', id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  await supabaseAdmin
    .from('estados_pedido')
    .insert({ pedido_id: id, estado, nota: nota ?? `Estado actualizado a: ${estado}` })

    // Email automático al cambiar estado a enviado o entregado
    if (estado === 'confirmado' || estado === 'enviado' || estado === 'entregado') {
      const { data: pedidoCompleto } = await supabaseAdmin
        .from('pedidos')
        .select('*, clientes(*)')
        .eq('id', id)
        .single()

      if (pedidoCompleto?.clientes?.email) {
        const template = emailEstadoActualizado({
          nombre: pedidoCompleto.clientes.nombre,
          orden: pedidoCompleto.numero_orden,
          estado,
        })

        await resend.emails.send({
          from: FROM_EMAIL,
          to: pedidoCompleto.clientes.email,
          subject: template.subject,
          html: template.html,
        })
      }
    }

      return NextResponse.json({ ok: true })
    }