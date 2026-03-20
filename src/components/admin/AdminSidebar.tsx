'use client'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutDashboard, ShoppingBag, Users, BarChart2, LogOut } from 'lucide-react'
import { cn } from '@/lib/utils'

const links = [
  { href: '/admin',             label: 'Dashboard',    icon: LayoutDashboard },
  { href: '/admin/pedidos',     label: 'Pedidos',      icon: ShoppingBag     },
  { href: '/admin/clientes',    label: 'Clientes',     icon: Users           },
  { href: '/admin/estadisticas',label: 'Estadísticas', icon: BarChart2       },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  async function handleLogout() {
    await fetch('/api/admin/login', { method: 'DELETE' })
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <aside className="w-56 min-h-screen bg-forest flex flex-col">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-sage/20">
        <h1 className="font-serif text-xl text-cream">
          Ganoderma<span className="text-gold italic">Vida</span>
        </h1>
        <p className="font-sans text-[0.65rem] tracking-widest uppercase text-sage mt-0.5">
          Admin
        </p>
      </div>

      {/* Links */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {links.map(({ href, label, icon: Icon }) => {
          const active = pathname === href
          return (
            <a
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 font-sans text-[0.8rem] transition-colors',
                active
                  ? 'bg-amber/20 text-amber'
                  : 'text-mist hover:bg-white/5 hover:text-cream'
              )}
            >
              <Icon size={16} />
              {label}
            </a>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="px-3 py-4 border-t border-sage/20">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 w-full font-sans text-[0.8rem] text-mist hover:text-red-400 transition-colors"
        >
          <LogOut size={16} />
          Cerrar sesión
        </button>
      </div>
    </aside>
  )
}