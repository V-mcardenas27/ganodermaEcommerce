import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

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
    query = query.ilike('numero_orden', `%${buscar}%`)
  }

  const { data, error } = await query

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ data })
}

export async function PATCH(req: NextRequest) {
  const { id, estado, nota } = await req.json()

  if (!id || !estado) {
    return NextResponse.json(
      { error: 'ID y estado son requeridos' },
      { status: 400 }
    )
  }

  const { error: errorUpdate } = await supabaseAdmin
    .from('pedidos')
    .update({ estado })
    .eq('id', id)

  if (errorUpdate) {
    return NextResponse.json({ error: errorUpdate.message }, { status: 500 })
  }

  const { error: errorHistorial } = await supabaseAdmin
    .from('estados_pedido')
    .insert({
      pedido_id: id,
      estado,
      nota: nota ?? `Estado actualizado a: ${estado}`,
    })

  if (errorHistorial) {
    console.error('[PATCH pedidos] Error historial:', errorHistorial.message)
  }

  return NextResponse.json({ ok: true })
}