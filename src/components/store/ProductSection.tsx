import Link from 'next/link'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Badge } from '@/components/ui/Badge'
import { formatPrecio } from '@/lib/utils'

const WA_NUMBER = process.env.NEXT_PUBLIC_WA_NUMBER ?? '573000000000'
const WA_MSG = encodeURIComponent(
  'Hola, quiero pedir las *Cápsulas de Ganoderma Lucidum* (60 cápsulas · 420mg). ¿Me puede dar más información?'
)

const caracteristicas = [
  '100% natural y puro',
  'Sin aditivos artificiales',
  'Dosis diaria recomendada',
  '+500 compuestos activos',
  'Alta biodisponibilidad',
  '1 mes de tratamiento',
]

export function ProductSection() {
  return (
    <section id="productos" className="py-24 px-8 md:px-16 bg-cream">
      <SectionLabel>Nuestro producto</SectionLabel>
      <h2 className="font-serif text-4xl md:text-5xl font-light text-forest leading-tight mb-12">
        Un solo producto,<br />
        <em className="text-fern">una sola misión</em>
      </h2>

      {/* Showcase */}
      <div className="grid md:grid-cols-2 overflow-hidden">
        {/* Panel visual */}
        <div className="relative bg-forest flex items-center justify-center min-h-[480px] p-16 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_50%_50%,rgba(74,124,74,0.25),transparent)]" />
          <div className="absolute w-[400px] h-[400px] rounded-full border border-sage/15 animate-rotate-slow" />
          <div className="absolute w-[280px] h-[280px] rounded-full border border-amber/10 animate-[spin_25s_linear_infinite_reverse]" />

          <Badge className="absolute top-6 left-6 z-10">Producto estrella</Badge>

          <span className="relative z-10 text-[9rem] leading-none animate-float select-none drop-shadow-[0_0_60px_rgba(74,124,74,0.5)]">
            💊
          </span>

          <div className="absolute bottom-6 right-6 z-10 border border-sage/30 p-4 text-center">
            <span className="font-serif text-4xl text-gold font-light block leading-none">60</span>
            <span className="font-sans text-[0.65rem] tracking-[0.15em] uppercase text-mist block mt-1">Cápsulas</span>
          </div>
        </div>

        {/* Panel info */}
        <div className="bg-parchment p-10 md:p-14 flex flex-col justify-center">
          <div className="flex items-center gap-2 text-[0.7rem] font-sans tracking-[0.2em] uppercase text-amber mb-3">
            Ganoderma Lucidum · Reishi
            <span className="w-8 h-px bg-amber" />
          </div>

          <h3 className="font-serif text-3xl md:text-4xl font-light text-forest leading-tight mb-1">
            Cápsulas de
          </h3>
          <h3 className="font-serif text-3xl md:text-4xl italic text-fern leading-tight mb-4">
            Ganoderma Lucidum
          </h3>

          <p className="font-sans text-[0.78rem] tracking-[0.12em] uppercase text-soft mb-6 pb-6 border-b border-sage/15">
            60 cápsulas · 420mg por cápsula · 1 mes de tratamiento
          </p>

          <p className="font-sans text-[0.9rem] font-light text-soft leading-loose mb-6">
            Ganoderma puro encapsulado con la dosis diaria recomendada para máxima
            absorción. Sin rellenos, sin aditivos artificiales. Solo la sabiduría
            del Reishi concentrada en cada cápsula.
          </p>

          {/* Características */}
          <div className="grid grid-cols-2 gap-2 mb-8">
            {caracteristicas.map((c) => (
              <div key={c} className="flex items-center gap-2 font-sans text-[0.78rem] text-soft">
                <span className="text-fern font-semibold">✓</span>
                {c}
              </div>
            ))}
          </div>

          {/* Precio y botones */}
          <div className="pt-6 border-t border-sage/15">
            <div className="font-serif text-5xl font-light text-forest mb-6">
              <sup className="text-xl text-soft font-sans font-light">$</sup>
              95.000
              <sub className="text-base text-soft font-sans font-light ml-1">COP</sub>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              {/* Pago en línea */}
              <Link
                href="/checkout"
                className="inline-flex items-center justify-center gap-2 bg-amber text-white font-sans text-[0.78rem] tracking-widest uppercase px-6 py-3 hover:bg-gold hover:-translate-y-0.5 transition-all duration-200"
              >
                Pagar en línea
              </Link>

              {/* WhatsApp */}
              <a
                href={`https://wa.me/${WA_NUMBER}?text=${WA_MSG}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white font-sans text-[0.78rem] tracking-widest uppercase px-6 py-3 hover:bg-[#1da851] hover:-translate-y-0.5 transition-all duration-200"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Pedir por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}