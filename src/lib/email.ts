// Plantillas del correo que recibe el dueño del portafolio (HTML + texto plano).

export function getInitials(name: string): string {
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

export interface EmailData {
    name: string;
    email: string;
    subject: string;
    message: string;
    receivedAt: string;
    initials: string;
}

export function buildEmailHtml({ name, email, subject, message, receivedAt, initials }: EmailData): string {
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeSubject = escapeHtml(subject);
    const safeMessage = escapeHtml(message);

    return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Nuevo mensaje desde tu portafolio</title>
  <style>
    body, table, td, p, a, li, blockquote {
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    }
    table, td {
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
    }
    img {
      -ms-interpolation-mode: bicubic;
      border: 0;
      outline: none;
      text-decoration: none;
    }
    @media screen and (max-width: 600px) {
      .mobile-padding { padding: 20px 16px !important; }
      .mobile-header { padding: 24px 16px !important; }
      .mobile-text { font-size: 15px !important; }
      .mobile-hide { display: none !important; }
      .mobile-stack { display: block !important; width: 100% !important; }
      .mobile-center { text-align: center !important; }
      .mobile-btn { display: block !important; width: 100% !important; text-align: center !important; box-sizing: border-box !important; }
    }
  </style>
</head>
<body style="margin:0; padding:0; background-color:#f4f4f5; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f5;">
    <tr>
      <td align="center" style="padding:24px 8px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:820px; width:100%; background-color:#ffffff; border-radius:16px; overflow:hidden; box-shadow:0 1px 3px rgba(0,0,0,0.06);">
          <tr>
            <td class="mobile-header" style="background:linear-gradient(135deg,#18181b 0%,#3f3f46 100%); padding:48px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <p style="margin:0; color:#a1a1aa; font-size:12px; font-weight:600; text-transform:uppercase; letter-spacing:0.08em;">Nuevo mensaje</p>
                    <p style="margin:6px 0 0 0; color:#ffffff; font-size:20px; font-weight:700;">Desde tu portafolio</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td class="mobile-padding" style="padding:28px 32px 0 32px;">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td class="mobile-stack" style="width:48px;">
                    <table role="presentation" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="width:48px; height:48px; background-color:#18181b; border-radius:50%; text-align:center; vertical-align:middle;">
                          <span style="color:#ffffff; font-size:16px; font-weight:700; line-height:48px;">${initials}</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                  <td class="mobile-stack" style="padding-left:14px; padding-top:8px;">
                    <p style="margin:0; color:#18181b; font-size:16px; font-weight:600;">${safeName}</p>
                    <a href="mailto:${safeEmail}" style="color:#71717a; font-size:14px; text-decoration:none;">${safeEmail}</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td class="mobile-padding" style="padding:24px 32px 0 32px;">
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background-color:#f4f4f5; border-radius:999px; padding:6px 14px;">
                    <span style="color:#3f3f46; font-size:13px; font-weight:500;">${safeSubject}</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td class="mobile-padding" style="padding:20px 32px 8px 32px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-left:3px solid #e4e4e7;">
                <tr>
                  <td style="padding:4px 0 4px 18px;">
                    <p class="mobile-text" style="margin:0; color:#27272a; font-size:15px; line-height:1.65; white-space:pre-wrap; word-break:break-word;">${safeMessage}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td class="mobile-padding" style="padding:28px 32px 32px 32px;">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td>
                    <a class="mobile-btn" href="mailto:${safeEmail}?subject=${encodeURIComponent('Re: ' + subject)}" style="display:inline-block; background-color:#18181b; color:#ffffff; text-decoration:none; padding:12px 24px; border-radius:10px; font-size:14px; font-weight:600;">Responder a ${safeName} →</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td class="mobile-padding" style="padding:18px 32px; background-color:#fafafa; border-top:1px solid #f0f0f1;">
              <p style="margin:0; color:#a1a1aa; font-size:12px;">Recibido el ${receivedAt}</p>
              <p style="margin:4px 0 0 0; color:#d4d4d8; font-size:11px;">Enviado desde el formulario de contacto de tu portafolio</p>
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

export function buildEmailText({ name, email, subject, message, receivedAt }: Omit<EmailData, 'initials'>): string {
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