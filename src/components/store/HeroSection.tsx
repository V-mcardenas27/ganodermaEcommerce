import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { SectionLabel } from '@/components/ui/SectionLabel'
import ganoimg from '../../../public/gano-hongo.webp'

export function HeroSection() {
  return (
    <section className="min-h-screen grid md:grid-cols-2 bg-forest relative overflow-hidden">
      {/* Gradiente de fondo */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_70%_50%,rgba(74,124,74,0.18),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_60%_at_30%_80%,rgba(200,134,10,0.08),transparent)]" />
      </div>

      {/* Contenido izquierdo */}
      <div className="relative z-10 flex flex-col justify-center px-8 md:px-16 pt-32 pb-16 animate-[fadeUp_0.9s_ease_both]">
        <SectionLabel light>
          ¡Revitaliza tu salud con Ganoderma Lucidum!
        </SectionLabel>

        <h1 className="font-serif text-5xl md:text-7xl font-light text-cream leading-[1.1] mb-6">
          El hongo de<br />
          <em className="text-gold not-italic font-light">la eterna juventud</em>
        </h1>

        <p className="font-sans text-sm font-light text-mist leading-relaxed max-w-sm mb-10">
          Ganoderma Lucidum, mejora tu sitema inmune, aumenta
          tu energía, y te ayuda a combatir el cansancio y el envejecimiento.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="#productos"
            className="inline-flex items-center gap-3 bg-amber text-white font-sans text-[0.8rem] tracking-widest uppercase px-7 py-4 hover:bg-gold hover:-translate-y-0.5 transition-all duration-200"
          >
            Ver producto
            <ArrowRight size={16} />
          </a>
          <Link
            href="/checkout"
            className="inline-flex items-center gap-3 border border-sage/40 text-mist font-sans text-[0.8rem] tracking-widest uppercase px-7 py-4 hover:border-sage hover:text-cream transition-all duration-200"
          >
            Comprar ahora
          </Link>
        </div>
      </div>

      {/* Visual derecho */}
      <div className="relative hidden md:flex items-center justify-center overflow-hidden">
        {/* Anillos decorativos */}
        <div className="absolute w-[520px] h-[520px] rounded-full border border-sage/20 animate-rotate-slow" />
        <div className="absolute w-[380px] h-[380px] rounded-full border border-amber/10 animate-[spin_25s_linear_infinite_reverse]" />

        {/* Ícono principal */}
        <Image src={ganoimg} width={400} height={30} alt='' className="relative z-10 text-[14rem] leading-none drop-shadow-[0_0_60px_rgba(74,124,74,0.5)] animate-float select-none">
          
        </Image>

        {/* Badge inferior */}
        <div className="absolute bottom-16 right-16 z-10 border border-sage/30 bg-forest/70 backdrop-blur-sm px-5 py-4 max-w-[180px]">
          <span className="font-serif text-4xl text-gold font-light block leading-none mb-1">+500</span>
          <span className="font-sans text-[0.72rem] text-mist leading-relaxed">
            compuestos bioactivos únicos en el Ganoderma Lucidum
          </span>
        </div>
      </div>
    </section>
  )
}