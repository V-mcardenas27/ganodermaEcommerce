import { EstadisticasView } from '@/components/admin/EstadisticasView'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Estadísticas — GanodermaVida Admin' }
export const dynamic = 'force-dynamic'

async function getStats() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/admin/stats`,
    { cache: 'no-store' }
  )
  return res.json()
}

async function getPedidosEstados() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/admin/pedidos?limite=500`,
    { cache: 'no-store' }
  )
  return res.json()
}

export default async function EstadisticasPage() {
  const [stats, { data: pedidos }] = await Promise.all([
    getStats(),
    getPedidosEstados(),
  ])

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-serif text-3xl text-gray-800">Estadísticas</h1>
        <p className="font-sans text-sm text-gray-500 mt-1">
          Análisis de ventas y pedidos
        </p>
      </div>
      <EstadisticasView stats={stats} pedidos={pedidos ?? []} />
    </div>
  )
}