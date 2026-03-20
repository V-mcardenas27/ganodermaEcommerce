import { formatPrecio, formatFechaCorta } from '@/lib/utils'
import { DashboardStats } from '@/components/admin/DashboardStats'

export const dynamic = 'force-dynamic'

async function getStats() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL!
  const res = await fetch(`${baseUrl}/api/admin/stats`, { cache: 'no-store' })
  return res.json()
}

export default async function AdminDashboard() {
  const stats = await getStats()

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-serif text-3xl text-gray-800">Dashboard</h1>
        <p className="font-sans text-sm text-gray-500 mt-1">
          Resumen de tu negocio
        </p>
      </div>

      <DashboardStats stats={stats} />
    </div>
  )
}