import { SectionLabel } from '@/components/ui/SectionLabel'
import Image from 'next/image'
import ganoImage from '../../../public/gano-hongo2.webp'

const stats = [
  { num: '100%', label: 'Natural & puro' },
  { num: '+500', label: 'Compuestos activos' },
  { num: '4mil', label: 'Años de uso' },
]

export function AboutSection() {
  return (
    <section id="nosotros" className="py-24 px-8 md:px-16 bg-forest grid md:grid-cols-2 gap-20 items-center">
      <div>
        <SectionLabel light>Historia</SectionLabel>
        <h2 className="font-serif text-4xl md:text-5xl font-light text-cream leading-tight mb-8">
          Cultivado con <em className="text-sage">respeto</em><br />
          por la naturaleza
        </h2>
        <p className="font-sans text-sm font-light text-mist leading-loose mb-5">
          Nos apasiona llevar a tu hogar el verdadero poder del Ganoderma Lucidum.
          Trabajamos directamente con cultivadores responsables que respetan los
          ciclos naturales del hongo, garantizando la máxima concentración de
          principios activos en cada producto.
        </p>
        <p className="font-sans text-sm font-light text-mist leading-loose mb-10">
          Cada lote pasa por análisis de pureza y potencia. Sin rellenos, sin
          aditivos artificiales. Solo la sabiduría de la naturaleza, concentrada
          para ti.
        </p>

        <div className="grid grid-cols-3 gap-6 pt-8 border-t border-sage/20">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="font-serif text-4xl font-light text-gold leading-none mb-1">{s.num}</div>
              <div className="font-sans text-[0.7rem] tracking-[0.1em] uppercase text-mist">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Visual */}
      <div className="hidden md:flex items-center justify-center relative">
        <div className="absolute inset-0 rounded-full" />
        <Image src={ganoImage} width={400} height={400} alt='' className="text-[10rem] leading-none animate-float select-none drop-shadow-[0_0_80px_rgba(230,169,31,0.2)]">
        </Image>
      </div>
    </section>
  )
}