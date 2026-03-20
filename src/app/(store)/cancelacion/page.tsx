import Link from 'next/link'
import { XCircle } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pago cancelado — GanodermaVida',
  robots: { index: false },
}

export default function CancelacionPage() {
  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <header className="bg-forest px-6 md:px-16 py-5">
        <Link href="/" className="font-serif text-xl text-cream">
          Gano<span className="text-gold italic">Vita</span>
        </Link>
      </header>

      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="max-w-md w-full text-center">
          <XCircle size={64} className="text-red-400 mx-auto mb-6" />

          <h1 className="font-serif text-4xl font-light text-forest mb-3">
            Pago no completado
          </h1>
          <p className="font-sans text-sm font-light text-soft leading-relaxed mb-8">
            No se realizó ningún cobro. Puedes intentarlo de nuevo o
            contactarnos directamente por WhatsApp.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/checkout"
              className="inline-flex items-center justify-center bg-amber text-white font-sans text-[0.78rem] tracking-widest uppercase px-6 py-3 hover:bg-gold transition-colors duration-200"
            >
              Reintentar pago
            </Link>
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WA_NUMBER ?? '573000000000'}?text=${encodeURIComponent('Hola, tuve un problema al pagar en línea y quiero hacer mi pedido')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white font-sans text-[0.78rem] tracking-widest uppercase px-6 py-3 hover:bg-[#1da851] transition-colors duration-200"
            >
              Pedir por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}