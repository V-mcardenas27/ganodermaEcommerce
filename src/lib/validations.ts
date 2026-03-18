import { z } from 'zod'

export const checkoutSchema = z.object({
  nombre: z.string()
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(100, 'Nombre demasiado largo'),
  email: z.string()
    .email('Ingresa un correo electrónico válido'),
  telefono: z.string()
    .min(7, 'Teléfono inválido')
    .max(15, 'Teléfono inválido')
    .regex(/^[0-9+\s-]+$/, 'Solo números, +, espacios o guiones'),
  ciudad: z.string()
    .min(2, 'Ingresa tu ciudad')
    .max(100, 'Ciudad demasiado larga'),
  direccion: z.string()
    .min(5, 'Ingresa tu dirección completa')
    .max(200, 'Dirección demasiado larga'),
  cantidad: z.number()
    .min(1, 'Mínimo 1 unidad')
    .max(10, 'Máximo 10 unidades por pedido'),
})

export type CheckoutSchema = z.infer<typeof checkoutSchema>