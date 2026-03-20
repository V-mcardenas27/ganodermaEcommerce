import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const orden = searchParams.get('orden')
  const email = searchParams.get('email')

  if (!orden && !email) {
    return NextResponse.json({ error: 'Ingresa un número de orden o correo' }, { status: 400 })
  }

  let query = supabaseAdmin
    .from('pedidos')
    .select(`
      *,
      clientes ( nombre, email ),
      estados_pedido ( estado, nota, created_at )
    `)
    .order('created_at', { ascending: false, referencedTable: 'estados_pedido' })

  if (orden) query = query.ilike('numero_orden', `%${orden}%`)
  else if (email) {
    const { data: cliente } = await supabaseAdmin
      .from('clientes')
      .select('id')
      .eq('email', email)
      .single()

    if (!cliente) return NextResponse.json({ data: [] })
    query = query.eq('cliente_id', cliente.id)
  }

  const { data, error } = await query.limit(5)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ data })
}