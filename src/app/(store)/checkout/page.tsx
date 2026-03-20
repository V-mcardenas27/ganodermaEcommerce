import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { CheckoutForm } from '@/components/store/CheckoutForm'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Checkout — GanodermaVida',
  robots: { index: false },
}

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <header className="bg-forest px-6 md:px-16 py-5 flex items-center justify-between">
        <Link href="/" className="font-serif text-xl text-cream">
          Ganoderma<span className="text-gold italic">Vida</span>
        </Link>
        <Link
          href="/"
          className="flex items-center gap-2 font-sans text-[0.75rem] tracking-widest uppercase text-mist hover:text-cream transition-colors"
        >
          <ArrowLeft size={14} />
          Volver
        </Link>
      </header>

      {/* Contenido */}
      <div className="max-w-xl mx-auto px-6 py-12">
        <div className="mb-8">
          <p className="font-sans text-[0.7rem] tracking-[0.2em] uppercase text-amber mb-2">
            Paso 1 de 2
          </p>
          <h1 className="font-serif text-3xl font-light text-forest">
            Completa tu pedido
          </h1>
        </div>

        <CheckoutForm />
      </div>
    </div>
  )
}