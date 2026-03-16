export function Footer() {
  return (
    <footer className="bg-forest px-8 md:px-16 pt-16 pb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
        {/* Marca */}
        <div>
          <div className="font-serif text-2xl text-cream mb-3">
            Gano<span className="text-gold italic">Vita</span>
          </div>
          <p className="font-sans text-[0.82rem] font-light text-mist leading-relaxed max-w-[28ch]">
            Distribuidores de Ganoderma Lucidum premium. Naturaleza, ciencia
            y bienestar en cada producto.
          </p>
        </div>

        {/* Producto */}
        <div>
          <div className="font-sans text-[0.7rem] tracking-[0.18em] uppercase text-sage mb-5">
            Producto
          </div>
          <ul className="space-y-2">
            {['60 cápsulas · 420mg'].map((item) => (
              <li key={item}>
                <a href="#productos" className="font-sans text-[0.82rem] text-mist hover:text-gold transition-colors">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Info */}
        <div>
          <div className="font-sans text-[0.7rem] tracking-[0.18em] uppercase text-sage mb-5">
            Información
          </div>
          <ul className="space-y-2">
            {['¿Qué es el Ganoderma?', 'Beneficios', 'Modo de uso', 'Preguntas frecuentes', 'Contacto'].map((item) => (
              <li key={item}>
                <a href="#" className="font-sans text-[0.82rem] text-mist hover:text-gold transition-colors">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-sage/15 pt-8 flex flex-col md:flex-row justify-between items-center gap-3">
        <p className="font-sans text-[0.75rem] text-mist/50">
          © 2025 GanoVita — Todos los derechos reservados
        </p>
        <p className="font-sans text-[0.75rem] text-mist/50">
          Hecho con 🍄 y amor por la naturaleza
        </p>
      </div>
    </footer>
  )
}