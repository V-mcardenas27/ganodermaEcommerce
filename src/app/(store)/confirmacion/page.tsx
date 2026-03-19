import Link from 'next/link'
import { CheckCircle } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pedido confirmado — GanoVita',
  robots: { index: false },
}

export default function ConfirmacionPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined }
}) {
  const orden = searchParams?.external_reference ?? searchParams?.numero_orden

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      {/* Header */}
      <header className="bg-forest px-6 md:px-16 py-5">
        <Link href="/" className="font-serif text-xl text-cream">
          Gano<span className="text-gold italic">Vita</span>
        </Link>
      </header>

      {/* Contenido */}
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
            Gracias por tu compra. Recibirás un mensaje de confirmación pronto.
            Tu pedido será procesado y enviado a la dirección indicada.
          </p>

          {/* Próximos pasos */}
          <div className="bg-parchment p-6 text-left mb-8 space-y-3">
            <p className="font-sans text-[0.75rem] tracking-[0.1em] uppercase text-amber font-medium mb-4">
              Próximos pasos
            </p>
            {[
              '✓  Recibirás confirmación en tu correo',
              '✓  Procesamos tu pedido en 1-2 días hábiles',
              '✓  Te notificamos cuando sea enviado',
              '✓  Entrega estimada: 3-5 días hábiles',
            ].map(paso => (
              <p key={paso} className="font-sans text-sm text-soft">{paso}</p>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 border border-mist text-soft font-sans text-[0.78rem] tracking-widest uppercase px-6 py-3 hover:bg-forest hover:text-cream hover:border-forest transition-all duration-200"
            >
              Volver al inicio
            </Link>
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WA_NUMBER ?? '573000000000'}?text=${encodeURIComponent(`Hola, tengo una pregunta sobre mi pedido ${orden ?? ''}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white font-sans text-[0.78rem] tracking-widest uppercase px-6 py-3 hover:bg-[#1da851] transition-colors duration-200"
            >
              ¿Dudas? WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}