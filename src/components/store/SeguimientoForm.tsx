'use client'
import { useState } from 'react'
import { Search, Loader2, CheckCircle, Clock, Package, Truck, Home } from 'lucide-react'
import { formatFechaCorta, formatPrecio, colorEstado, labelEstado } from '@/lib/utils'
import type { Pedido, EstadoPedidoHistorial } from '@/types'

type PedidoConHistorial = Pedido & {
  estados_pedido: EstadoPedidoHistorial[]
}

const TIMELINE = [
  { estado: 'pendiente',   label: 'Pendiente',   icon: Clock       },
  { estado: 'confirmado',  label: 'Confirmado',  icon: CheckCircle },
  { estado: 'enviado',     label: 'Enviado',     icon: Truck       },
  { estado: 'entregado',   label: 'Entregado',   icon: Home        },
]

const ORDEN_ESTADOS = ['pendiente', 'confirmado', 'enviado', 'entregado']

export function SeguimientoForm() {
  const [buscar, setBuscar] = useState('')
  const [tipo, setTipo] = useState<'orden' | 'email'>('orden')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [pedidos, setPedidos] = useState<PedidoConHistorial[]>([])
  const [buscado, setBuscado] = useState(false)

  async function handleBuscar(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setBuscado(false)

    try {
      const params = new URLSearchParams()
      if (tipo === 'orden') params.set('orden', buscar)
      else params.set('email', buscar)

      const res = await fetch(`/api/seguimiento?${params}`)
      const json = await res.json()

      if (!res.ok) throw new Error(json.error)
      setPedidos(json.data ?? [])
      setBuscado(true)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error al buscar'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Formulario */}
      <div className="bg-white p-6 shadow-sm">
        <div className="flex gap-3 mb-4">
          {[
            { value: 'orden', label: 'Número de orden' },
            { value: 'email', label: 'Correo electrónico' },
          ].map(op => (
            <button
              key={op.value}
              onClick={() => setTipo(op.value as 'orden' | 'email')}
              className={`font-sans text-[0.75rem] tracking-wider uppercase px-3 py-1.5 transition-colors ${
                tipo === op.value
                  ? 'bg-forest text-cream'
                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
              }`}
            >
              {op.label}
            </button>
          ))}
        </div>

        <form onSubmit={handleBuscar} className="flex gap-3">
          <input
            value={buscar}
            onChange={e => setBuscar(e.target.value)}
            placeholder={tipo === 'orden' ? 'GV-20250318-0001' : 'tu@correo.com'}
            className="flex-1 border border-mist px-4 py-3 font-sans text-sm outline-none focus:border-fern transition-colors"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-amber text-white px-5 py-3 hover:bg-gold transition-colors disabled:opacity-60 flex items-center gap-2"
          >
            {loading
              ? <Loader2 size={16} className="animate-spin" />
              : <Search size={16} />
            }
          </button>
        </form>

        {error && (
          <p className="font-sans text-sm text-red-500 mt-3">{error}</p>
        )}
      </div>

      {/* Resultados */}
      {buscado && pedidos.length === 0 && (
        <div className="bg-parchment p-8 text-center">
          <p className="font-serif text-xl text-forest mb-2">No encontramos tu pedido</p>
          <p className="font-sans text-sm text-soft">
            Verifica el número de orden o el correo ingresado.
          </p>
        </div>
      )}

      {pedidos.map(pedido => {
        const idxActual = ORDEN_ESTADOS.indexOf(pedido.estado)

        return (
          <div key={pedido.id} className="bg-white shadow-sm overflow-hidden">
            {/* Header */}
            <div className="bg-forest px-6 py-4 flex items-center justify-between">
              <div>
                <p className="font-sans text-[0.65rem] tracking-widest uppercase text-sage">
                  Pedido
                </p>
                <p className="font-serif text-lg text-cream">{pedido.numero_orden}</p>
              </div>
              <span className={`font-sans text-xs px-3 py-1 ${colorEstado(pedido.estado)}`}>
                {labelEstado(pedido.estado)}
              </span>
            </div>

            <div className="p-6 space-y-6">
              {/* Timeline */}
              <div>
                <p className="font-sans text-[0.7rem] tracking-widest uppercase text-amber mb-4">
                  Estado del pedido
                </p>
                <div className="relative">
                  {/* Línea de fondo */}
                  <div className="absolute top-4 left-4 right-4 h-px bg-gray-200" />
                  {/* Línea de progreso */}
                  <div
                    className="absolute top-4 left-4 h-px bg-amber transition-all duration-500"
                    style={{ width: `${(idxActual / (ORDEN_ESTADOS.length - 1)) * (100 - 8)}%` }}
                  />

                  <div className="relative flex justify-between">
                    {TIMELINE.map(({ estado, label, icon: Icon }, idx) => {
                      const completado = idx <= idxActual
                      const actual = idx === idxActual
                      return (
                        <div key={estado} className="flex flex-col items-center gap-2 w-16">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 transition-colors ${
                            completado ? 'bg-amber text-white' : 'bg-gray-100 text-gray-300'
                          } ${actual ? 'ring-2 ring-amber ring-offset-2' : ''}`}>
                            <Icon size={14} />
                          </div>
                          <p className={`font-sans text-[0.8rem] text-center leading-tight ${
                            completado ? 'text-amber font-medium' : 'text-gray-400'
                          }`}>
                            {label}
                          </p>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* Resumen */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                {[
                  ['Producto',  pedido.producto],
                  ['Cantidad',  String(pedido.cantidad)],
                  ['Total',     formatPrecio(pedido.total)],
                  ['Canal',     pedido.canal === 'web' ? 'Pago en línea' : 'WhatsApp'],
                ].map(([label, valor]) => (
                  <div key={label}>
                    <p className="font-sans text-[0.65rem] uppercase tracking-wider text-gray-400">{label}</p>
                    <p className="font-sans text-sm text-gray-700">{valor}</p>
                  </div>
                ))}
              </div>

              {/* Historial */}
              {pedido.estados_pedido?.length > 0 && (
                <div className="pt-4 border-t border-gray-100">
                  <p className="font-sans text-[0.7rem] tracking-widest uppercase text-amber mb-3">
                    Historial
                  </p>
                  <div className="space-y-2">
                    {pedido.estados_pedido.map(ep => (
                      <div key={ep.id} className="flex items-start gap-3">
                        <span className={`mt-0.5 font-sans text-xs px-2 py-0.5 ${colorEstado(ep.estado)}`}>
                          {labelEstado(ep.estado)}
                        </span>
                        <div>
                          {ep.nota && (
                            <p className="font-sans text-xs text-gray-500">{ep.nota}</p>
                          )}
                          <p className="font-sans text-[0.65rem] text-gray-400">
                            {formatFechaCorta(ep.created_at)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* WhatsApp */}
              <div className="pt-2">
                <a
                  href={`https://wa.me/573000000000?text=${encodeURIComponent(`Hola, tengo una pregunta sobre mi pedido ${pedido.numero_orden}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-sans text-[0.75rem] text-[#25D366] hover:underline"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  ¿Tienes dudas? Escríbenos por WhatsApp
                </a>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}