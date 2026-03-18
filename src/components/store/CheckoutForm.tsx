'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { Loader2, ShieldCheck } from 'lucide-react'
import { checkoutSchema, type CheckoutSchema } from '@/lib/validations'
import { FormField, Input } from '@/components/ui/FormField'
import { formatPrecio } from '@/lib/utils'
import type { CheckoutResponse } from '@/types'

const PRECIO_UNITARIO = 95000

export function CheckoutForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { register, handleSubmit, watch, formState: { errors } } = useForm<CheckoutSchema>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { cantidad: 1 }
  })

  const cantidad = watch('cantidad') || 1
  const total = PRECIO_UNITARIO * cantidad

  async function onSubmit(data: CheckoutSchema) {
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const json: CheckoutResponse = await res.json()

      if (!res.ok || !json.success) {
        throw new Error(json.error ?? 'Error al procesar el pedido')
      }

      // Redirigir al checkout de MercadoPago
      if (json.init_point) {
        window.location.href = json.init_point
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error inesperado'
      setError(msg)
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

      {/* Resumen del pedido */}
      <div className="bg-forest text-cream p-6">
        <p className="font-sans text-[0.7rem] tracking-[0.15em] uppercase text-sage mb-3">
          Resumen del pedido
        </p>
        <div className="flex justify-between items-start mb-3">
          <div>
            <p className="font-serif text-lg">Cápsulas Ganoderma Lucidum</p>
            <p className="font-sans text-[0.75rem] text-mist">60 cápsulas · 420mg</p>
          </div>
          <p className="font-serif text-xl text-gold">{formatPrecio(PRECIO_UNITARIO)}</p>
        </div>

        {/* Selector de cantidad */}
        <div className="flex items-center justify-between pt-3 border-t border-sage/20">
          <div className="flex items-center gap-3">
            <span className="font-sans text-[0.75rem] text-mist">Cantidad:</span>
            <div className="flex items-center gap-2">
              <select
                {...register('cantidad', { valueAsNumber: true })}
                className="bg-moss text-cream font-sans text-sm px-3 py-1.5 border border-sage/30 outline-none"
              >
                {[1,2,3,4,5].map(n => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="text-right">
            <p className="font-sans text-[0.7rem] text-mist">Total</p>
            <p className="font-serif text-2xl text-gold">{formatPrecio(total)}</p>
          </div>
        </div>
      </div>

      {/* Datos del cliente */}
      <div>
        <h2 className="font-serif text-xl text-forest mb-5">
          Datos de envío
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField label="Nombre completo" error={errors.nombre?.message} required className="md:col-span-2">
            <Input
              {...register('nombre')}
              placeholder="Tu nombre completo"
              error={!!errors.nombre}
            />
          </FormField>

          <FormField label="Correo electrónico" error={errors.email?.message} required>
            <Input
              {...register('email')}
              type="email"
              placeholder="correo@ejemplo.com"
              error={!!errors.email}
            />
          </FormField>

          <FormField label="Teléfono / WhatsApp" error={errors.telefono?.message} required>
            <Input
              {...register('telefono')}
              placeholder="300 123 4567"
              error={!!errors.telefono}
            />
          </FormField>

          <FormField label="Ciudad" error={errors.ciudad?.message} required>
            <Input
              {...register('ciudad')}
              placeholder="Tu ciudad"
              error={!!errors.ciudad}
            />
          </FormField>

          <FormField label="Dirección de envío" error={errors.direccion?.message} required className="md:col-span-2">
            <Input
              {...register('direccion')}
              placeholder="Calle, barrio, apartamento..."
              error={!!errors.direccion}
            />
          </FormField>
        </div>
      </div>

      {/* Error general */}
      {error && (
        <div className="bg-red-50 border border-red-200 px-4 py-3">
          <p className="font-sans text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* Botón de pago */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-amber text-white font-sans text-[0.85rem] tracking-widest uppercase py-4 hover:bg-gold transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3"
      >
        {loading ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Procesando...
          </>
        ) : (
          <>
            Pagar con MercadoPago — {formatPrecio(total)}
          </>
        )}
      </button>

      {/* Nota de seguridad */}
      <div className="flex items-center justify-center gap-2 text-soft">
        <ShieldCheck size={16} className="text-fern" />
        <p className="font-sans text-[0.72rem]">
          Pago 100% seguro · Tus datos están protegidos con SSL
        </p>
      </div>

      {/* Separador WhatsApp */}
      <div className="relative flex items-center gap-4">
        <div className="flex-1 h-px bg-mist/40" />
        <span className="font-sans text-[0.72rem] text-soft/60 uppercase tracking-wider">o</span>
        <div className="flex-1 h-px bg-mist/40" />
      </div>

      <a
        href={`https://wa.me/573000000000 ?? '573000000000'}?text=${encodeURIComponent('Hola, quiero hacer un pedido de Cápsulas Ganoderma Lucidum')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full flex items-center justify-center gap-3 bg-[#25D366] text-white font-sans text-[0.85rem] tracking-widest uppercase py-4 hover:bg-[#1da851] transition-colors duration-200"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        Pedir por WhatsApp
      </a>
    </form>
  )
}