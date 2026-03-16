export type EstadoPedido =
  | 'pendiente'
  | 'pagado'
  | 'procesando'
  | 'enviado'
  | 'entregado'
  | 'cancelado'

export type CanalPedido = 'web' | 'whatsapp'
export type MetodoPago = 'mercadopago' | 'payu' | 'whatsapp' | 'efectivo'

export interface Cliente {
  id: string
  nombre: string
  email: string
  telefono?: string
  ciudad?: string
  direccion?: string
  created_at: string
}

export interface Pedido {
  id: string
  numero_orden: string
  cliente_id: string
  clientes?: Cliente
  producto: string
  cantidad: number
  precio_unitario: number
  total: number
  estado: EstadoPedido
  canal: CanalPedido
  metodo_pago?: MetodoPago
  notas?: string
  created_at: string
  updated_at: string
}

export interface EstadoPedidoHistorial {
  id: string
  pedido_id: string
  estado: EstadoPedido
  nota?: string
  created_at: string
}

export interface Transaccion {
  id: string
  pedido_id: string
  pasarela: 'mercadopago' | 'payu'
  pasarela_payment_id?: string
  pasarela_status?: string
  monto: number
  moneda: string
  raw_data?: Record<string, unknown>
  created_at: string
}

// Datos del formulario de checkout
export interface CheckoutFormData {
  nombre: string
  email: string
  telefono: string
  ciudad: string
  direccion: string
  cantidad: number
}

// Respuesta de la API de checkout
export interface CheckoutResponse {
  success: boolean
  init_point?: string   // URL de pago de MercadoPago
  numero_orden?: string
  error?: string
}