export function emailConfirmacionCliente({
  nombre,
  orden,
  total,
  producto,
  cantidad,
  direccion,
  ciudad,
}: {
  nombre: string
  orden: string
  total: number
  producto: string
  cantidad: number
  direccion: string
  ciudad: string
}) {
  return {
    subject: `✅ Pedido confirmado — ${orden}`,
    html: `
<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f5f0e8;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f0e8;padding:40px 20px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;max-width:560px;width:100%;">

        <!-- Header -->
        <tr>
          <td style="background:#1a2e1a;padding:32px 40px;text-align:center;">
            <h1 style="margin:0;font-family:Georgia,serif;font-size:28px;font-weight:300;color:#f5f0e8;">
              Ganoderma<span style="color:#e6a91f;font-style:italic;">Vida</span>
            </h1>
          </td>
        </tr>

        <!-- Hero -->
        <tr>
          <td style="padding:40px 40px 24px;text-align:center;">
            <div style="font-size:48px;margin-bottom:16px;">✅</div>
            <h2 style="margin:0 0 8px;font-family:Georgia,serif;font-size:26px;font-weight:300;color:#1a2e1a;">
              ¡Pedido confirmado!
            </h2>
            <p style="margin:0;font-size:14px;color:#5a5245;">
              Hola <strong>${nombre}</strong>, hemos recibido tu pedido exitosamente.
            </p>
          </td>
        </tr>

        <!-- Orden badge -->
        <tr>
          <td style="padding:0 40px 24px;text-align:center;">
            <div style="display:inline-block;background:#ede5d0;padding:12px 24px;">
              <p style="margin:0;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#5a5245;">Número de orden</p>
              <p style="margin:4px 0 0;font-family:Georgia,serif;font-size:22px;color:#1a2e1a;font-weight:600;">${orden}</p>
            </div>
          </td>
        </tr>

        <!-- Detalle -->
        <tr>
          <td style="padding:0 40px 32px;">
            <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e8e0cc;">
              <tr style="background:#1a2e1a;">
                <td style="padding:10px 16px;font-size:11px;letter-spacing:1px;text-transform:uppercase;color:#c8d8b8;">Producto</td>
                <td style="padding:10px 16px;font-size:11px;letter-spacing:1px;text-transform:uppercase;color:#c8d8b8;text-align:right;">Total</td>
              </tr>
              <tr style="background:#f5f0e8;">
                <td style="padding:16px;font-size:14px;color:#1a2e1a;">
                  <strong>${producto}</strong><br>
                  <span style="font-size:12px;color:#5a5245;">Cantidad: ${cantidad}</span>
                </td>
                <td style="padding:16px;font-family:Georgia,serif;font-size:22px;color:#c8860a;text-align:right;">
                  $${total.toLocaleString('es-CO')}
                </td>
              </tr>
              <tr style="background:#ede5d0;">
                <td style="padding:12px 16px;font-size:12px;color:#5a5245;">
                  📍 Envío a: ${direccion}, ${ciudad}
                </td>
                <td style="padding:12px 16px;font-size:11px;color:#5a5245;text-align:right;">COP</td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Próximos pasos -->
        <tr>
          <td style="padding:0 40px 32px;">
            <h3 style="margin:0 0 16px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#c8860a;">Próximos pasos</h3>
            <table width="100%" cellpadding="0" cellspacing="0">
              ${['Procesamos tu pedido en 1-2 días hábiles', 'Te notificamos por email cuando sea enviado', 'Entrega estimada: 3-5 días hábiles'].map((paso, i) => `
              <tr>
                <td style="padding:8px 0;border-bottom:1px solid #ede5d0;">
                  <span style="color:#4a7c4a;font-weight:bold;margin-right:8px;">${i + 1}.</span>
                  <span style="font-size:13px;color:#5a5245;">${paso}</span>
                </td>
              </tr>`).join('')}
            </table>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#1a2e1a;padding:24px 40px;text-align:center;">
            <p style="margin:0;font-size:12px;color:#8aab6e;">
              © 2026 GanodermaVida · Todos los derechos reservados
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`,
  }
}

export function emailNuevoPedidoAdmin({
  orden,
  nombreCliente,
  email,
  telefono,
  total,
  ciudad,
  direccion,
  appUrl,
}: {
  orden: string
  nombreCliente: string
  email: string
  telefono: string
  total: number
  ciudad: string
  direccion: string
  appUrl: string
}) {
  return {
    subject: `🛒 Nuevo pedido — ${orden}`,
    html: `
<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f5f0e8;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f0e8;padding:40px 20px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;max-width:560px;width:100%;">

        <tr>
          <td style="background:#1a2e1a;padding:24px 40px;">
            <h1 style="margin:0;font-family:Georgia,serif;font-size:22px;font-weight:300;color:#f5f0e8;">
              Ganoderma<span style="color:#e6a91f;font-style:italic;">Vida</span>
              <span style="font-size:14px;color:#8aab6e;margin-left:12px;">· Panel Admin</span>
            </h1>
          </td>
        </tr>

        <tr>
          <td style="padding:32px 40px 16px;">
            <div style="font-size:36px;margin-bottom:12px;">🛒</div>
            <h2 style="margin:0 0 6px;font-family:Georgia,serif;font-size:24px;font-weight:300;color:#1a2e1a;">
              Nuevo pedido recibido
            </h2>
            <p style="margin:0;font-size:13px;color:#5a5245;">Orden <strong>${orden}</strong> — Pago confirmado por MercadoPago</p>
          </td>
        </tr>

        <tr>
          <td style="padding:0 40px 32px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              ${[
                ['Cliente', nombreCliente],
                ['Email', email],
                ['Teléfono', telefono],
                ['Ciudad', ciudad],
                ['Dirección', direccion],
                ['Total pagado', `$${total.toLocaleString('es-CO')} COP`],
              ].map(([label, valor]) => `
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #ede5d0;font-size:12px;color:#5a5245;width:120px;text-transform:uppercase;letter-spacing:1px;">${label}</td>
                <td style="padding:10px 0;border-bottom:1px solid #ede5d0;font-size:14px;color:#1a2e1a;font-weight:500;">${valor}</td>
              </tr>`).join('')}
            </table>
          </td>
        </tr>

        <tr>
          <td style="padding:0 40px 40px;text-align:center;">
            <a href="${appUrl}/admin/pedidos" style="display:inline-block;background:#c8860a;color:#ffffff;font-size:12px;letter-spacing:2px;text-transform:uppercase;padding:14px 32px;text-decoration:none;">
              Ver en el panel admin
            </a>
          </td>
        </tr>

        <tr>
          <td style="background:#1a2e1a;padding:20px 40px;text-align:center;">
            <p style="margin:0;font-size:11px;color:#4a7c4a;">GanodermaVida · Panel de administración</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`,
  }
}

export function emailEstadoActualizado({
  nombre,
  orden,
  estado,
}: {
  nombre: string
  orden: string
  estado: 'enviado' | 'entregado'
}) {
  const esEnviado = estado === 'enviado'

  return {
    subject: esEnviado
      ? `🚚 Tu pedido ${orden} ha sido enviado`
      : `✅ Tu pedido ${orden} ha sido entregado`,
    html: `
<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f5f0e8;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f0e8;padding:40px 20px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;max-width:560px;width:100%;">

        <tr>
          <td style="background:#1a2e1a;padding:32px 40px;text-align:center;">
            <h1 style="margin:0;font-family:Georgia,serif;font-size:28px;font-weight:300;color:#f5f0e8;">
              Ganoderma<span style="color:#e6a91f;font-style:italic;">Vida</span>
            </h1>
          </td>
        </tr>

        <tr>
          <td style="padding:40px;text-align:center;">
            <div style="font-size:56px;margin-bottom:16px;">${esEnviado ? '🚚' : '✅'}</div>
            <h2 style="margin:0 0 12px;font-family:Georgia,serif;font-size:26px;font-weight:300;color:#1a2e1a;">
              ${esEnviado ? '¡Tu pedido va en camino!' : '¡Pedido entregado!'}
            </h2>
            <p style="margin:0 0 24px;font-size:14px;color:#5a5245;">
              Hola <strong>${nombre}</strong>,
              ${esEnviado
                ? 'tu pedido ha sido enviado y pronto llegará a tu dirección.'
                : 'tu pedido ha sido entregado. ¡Esperamos que lo disfrutes!'}
            </p>
            <div style="background:#ede5d0;padding:12px 24px;display:inline-block;margin-bottom:24px;">
              <p style="margin:0;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#5a5245;">Orden</p>
              <p style="margin:4px 0 0;font-family:Georgia,serif;font-size:20px;color:#1a2e1a;">${orden}</p>
            </div>
            ${!esEnviado ? `
            <p style="margin:0;font-size:13px;color:#4a7c4a;">
              🍄 ¡Nos encantaría conocer tu experiencia con el Ganoderma!
            </p>` : ''}
          </td>
        </tr>

        <tr>
          <td style="background:#1a2e1a;padding:24px 40px;text-align:center;">
            <p style="margin:0;font-size:12px;color:#8aab6e;">© 2026 GanodermaVida · Todos los derechos reservados</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`,
  }
}