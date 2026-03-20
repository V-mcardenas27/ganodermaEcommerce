export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET() {
  const hoy = new Date()
  hoy.setHours(0, 0, 0, 0)

  const inicioMes = new Date(hoy.getFullYear(), hoy.getMonth(), 1)

  // Ventas de hoy
  const { data: ventasHoy } = await supabaseAdmin
    .from('pedidos')
    .select('total')
    .eq('estado', 'pagado')
    .gte('created_at', hoy.toISOString())

  // Ventas del mes
  const { data: ventasMes } = await supabaseAdmin
    .from('pedidos')
    .select('total')
    .eq('estado', 'pagado')
    .gte('created_at', inicioMes.toISOString())

  // Pedidos nuevos (pendientes)
  const { count: pedidosNuevos } = await supabaseAdmin
    .from('pedidos')
    .select('*', { count: 'exact', head: true })
    .eq('estado', 'pendiente')

  // Total clientes
  const { count: totalClientes } = await supabaseAdmin
    .from('clientes')
    .select('*', { count: 'exact', head: true })

  // Pedidos últimos 30 días para gráfico
  const hace30 = new Date()
  hace30.setDate(hace30.getDate() - 30)

  const { data: pedidosRecientes } = await supabaseAdmin
    .from('pedidos')
    .select('created_at, total, estado')
    .gte('created_at', hace30.toISOString())
    .eq('estado', 'pagado')
    .order('created_at', { ascending: true })

  const totalHoy = ventasHoy?.reduce((s, p) => s + p.total, 0) ?? 0
  const totalMes = ventasMes?.reduce((s, p) => s + p.total, 0) ?? 0

  return NextResponse.json({
    totalHoy,
    totalMes,
    pedidosNuevos: pedidosNuevos ?? 0,
    totalClientes: totalClientes ?? 0,
    pedidosRecientes: pedidosRecientes ?? [],
  })
}