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
  const WA_NUMBER = process.env.NEXT_PUBLIC_WA_NUMBER ?? '573217657670'

  const msgCliente = encodeURIComponent(
    `¡Hola! 👋 Te confirmo que tu pedido *${orden ?? ''}* de Cápsulas Ganoderma Lucidum ha sido recibido y pagado exitosamente. En breve lo procesamos y te avisamos cuando sea enviado. ¡Gracias por tu compra! 🍄`
  )

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
            <a
              href={`https://wa.me/${WA_NUMBER}?text=${msgCliente}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] text-white font-sans text-[0.78rem] tracking-widest uppercase px-6 py-3 hover:bg-[#1da851] transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Confirmar pedido por WhatsApp
            </a>

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