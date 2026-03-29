'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, ChevronDown, Loader2 } from 'lucide-react'
import { formatPrecio, formatFechaCorta, colorEstado, labelEstado } from '@/lib/utils'
import type { Pedido, EstadoPedido } from '@/types'

const ESTADOS: { value: string; label: string }[] = [
  { value: 'todos',      label: 'Todos'      },
  { value: 'pendiente',  label: 'Pendiente'  },
  { value: 'confirmado', label: 'Confirmado' },
  { value: 'enviado',    label: 'Enviado'    },
  { value: 'entregado',  label: 'Entregado'  },
  { value: 'cancelado',  label: 'Cancelado'  },
]

export function PedidosTable({ pedidos }: { pedidos: Pedido[] }) {
  const router = useRouter()
  const [buscar, setBuscar] = useState('')
  const [filtroEstado, setFiltroEstado] = useState('todos')
  const [actualizando, setActualizando] = useState<string | null>(null)
  const [pedidoActivo, setPedidoActivo] = useState<Pedido | null>(null)

  async function cambiarEstado(id: string, estado: EstadoPedido) {
    setActualizando(id)
    try {
      await fetch('/api/admin/pedidos', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, estado }),
      })
      router.refresh()
    } finally {
      setActualizando(null)
    }
  }

  function handleBuscar(e: React.FormEvent) {
    e.preventDefault()
    const params = new URLSearchParams()
    if (filtroEstado !== 'todos') params.set('estado', filtroEstado)
    if (buscar) params.set('buscar', buscar)
    router.push(`/admin/pedidos?${params}`)
  }

  return (
    <div className="space-y-4">
      {/* Filtros */}
      <form onSubmit={handleBuscar} className="flex flex-wrap gap-3">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={buscar}
            onChange={e => setBuscar(e.target.value)}
            placeholder="Buscar por orden..."
            className="pl-9 pr-4 py-2 border border-gray-200 bg-white font-sans text-sm outline-none focus:border-fern w-56"
          />
        </div>

        <select
          value={filtroEstado}
          onChange={e => setFiltroEstado(e.target.value)}
          className="px-3 py-2 border border-gray-200 bg-white font-sans text-sm outline-none focus:border-fern"
        >
          {ESTADOS.map(e => (
            <option key={e.value} value={e.value}>{e.label}</option>
          ))}
        </select>

        <button
          type="submit"
          className="px-4 py-2 bg-amber text-white font-sans text-sm hover:bg-gold transition-colors"
        >
          Filtrar
        </button>
      </form>

      {/* Tabla */}
      <div className="bg-white shadow-sm overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              {['Orden', 'Fecha', 'Cliente', 'Total', 'Canal', 'Estado', 'Acciones'].map(h => (
                <th key={h} className="text-left px-4 py-3 font-sans text-[0.7rem] tracking-widest uppercase text-gray-400">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {pedidos.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-12 text-center font-sans text-sm text-gray-400">
                  No hay pedidos
                </td>
              </tr>
            ) : pedidos.map(p => (
              <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 font-sans text-sm font-medium text-forest">
                  {p.numero_orden}
                </td>
                <td className="px-4 py-3 font-sans text-xs text-gray-500">
                  {formatFechaCorta(p.created_at)}
                </td>
                <td className="px-4 py-3">
                  <p className="font-sans text-sm text-gray-800">{p.clientes?.nombre ?? '—'}</p>
                  <p className="font-sans text-xs text-gray-400">{p.clientes?.email ?? '—'}</p>
                </td>
                <td className="px-4 py-3 font-serif text-sm text-gray-800">
                  {formatPrecio(p.total)}
                </td>
                <td className="px-4 py-3">
                  <span className="font-sans text-xs uppercase tracking-wider text-gray-500">
                    {p.canal}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`font-sans text-xs px-2 py-1 ${colorEstado(p.estado)}`}>
                    {labelEstado(p.estado)}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    {/* Cambiar estado */}
                    <div className="relative">
                      <select
                        value={p.estado}
                        onChange={e => cambiarEstado(p.id, e.target.value as EstadoPedido)}
                        disabled={actualizando === p.id}
                        className="appearance-none pl-2 pr-6 py-1 border border-gray-200 font-sans text-xs outline-none focus:border-fern bg-white cursor-pointer"
                      >
                        {ESTADOS.filter(e => e.value !== 'todos').map(e => (
                          <option key={e.value} value={e.value}>{e.label}</option>
                        ))}
                      </select>
                      {actualizando === p.id
                        ? <Loader2 size={10} className="absolute right-1.5 top-1/2 -translate-y-1/2 animate-spin text-amber" />
                        : <ChevronDown size={10} className="absolute right-1.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                      }
                    </div>

                    {/* Ver detalle */}
                    <button
                      onClick={() => setPedidoActivo(p)}
                      className="font-sans text-xs text-amber hover:text-gold transition-colors"
                    >
                      Ver
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal detalle */}
      {pedidoActivo && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto">
            {/* Header modal */}
            <div className="bg-forest px-6 py-4 flex items-center justify-between">
              <div>
                <p className="font-sans text-[0.7rem] tracking-widest uppercase text-sage">Pedido</p>
                <p className="font-serif text-lg text-cream">{pedidoActivo.numero_orden}</p>
              </div>
              <button
                onClick={() => setPedidoActivo(null)}
                className="text-mist hover:text-cream transition-colors font-sans text-xl"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-5">
              {/* Cliente */}
              <div>
                <p className="font-sans text-[0.7rem] tracking-widest uppercase text-amber mb-3">
                  Datos del cliente
                </p>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  {[
                    ['Nombre',    pedidoActivo.clientes?.nombre],
                    ['Email',     pedidoActivo.clientes?.email],
                    ['Teléfono',  pedidoActivo.clientes?.telefono],
                    ['Ciudad',    pedidoActivo.clientes?.ciudad],
                    ['Dirección', pedidoActivo.clientes?.direccion],
                  ].map(([label, valor]) => (
                    <div key={label} className={label === 'Dirección' ? 'col-span-2' : ''}>
                      <p className="font-sans text-[0.7rem] text-gray-400 uppercase tracking-wider">{label}</p>
                      <p className="font-sans text-gray-700">{valor ?? '—'}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pedido */}
              <div className="border-t pt-4">
                <p className="font-sans text-[0.7rem] tracking-widest uppercase text-amber mb-3">
                  Detalle del pedido
                </p>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  {[
                    ['Producto',    pedidoActivo.producto],
                    ['Cantidad',    String(pedidoActivo.cantidad)],
                    ['Precio unit.',formatPrecio(pedidoActivo.precio_unitario)],
                    ['Total',       formatPrecio(pedidoActivo.total)],
                    ['Canal',       pedidoActivo.canal],
                    ['Método pago', pedidoActivo.metodo_pago ?? '—'],
                  ].map(([label, valor]) => (
                    <div key={label}>
                      <p className="font-sans text-[0.7rem] text-gray-400 uppercase tracking-wider">{label}</p>
                      <p className="font-sans text-gray-700">{valor}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Estado actual */}
              <div className="border-t pt-4">
                <p className="font-sans text-[0.7rem] tracking-widest uppercase text-amber mb-3">
                  Estado actual
                </p>
                <span className={`font-sans text-xs px-3 py-1 ${colorEstado(pedidoActivo.estado)}`}>
                  {labelEstado(pedidoActivo.estado)}
                </span>
              </div>

              {/* Botón WhatsApp */}
              {/* Botones de notificación WhatsApp */}
                {pedidoActivo.clientes?.telefono && (
                <div className="border-t pt-4 space-y-3">
                  <p className="font-sans text-[0.7rem] tracking-widest uppercase text-amber">
                    Notificar al cliente
                  </p>

                  {/* Confirmado */}
                  {pedidoActivo.estado === 'confirmado' && (
                    <a
                      href={`https://wa.me/57${pedidoActivo.clientes.telefono.replace(/\D/g,'')}?text=${encodeURIComponent(`¡Hola ${pedidoActivo.clientes.nombre}! ✅ Tu pedido *${pedidoActivo.numero_orden}* de Cápsulas Ganoderma Lucidum ha sido confirmado. Pronto lo enviaremos a tu dirección. ¡Gracias por confiar en GanoVita! 🍄`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 bg-blue-500 text-white font-sans text-xs tracking-widest uppercase px-4 py-2.5 hover:bg-blue-600 transition-colors"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                      Avisar que fue confirmado
                    </a>
                  )}

                  {/* Enviado */}
                  {pedidoActivo.estado === 'enviado' && (
                    <a
                      href={`https://wa.me/57${pedidoActivo.clientes.telefono.replace(/\D/g,'')}?text=${encodeURIComponent(`¡Hola ${pedidoActivo.clientes.nombre}! 🚚 Tu pedido *${pedidoActivo.numero_orden}* de Cápsulas Ganoderma Lucidum ha sido enviado. Pronto lo recibirás en tu dirección. Recuerda que el pago es contra entrega. ¡Gracias! 🍄`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] text-white font-sans text-xs tracking-widest uppercase px-4 py-2.5 hover:bg-[#1da851] transition-colors"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                      Avisar que fue enviado
                    </a>
                  )}

                  {/* Entregado */}
                  {pedidoActivo.estado === 'entregado' && (
                    <a
                      href={`https://wa.me/57${pedidoActivo.clientes.telefono.replace(/\D/g,'')}?text=${encodeURIComponent(`¡Hola ${pedidoActivo.clientes.nombre}! ✅ Tu pedido *${pedidoActivo.numero_orden}* ha sido entregado. Esperamos que disfrutes tu Ganoderma Lucidum. ¡Nos encantaría conocer tu experiencia! 🍄`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 bg-fern text-white font-sans text-xs tracking-widest uppercase px-4 py-2.5 hover:bg-forest transition-colors"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                      Confirmar entrega al cliente
                    </a>
                  )}

                  {/* Genérico */}
                  <a
                    href={`https://wa.me/57${pedidoActivo.clientes.telefono.replace(/\D/g,'')}?text=${encodeURIComponent(`Hola ${pedidoActivo.clientes.nombre}, te escribimos de GanoVita sobre tu pedido ${pedidoActivo.numero_orden}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 border border-[#25D366] text-[#25D366] font-sans text-xs tracking-widest uppercase px-4 py-2.5 hover:bg-[#25D366] hover:text-white transition-colors"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    Contactar por WhatsApp
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}