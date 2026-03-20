'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, Lock } from 'lucide-react'

export default function AdminLoginPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      if (!res.ok) {
        const json = await res.json()
        throw new Error(json.error ?? 'Error al iniciar sesión')
      }

      router.push('/admin')
      router.refresh()
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error inesperado'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-forest flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-10">
          <h1 className="font-serif text-3xl text-cream mb-1">
            Gano<span className="text-gold italic">Vita</span>
          </h1>
          <p className="font-sans text-[0.75rem] tracking-[0.15em] uppercase text-sage">
            Panel de administración
          </p>
        </div>

        {/* Card */}
        <div className="bg-cream p-8">
          <div className="flex items-center gap-3 mb-6">
            <Lock size={18} className="text-amber" />
            <h2 className="font-serif text-xl text-forest">Iniciar sesión</h2>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="font-sans text-[0.72rem] tracking-[0.1em] uppercase text-soft block mb-1.5">
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full border border-mist bg-white px-4 py-3 font-sans text-sm text-forest outline-none focus:border-fern transition-colors"
                required
              />
            </div>

            {error && (
              <p className="font-sans text-sm text-red-500">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-amber text-white font-sans text-[0.82rem] tracking-widest uppercase py-3 hover:bg-gold transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : null}
              Entrar
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}