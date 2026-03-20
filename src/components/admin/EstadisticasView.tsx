'use client'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { formatPrecio, labelEstado } from '@/lib/utils'
import type { Pedido } from '@/types'

const COLORES = ['#c8860a', '#4a7c4a', '#1a2e1a', '#c8d8b8', '#e6a91f', '#8aab6e']

interface Props {
  stats: {
    totalHoy: number
    totalMes: number
    pedidosNuevos: number
    totalClientes: number
    pedidosRecientes: { created_at: string; total: number }[]
  }
  pedidos: Pedido[]
}

export function EstadisticasView({ stats, pedidos }: Props) {
  // Gráfico de ventas por día
  const porDia = stats.pedidosRecientes.reduce((acc, p) => {
    const dia = format(new Date(p.created_at), 'dd MMM', { locale: es })
    acc[dia] = (acc[dia] ?? 0) + p.total
    return acc
  }, {} as Record<string, number>)

  const chartVentas = Object.entries(porDia).map(([dia, total]) => ({ dia, total }))

  // Gráfico de pedidos por estado
  const porEstado = pedidos.reduce((acc, p) => {
    acc[p.estado] = (acc[p.estado] ?? 0) + 1
    return acc
  }, {} as Record<string, number>)

  const chartEstados = Object.entries(porEstado).map(([estado, cantidad]) => ({
    name: labelEstado(estado),
    value: cantidad,
  }))

  // Canal web vs whatsapp
  const porCanal = pedidos.reduce((acc, p) => {
    acc[p.canal] = (acc[p.canal] ?? 0) + 1
    return acc
  }, {} as Record<string, number>)

  const chartCanal = Object.entries(porCanal).map(([canal, cantidad]) => ({
    name: canal === 'web' ? 'Web' : 'WhatsApp',
    value: cantidad,
  }))

  return (
    <div className="space-y-8">
      {/* Resumen */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Ingresos hoy',   valor: formatPrecio(stats.totalHoy)  },
          { label: 'Ingresos mes',   valor: formatPrecio(stats.totalMes)  },
          { label: 'Total pedidos',  valor: pedidos.length                },
          { label: 'Total clientes', valor: stats.totalClientes           },
        ].map(({ label, valor }) => (
          <div key={label} className="bg-white p-5 shadow-sm">
            <p className="font-sans text-[0.7rem] uppercase tracking-wider text-gray-400 mb-1">{label}</p>
            <p className="font-serif text-2xl text-gray-800">{valor}</p>
          </div>
        ))}
      </div>

      {/* Ventas por día */}
      <div className="bg-white p-6 shadow-sm">
        <h2 className="font-sans text-sm font-medium text-gray-600 uppercase tracking-wider mb-6">
          Ingresos últimos 30 días
        </h2>
        {chartVentas.length > 0 ? (
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={chartVentas}>
              <XAxis dataKey="dia" tick={{ fontSize: 11, fontFamily: 'Jost' }} />
              <YAxis tick={{ fontSize: 11, fontFamily: 'Jost' }} tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
              <Tooltip
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                formatter={(v: any) => [formatPrecio(Number(v ?? 0)), 'Ingresos']}
                labelStyle={{ fontFamily: 'Jost', fontSize: 12 }}
              />
              <Bar dataKey="total" fill="#c8860a" radius={[2,2,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-center font-sans text-sm text-gray-400 py-16">Sin datos aún</p>
        )}
      </div>

      {/* Dos gráficos de dona */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 shadow-sm">
          <h2 className="font-sans text-sm font-medium text-gray-600 uppercase tracking-wider mb-6">
            Pedidos por estado
          </h2>
          {chartEstados.length > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={chartEstados} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                  {chartEstados.map((_, i) => (
                    <Cell key={i} fill={COLORES[i % COLORES.length]} />
                  ))}
                </Pie>
                <Legend wrapperStyle={{ fontFamily: 'Jost', fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-center font-sans text-sm text-gray-400 py-16">Sin datos aún</p>
          )}
        </div>

        <div className="bg-white p-6 shadow-sm">
          <h2 className="font-sans text-sm font-medium text-gray-600 uppercase tracking-wider mb-6">
            Canal de venta
          </h2>
          {chartCanal.length > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={chartCanal} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                  {chartCanal.map((_, i) => (
                    <Cell key={i} fill={COLORES[i % COLORES.length]} />
                  ))}
                </Pie>
                <Legend wrapperStyle={{ fontFamily: 'Jost', fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-center font-sans text-sm text-gray-400 py-16">Sin datos aún</p>
          )}
        </div>
      </div>
    </div>
  )
}