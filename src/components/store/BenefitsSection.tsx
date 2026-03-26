import Image from 'next/image'
import { SectionLabel } from '@/components/ui/SectionLabel'

const beneficios = [
  {
    icon: '/icons/inmune.png',
    nombre: 'Apoyo al Sistema Inmune',
    desc: 'Los beta-glucanos estimulan y modulan las defensas naturales del organismo, fortaleciéndolo ante enfermedades.',
  },
  {
    icon: '/icons/mental.png',
    nombre: 'Bienestar Mental y Enfoque',
    desc: 'Adaptógeno natural que reduce el cortisol, mejora la concentración y combate la fatiga mental.',
  },
  {
    icon: '/icons/cardiovascular.png',
    nombre: 'Equilibrio Para un Estilo de Vida Saludable',
    desc: 'Mejora la circulación gracias a sus triterpenos activos.',
  },
  {
    icon: '/icons/sueno.png',
    nombre: 'Acompañamiento al Descanso y Relajación',
    desc: 'Favorece el descanso reparador al equilibrar el sistema nervioso.',
  },
  {
    icon: '/icons/energia.png',
    nombre: 'Vitalidad y Energía Sostenida',
    desc: 'Mejora la oxigenación celular, la producción de ATP aumentando la fortaleza en las celulas.',
  },
  {
    icon: '/icons/antioxidante.png',
    nombre: 'Acción Antioxidante Natural',
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
            ¿Por qué elegir<br />
            <em className="text-fern">Ganoderma Lucidum?</em>
          </h2>
        </div>
        <p className="font-sans text-lg font-light text-soft leading-loose">
          Conocido tradicionalmente como el “Hongo de la Inmortalidad”, el Ganoderma Lucidum ha sido valorado durante miles de años por su riqueza natural en polisacáridos, triterpenos y compuestos bioactivos.
          <br />
          Una fórmula pensada para quienes buscan una alternativa natural que acompañe su rutina de bienestar.
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
            <p className="font-sans text-[0.93rem] text-soft leading-relaxed">
              {b.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}