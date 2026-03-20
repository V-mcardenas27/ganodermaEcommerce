import { PedidosTable } from '@/components/admin/PedidosTable'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Pedidos — GanodermaVida Admin' }
export const dynamic = 'force-dynamic'

async function getPedidos(estado?: string, buscar?: string) {
  const params = new URLSearchParams()
  if (estado) params.set('estado', estado)
  if (buscar) params.set('buscar', buscar)
  params.set('limite', '100')

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/admin/pedidos?${params}`,
    { cache: 'no-store' }
  )
  return res.json()
}

export default async function PedidosPage({
  searchParams,
}: {
  searchParams: Promise<{ estado?: string; buscar?: string }>
}) {
  // ← await aquí
  const { estado, buscar } = await searchParams

  const { data: pedidos } = await getPedidos(estado, buscar)

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-serif text-3xl text-gray-800">Pedidos</h1>
        <p className="font-sans text-sm text-gray-500 mt-1">
          Gestiona y actualiza el estado de cada pedido
        </p>
      </div>
      <PedidosTable pedidos={pedidos ?? []} />
    </div>
  )
}