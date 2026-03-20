'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

export function Navbar() {
  const [open, setOpen] = useState(false)

  const links = [
    { href: '#productos',  label: 'Producto'  },
    { href: '#beneficios', label: 'Beneficios' },
    { href: '#nosotros',   label: 'Nosotros'   },
    { href: '#contacto',   label: 'Contacto'   },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-5 flex items-center justify-between bg-cream/90 backdrop-blur-md border-b border-sage/20">
      {/* Logo */}
      <Link href="/" className="font-serif text-2xl font-semibold text-forest tracking-wide">
        Ganoderma<span className="text-amber italic">Vida</span>
      </Link>

      {/* Desktop links */}
      <ul className="hidden md:flex gap-10">
        {links.map(l => (
          <li key={l.href}>
            <a
              href={l.href}
              className="font-sans text-[0.75rem] tracking-[0.12em] uppercase text-soft hover:text-fern transition-colors"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>

      {/* Mobile toggle */}
      <button
        className="md:hidden text-forest"
        onClick={() => setOpen(!open)}
        aria-label="Menú"
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* Mobile menu */}
      {open && (
        <div className="absolute top-full left-0 right-0 bg-cream border-b border-sage/20 px-6 py-6 flex flex-col gap-5 md:hidden">
          {links.map(l => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="font-sans text-[0.8rem] tracking-[0.12em] uppercase text-soft hover:text-fern transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}