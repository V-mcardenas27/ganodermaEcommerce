import { SeguimientoForm } from '@/components/store/SeguimientoForm'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Seguimiento de pedido — GanodermaVida',
  robots: { index: false },
}

export default function SeguimientoPage() {
  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <header className="bg-forest px-6 md:px-16 py-5 flex items-center justify-between">
        <Link href="/" className="font-serif text-xl text-cream">
          Ganoderma<span className="text-gold italic">Vida</span>
        </Link>
        <Link
          href="/"
          className="font-sans text-[0.75rem] tracking-widest uppercase text-mist hover:text-cream transition-colors"
        >
          Volver al inicio
        </Link>
      </header>

      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-lg">
          <div className="mb-8">
            <p className="font-sans text-[0.7rem] tracking-[0.2em] uppercase text-amber mb-2">
              Rastrea tu compra
            </p>
            <h1 className="font-serif text-4xl font-light text-forest">
              Seguimiento de pedido
            </h1>
          </div>
          <SeguimientoForm />
        </div>
      </div>
    </div>
  )
}