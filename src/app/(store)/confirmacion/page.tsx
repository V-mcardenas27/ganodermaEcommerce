import Link from 'next/link'
import { CheckCircle } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pedido confirmado — GanodermaVida',
  robots: { index: false },
}

export default async function ConfirmacionPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>
}) {
  const params = await searchParams
  const orden = params?.external_reference ?? params?.numero_orden

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <header className="bg-forest px-6 md:px-16 py-5">
        <Link href="/" className="font-serif text-xl text-cream">
          Ganoderma<span className="text-gold italic">Vida</span>
        </Link>
      </header>

      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="max-w-md w-full text-center">
          <CheckCircle size={64} className="text-fern mx-auto mb-6" />

          <h1 className="font-serif text-4xl font-light text-forest mb-3">
            ¡Pedido confirmado!
          </h1>

          {orden && (
            <p className="font-sans text-sm text-soft mb-2">
              Número de orden: <span className="font-medium text-forest">{orden}</span>
            </p>
          )}

          <p className="font-sans text-sm font-light text-soft leading-relaxed mb-8">
            Gracias por tu compra. Tu pedido ha sido recibido y será
            procesado a la brevedad.
          </p>

          {/* Próximos pasos */}
          <div className="bg-parchment p-6 text-left mb-8 space-y-3">
            <p className="font-sans text-[0.75rem] tracking-[0.1em] uppercase text-amber font-medium mb-4">
              Próximos pasos
            </p>
            {[
              '✓  Procesamos tu pedido en 1-2 días hábiles',
              '✓  Te notificamos por WhatsApp cuando sea enviado',
              '✓  Entrega estimada: 3-5 días hábiles',
            ].map(paso => (
              <p key={paso} className="font-sans text-sm text-soft">{paso}</p>
            ))}
          </div>

          {/* Botones */}
          <div className="flex flex-col gap-3">
            <Link
              href="/seguimiento"
              className="w-full inline-flex items-center justify-center border border-mist text-soft font-sans text-[0.78rem] tracking-widest uppercase px-6 py-3 hover:bg-forest hover:text-cream hover:border-forest transition-all duration-200"
            >
              Ver estado de mi pedido
            </Link>

            <Link
              href="/"
              className="font-sans text-[0.75rem] text-soft hover:text-forest transition-colors"
            >
              Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}