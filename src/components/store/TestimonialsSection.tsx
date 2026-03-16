import { SectionLabel } from '@/components/ui/SectionLabel'

const testimonios = [
  { texto: 'Llevo 3 meses tomando las cápsulas y mis niveles de energía son increíbles. Dormía mal desde hace años y ahora descanso profundamente.', autor: 'María C.', ciudad: 'Bogotá' },
  { texto: 'Mi médico quedó sorprendido con mis análisis de colesterol después de 2 meses. Producto de calidad real.', autor: 'Carlos M.', ciudad: 'Medellín' },
  { texto: 'La mejor inversión para mi salud. El servicio por WhatsApp es muy rápido y el producto llegó en perfecto estado.', autor: 'Sandra R.', ciudad: 'Cali' },
]

export function TestimonialsSection() {
  return (
    <section className="py-24 px-8 md:px-16 bg-parchment text-center">
      <div className="flex items-center justify-center gap-3 text-[0.7rem] font-sans tracking-[0.2em] uppercase text-amber mb-4">
        <span className="w-8 h-px bg-amber" />
        Testimonios
        <span className="w-8 h-px bg-amber" />
      </div>

      <h2 className="font-serif text-4xl md:text-5xl font-light text-forest leading-tight mb-16">
        Lo que dicen<br />
        <em className="text-fern">nuestros clientes</em>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-sage/10">
        {testimonios.map((t) => (
          <div key={t.autor} className="bg-parchment p-10 text-left">
            <div className="text-amber text-lg mb-4">★★★★★</div>
            <p className="font-serif text-lg italic font-light text-forest leading-relaxed mb-6">
              &quot;{t.texto}&quot;
            </p>
            <p className="font-sans text-[0.75rem] tracking-[0.1em] uppercase text-soft">
              — {t.autor}, {t.ciudad}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}