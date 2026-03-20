import type { Metadata } from 'next'
import { formatFecha, formatPrecio } from '@/lib/utils'

export const metadata: Metadata = { title: 'Clientes — GanoVita Admin' }
export const dynamic = 'force-dynamic'

async function getClientes() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/admin/clientes`,
    { cache: 'no-store' }
  )
  return res.json()
}

export default async function ClientesPage() {
  const { data: clientes } = await getClientes()

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-serif text-3xl text-gray-800">Clientes</h1>
        <p className="font-sans text-sm text-gray-500 mt-1">
          {clientes?.length ?? 0} clientes registrados
        </p>
      </div>

      <div className="bg-white shadow-sm overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              {['Nombre', 'Email', 'Teléfono', 'Ciudad', 'Registrado'].map(h => (
                <th key={h} className="text-left px-4 py-3 font-sans text-[0.7rem] tracking-widest uppercase text-gray-400">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {!clientes?.length ? (
              <tr>
                <td colSpan={5} className="px-4 py-12 text-center font-sans text-sm text-gray-400">
                  No hay clientes registrados
                </td>
              </tr>
            ) : clientes.map((c: {
              id: string
              nombre: string
              email: string
              telefono?: string
              ciudad?: string
              created_at: string
            }) => (
              <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3">
                  <p className="font-sans text-sm text-gray-800">{c.nombre}</p>
                </td>
                <td className="px-4 py-3 font-sans text-sm text-gray-500">
                  {c.email}
                </td>
                <td className="px-4 py-3">
                  {c.telefono ? (
                    <a
                      href={`https://wa.me/57${c.telefono.replace(/\D/g,'')}?text=${encodeURIComponent(`Hola ${c.nombre}, te escribimos de GanoVita`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-sans text-sm text-[#25D366] hover:underline"
                    >
                      {c.telefono}
                    </a>
                  ) : (
                    <span className="font-sans text-sm text-gray-400">—</span>
                  )}
                </td>
                <td className="px-4 py-3 font-sans text-sm text-gray-500">
                  {c.ciudad ?? '—'}
                </td>
                <td className="px-4 py-3 font-sans text-xs text-gray-400">
                  {formatFecha(c.created_at)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}