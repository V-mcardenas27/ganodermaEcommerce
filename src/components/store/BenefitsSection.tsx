import Image from 'next/image'
import { SectionLabel } from '@/components/ui/SectionLabel'

const beneficios = [
  {
    icon: '/icons/inmune.png',
    nombre: 'Sistema Inmune',
    desc: 'Los beta-glucanos estimulan y modulan las defensas naturales del organismo, fortaleciéndolo ante enfermedades.',
  },
  {
    icon: '/icons/mental.png',
    nombre: 'Claridad Mental',
    desc: 'Adaptógeno natural que reduce el cortisol, mejora la concentración y combate la fatiga mental crónica.',
  },
  {
    icon: '/icons/cardiovascular.png',
    nombre: 'Salud Cardiovascular',
    desc: 'Regula la presión arterial, reduce el colesterol LDL y mejora la circulación gracias a sus triterpenos activos.',
  },
  {
    icon: '/icons/sueno.png',
    nombre: 'Sueño Profundo',
    desc: 'Favorece el descanso reparador y reduce el insomnio al equilibrar el sistema nervioso.',
  },
  {
    icon: '/icons/energia.png',
    nombre: 'Energía Vital',
    desc: 'Mejora la oxigenación celular y la producción de ATP brindando energía sostenida sin efectos rebote.',
  },
  {
    icon: '/icons/antioxidante.png',
    nombre: 'Antioxidante Potente',
    desc: 'Neutraliza los radicales libres que aceleran el envejecimiento celular, protegiendo órganos y tejidos.',
  },
]

export function BenefitsSection() {
  return (
    <section id="beneficios" className="py-24 px-8 md:px-16 bg-parchment">
      {/* Intro */}
      <div className="grid md:grid-cols-2 gap-12 items-end mb-16">
        <div>
          <SectionLabel>Propiedades</SectionLabel>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-forest leading-tight">
            ¿Por qué el Ganoderma<br />
            <em className="text-fern">transforma tu salud?</em>
          </h2>
        </div>
        <p className="font-sans text-sm font-light text-soft leading-loose">
          Conocido en Asia como el &quot;Hongo de la Inmortalidad&quot;, el Ganoderma Lucidum
          ha sido venerado por más de 4.000 años. Sus polisacáridos, triterpenos y
          germanio orgánico lo convierten en uno de los adaptógenos más completos
          de la naturaleza.
        </p>
      </div>

      {/* Grid de tarjetas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-sage/10">
        {beneficios.map((b) => (
          <div
            key={b.nombre}
            className="bg-parchment hover:bg-cream transition-colors duration-300 p-10"
          >
            <div className="mb-5">
              <Image
                src={b.icon}
                alt={b.nombre}
                width={40}
                height={40}
                className="object-contain"
              />
            </div>
            <h3 className="font-serif text-xl font-semibold text-forest mb-2">
              {b.nombre}
            </h3>
            <p className="font-sans text-[0.83rem] text-soft leading-relaxed">
              {b.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}