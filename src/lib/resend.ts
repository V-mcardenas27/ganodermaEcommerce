import { Resend } from 'resend'

export const resend = new Resend(process.env.RESEND_API_KEY)

// Usar onboarding@resend.dev hasta verificar el dominio
export const FROM_EMAIL = 'GanoVita <notificaciones@ganodermavida.com>'