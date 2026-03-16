import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

// Combina clases de Tailwind sin conflictos
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Formatea precios en COP
export function formatPrecio(valor: number): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0
  }).format(valor)
}

// Formatea fechas en español
export function formatFecha(fecha: string | Date): string {
  return format(new Date(fecha), "d 'de' MMMM 'de' yyyy", { locale: es })
}

export function formatFechaCorta(fecha: string | Date): string {
  return format(new Date(fecha), 'dd/MM/yyyy HH:mm', { locale: es })
}

// Colores por estado de pedido
export function colorEstado(estado: string): string {
  const colores: Record<string, string> = {
    pendiente:   'bg-yellow-100 text-yellow-800',
    pagado:      'bg-green-100 text-green-800',
    procesando:  'bg-blue-100 text-blue-800',
    enviado:     'bg-purple-100 text-purple-800',
    entregado:   'bg-emerald-100 text-emerald-800',
    cancelado:   'bg-red-100 text-red-800',
  }
  return colores[estado] ?? 'bg-gray-100 text-gray-800'
}

// Label legible por estado
export function labelEstado(estado: string): string {
  const labels: Record<string, string> = {
    pendiente:   'Pendiente',
    pagado:      'Pagado',
    procesando:  'Procesando',
    enviado:     'Enviado',
    entregado:   'Entregado',
    cancelado:   'Cancelado',
  }
  return labels[estado] ?? estado
}