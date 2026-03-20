'use client'
import { formatPrecio } from '@/lib/utils'
import { TrendingUp, ShoppingBag, Users, DollarSign } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

interface Stats {
  totalHoy: number
  totalMes: number
  pedidosNuevos: number
  totalClientes: number
  pedidosRecientes: { created_at: string; total: number }[]
}

const tarjetas = (stats: Stats) => [
  { label: 'Ventas hoy',      valor: formatPrecio(stats.totalHoy),    icon: DollarSign, color: 'bg-green-50 text-green-700'  },
  { label: 'Pedidos nuevos',  valor: stats.pedidosNuevos,             icon: ShoppingBag,color: 'bg-amber-50 text-amber-700'  },
  { label: 'Ventas del mes',  valor: formatPrecio(stats.totalMes),    icon: TrendingUp, color: 'bg-blue-50 text-blue-700'    },
  { label: 'Total clientes',  valor: stats.totalClientes,             icon: Users,      color: 'bg-purple-50 text-purple-700'},
]

export function DashboardStats({ stats }: { stats: Stats }) {
  // Agrupar pedidos por día para el gráfico
  const porDia = stats.pedidosRecientes.reduce((acc, p) => {
    const dia = format(new Date(p.created_at), 'dd MMM', { locale: es })
    acc[dia] = (acc[dia] ?? 0) + p.total
    return acc
  }, {} as Record<string, number>)

  const chartData = Object.entries(porDia).map(([dia, total]) => ({ dia, total }))

  return (
    <div className="space-y-8">
      {/* Tarjetas */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {tarjetas(stats).map(({ label, valor, icon: Icon, color }) => (
          <div key={label} className="bg-white p-5 rounded-sm shadow-sm">
            <div className={`inline-flex p-2 rounded-sm mb-3 ${color}`}>
              <Icon size={18} />
            </div>
            <p className="font-sans text-[0.72rem] text-gray-500 uppercase tracking-wider mb-1">
              {label}
            </p>
            <p className="font-serif text-2xl text-gray-800">{valor}</p>
          </div>
        ))}
      </div>

      {/* Gráfico */}
      <div className="bg-white p-6 shadow-sm">
        <h2 className="font-sans text-sm font-medium text-gray-700 mb-6 uppercase tracking-wider">
          Ventas últimos 30 días
        </h2>
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={chartData}>
              <XAxis dataKey="dia" tick={{ fontSize: 11, fontFamily: 'Jost' }} />
              <YAxis tick={{ fontSize: 11, fontFamily: 'Jost' }} tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
              <Tooltip
                formatter={(v) => [formatPrecio(Number(v ?? 0)), 'Ventas']}
                labelStyle={{ fontFamily: 'Jost', fontSize: 12 }}
              />
              <Bar dataKey="total" fill="#c8860a" radius={[2,2,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-[220px] flex items-center justify-center">
            <p className="font-sans text-sm text-gray-400">
              No hay ventas registradas aún
            </p>
          </div>
        )}
      </div>
    </div>
  )
}