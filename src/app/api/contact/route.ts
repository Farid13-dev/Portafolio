import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        const { name, email, subject, message } = await request.json();

        if (!name || !email || !subject || !message) {
            return NextResponse.json(
                { error: 'Todos los campos son requeridos' },
                { status: 400 }
            );
        }

        const destinationEmail = process.env.CONTACT_EMAIL;

        if (!destinationEmail) {
            console.error('CONTACT_EMAIL no está configurado en las variables de entorno');
            return NextResponse.json(
                { error: 'Error de configuración del servidor' },
                { status: 500 }
            );
        }

        const receivedAt = new Date().toLocaleString('es-CO', {
            dateStyle: 'long',
            timeStyle: 'short',
            timeZone: 'America/Bogota',
        });

        const initials = getInitials(name);

        const html = buildEmailHtml({ name, email, subject, message, receivedAt, initials });
        const text = buildEmailText({ name, email, subject, message, receivedAt });

        const { data, error } = await resend.emails.send({
            from: 'Portafolio <onboarding@resend.dev>',
            to: destinationEmail,
            replyTo: email,
            subject: `[Portafolio] ${subject}`,
            html,
            text,
        });

        if (error) {
            console.error('Error de Resend:', error);
            return NextResponse.json(
                { error: 'No se pudo enviar el mensaje' },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true, id: data?.id });
    } catch (error) {
        console.error('Error en /api/contact:', error);
        return NextResponse.json(
            { error: 'Error interno del servidor' },
            { status: 500 }
        );
    }
}

function getInitials(name: string): string {
    return name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase() ?? '')
        .join('');
}

function escapeHtml(str: string): string {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

interface EmailData {
    name: string;
    email: string;
    subject: string;
    message: string;
    receivedAt: string;
    initials: string;
}

function buildEmailHtml({ name, email, subject, message, receivedAt, initials }: EmailData): string {
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeSubject = escapeHtml(subject);
    const safeMessage = escapeHtml(message);

    return `
<!DOCTYPE html>
<html lang="es">
<body style="margin:0; padding:0; background-color:#f4f4f5; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f5; padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px; background-color:#ffffff; border-radius:16px; overflow:hidden; box-shadow:0 1px 3px rgba(0,0,0,0.06);">

          <!-- Header con degradado -->
          <tr>
            <td style="background:linear-gradient(135deg,#18181b 0%,#3f3f46 100%); padding:32px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <p style="margin:0; color:#a1a1aa; font-size:12px; font-weight:600; text-transform:uppercase; letter-spacing:0.08em;">
                      Nuevo mensaje
                    </p>
                    <p style="margin:6px 0 0 0; color:#ffffff; font-size:20px; font-weight:700;">
                      Desde tu portafolio
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Tarjeta del remitente -->
          <tr>
            <td style="padding:28px 32px 0 32px;">
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="width:48px; height:48px; background-color:#18181b; border-radius:50%; text-align:center; vertical-align:middle;">
                    <span style="color:#ffffff; font-size:16px; font-weight:700; line-height:48px;">${initials}</span>
                  </td>
                  <td style="padding-left:14px;">
                    <p style="margin:0; color:#18181b; font-size:16px; font-weight:600;">${safeName}</p>
                    <a href="mailto:${safeEmail}" style="color:#71717a; font-size:14px; text-decoration:none;">${safeEmail}</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Asunto -->
          <tr>
            <td style="padding:24px 32px 0 32px;">
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background-color:#f4f4f5; border-radius:999px; padding:6px 14px;">
                    <span style="color:#3f3f46; font-size:13px; font-weight:500;">${safeSubject}</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Mensaje -->
          <tr>
            <td style="padding:20px 32px 8px 32px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-left:3px solid #e4e4e7;">
                <tr>
                  <td style="padding:4px 0 4px 18px;">
                    <p style="margin:0; color:#27272a; font-size:15px; line-height:1.65; white-space:pre-wrap;">${safeMessage}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Botón CTA -->
          <tr>
            <td style="padding:28px 32px 32px 32px;">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td>
                    <a href="mailto:${safeEmail}?subject=${encodeURIComponent('Re: ' + subject)}"
                       style="display:inline-block; background-color:#18181b; color:#ffffff; text-decoration:none; padding:12px 24px; border-radius:10px; font-size:14px; font-weight:600;">
                      Responder a ${safeName} →
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:18px 32px; background-color:#fafafa; border-top:1px solid #f0f0f1;">
              <p style="margin:0; color:#a1a1aa; font-size:12px;">
                Recibido el ${receivedAt}
              </p>
              <p style="margin:4px 0 0 0; color:#d4d4d8; font-size:11px;">
                Enviado desde el formulario de contacto de tu portafolio
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

function buildEmailText({ name, email, subject, message, receivedAt }: Omit<EmailData, 'initials'>): string {
    return [
        'NUEVO MENSAJE DESDE TU PORTAFOLIO',
        '',
        `Nombre:  ${name}`,
        `Email:   ${email}`,
        `Asunto:  ${subject}`,
        '',
        'Mensaje:',
        message,
        '',
        `Recibido el ${receivedAt}`,
    ].join('\n');
}