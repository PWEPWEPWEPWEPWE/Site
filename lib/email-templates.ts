export const getOTPEmailTemplate = (code: string) => {
  const html = `
    <!DOCTYPE html>
    <html lang="tr">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Yönetim Paneli Doğrulama Kodu</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #07070b; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #ffffff;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #07070b;">
        <tr>
          <td align="center" style="padding: 40px 20px;">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #11111a; border-radius: 24px; border: 1px solid rgba(139, 92, 246, 0.3); overflow: hidden; max-width: 500px; box-shadow: 0 20px 40px rgba(0,0,0,0.8);">
              <!-- Accent Top Bar -->
              <tr>
                <td style="height: 4px; background: linear-gradient(90deg, #8b5cf6, #6366f1);"></td>
              </tr>
              <tr>
                <td style="padding: 40px; text-align: center;">
                  <!-- Logo & Branding -->
                  <div style="margin-bottom: 24px;">
                    <div style="display: inline-block; background: linear-gradient(135deg, rgba(139,92,246,0.2), rgba(99,102,241,0.1)); border: 1px solid rgba(139,92,246,0.3); border-radius: 14px; padding: 12px 24px;">
                      <span style="font-size: 20px; font-weight: 900; letter-spacing: -0.025em; color: #ffffff; text-transform: uppercase;">AURAX <span style="color: #8b5cf6;">STUDIO</span></span>
                    </div>
                  </div>

                  <h1 style="font-size: 22px; font-weight: 800; margin: 0 0 12px 0; letter-spacing: -0.025em; color: #ffffff;">Yönetim Paneli Doğrulama</h1>
                  <p style="font-size: 15px; line-height: 24px; color: #94a3b8; margin: 0 0 32px 0;">
                    Yönetim paneline güvenli erişim sağlamak için talep ettiğiniz 6 haneli onay kodunuz aşağıdadır. Bu kod <strong style="color: #ffffff;">5 dakika</strong> süreyle geçerlidir.
                  </p>
                  
                  <!-- OTP Code Box -->
                  <div style="background-color: rgba(139, 92, 246, 0.08); border: 2px dashed rgba(139, 92, 246, 0.4); border-radius: 16px; padding: 24px; margin-bottom: 32px;">
                    <span style="font-family: 'Courier New', Courier, monospace; font-size: 40px; font-weight: 800; letter-spacing: 0.25em; color: #a855f7; display: block; text-align: center; text-shadow: 0 0 20px rgba(168,85,247,0.3);">${code}</span>
                  </div>
                  
                  <p style="font-size: 13px; line-height: 20px; color: #64748b; margin: 0;">
                    Eğer bu oturum açma girişimini siz başlatmadıysanız, lütfen bu e-postayı dikkate almayın ve güvenlik ekibimizi bilgilendirin.
                  </p>
                </td>
              </tr>
              <tr>
                <td style="padding: 20px 40px; background-color: rgba(0, 0, 0, 0.3); border-top: 1px solid rgba(255, 255, 255, 0.05); text-align: center;">
                  <p style="font-size: 12px; color: #475569; margin: 0;">
                    © 2026 AuraX Studio. Tüm hakları saklıdır. Güvenli Edge Altyapısı.
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  const text = `AuraX Studio Yönetim Paneli Doğrulama Kodunuz: ${code}\n\nBu kod 5 dakika boyunca geçerlidir. Eğer bu işlemi siz yapmadıysanız lütfen dikkate almayın.`;

  return { html, text };
};

export const getOrderNotificationTemplate = (order: any) => {
  const items = typeof order.items === 'string' ? JSON.parse(order.items || '[]') : (order.items || []);
  const customer = typeof order.customer_info === 'string' ? JSON.parse(order.customer_info || '{}') : (order.customer_info || {});
  
  const customerName = customer.fullName || customer.name || 'Bilinmeyen Müşteri';
  const customerContact = customer.contact || customer.email || customer.phone || '-';
  const customerNotes = customer.notes || '-';

  const itemsHtml = items.map((item: any) => `
    <tr>
      <td style="padding: 14px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.06); color: #ffffff; font-size: 14px; font-weight: 600;">
        ${item.title || item.name || 'Ürün / Hizmet'}
      </td>
      <td style="padding: 14px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.06); color: #a855f7; font-size: 15px; font-weight: 700; text-align: right;">
        ${item.price || 0} ₺
      </td>
    </tr>
  `).join('');

  const html = `
    <!DOCTYPE html>
    <html lang="tr">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Yeni Sipariş Bildirimi</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #07070b; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #ffffff;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #07070b;">
        <tr>
          <td align="center" style="padding: 40px 20px;">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #11111a; border-radius: 24px; border: 1px solid rgba(139, 92, 246, 0.3); overflow: hidden; max-width: 600px; box-shadow: 0 20px 40px rgba(0,0,0,0.8);">
              <!-- Accent Top Bar -->
              <tr>
                <td style="height: 4px; background: linear-gradient(90deg, #8b5cf6, #6366f1);"></td>
              </tr>
              <tr>
                <td style="padding: 40px;">
                  <!-- Logo & Header -->
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                    <tr>
                      <td>
                        <div style="display: inline-block; background: linear-gradient(135deg, rgba(139,92,246,0.2), rgba(99,102,241,0.1)); border: 1px solid rgba(139,92,246,0.3); border-radius: 12px; padding: 8px 16px;">
                          <span style="font-size: 16px; font-weight: 900; letter-spacing: -0.025em; color: #ffffff; text-transform: uppercase;">AURAX <span style="color: #8b5cf6;">STUDIO</span></span>
                        </div>
                      </td>
                      <td align="right">
                        <span style="background-color: rgba(168, 85, 247, 0.15); color: #a855f7; border: 1px solid rgba(168, 85, 247, 0.3); padding: 6px 12px; border-radius: 20px; font-size: 12px; font-weight: 700;">Yeni Sipariş</span>
                      </td>
                    </tr>
                  </table>

                  <h1 style="font-size: 24px; font-weight: 800; margin: 24px 0 8px 0; letter-spacing: -0.025em; color: #ffffff;">Yeni Bir Sipariş Oluşturuldu!</h1>
                  <p style="font-size: 14px; color: #94a3b8; margin: 0 0 28px 0;">Müşteri sepeti onayladı ve yeni bir hizmet talebi iletti.</p>

                  <!-- Customer Info Card -->
                  <div style="background-color: rgba(255, 255, 255, 0.03); border-radius: 16px; padding: 20px; margin-bottom: 24px; border: 1px solid rgba(255, 255, 255, 0.05);">
                    <h2 style="font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #8b5cf6; margin: 0 0 12px 0;">Müşteri Bilgileri</h2>
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td style="padding: 4px 0; color: #64748b; font-size: 14px; width: 100px;">Ad Soyad:</td>
                        <td style="padding: 4px 0; color: #ffffff; font-size: 14px; font-weight: 600;">${customerName}</td>
                      </tr>
                      <tr>
                        <td style="padding: 4px 0; color: #64748b; font-size: 14px;">İletişim:</td>
                        <td style="padding: 4px 0; color: #ffffff; font-size: 14px; font-weight: 600;">${customerContact}</td>
                      </tr>
                      <tr>
                        <td style="padding: 4px 0; color: #64748b; font-size: 14px; vertical-align: top;">Notlar:</td>
                        <td style="padding: 4px 0; color: #e2e8f0; font-size: 14px;">${customerNotes}</td>
                      </tr>
                    </table>
                  </div>

                  <!-- Items Table -->
                  <div style="background-color: rgba(255, 255, 255, 0.03); border-radius: 16px; padding: 20px; margin-bottom: 32px; border: 1px solid rgba(255, 255, 255, 0.05);">
                    <h2 style="font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #8b5cf6; margin: 0 0 12px 0;">Sipariş Kalemleri</h2>
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                      ${itemsHtml}
                      <tr>
                        <td style="padding: 16px 0 0 0; color: #94a3b8; font-size: 15px; font-weight: 700;">Toplam Tutar:</td>
                        <td style="padding: 16px 0 0 0; color: #ffffff; font-size: 22px; font-weight: 900; text-align: right;">${order.total || 0} ₺</td>
                      </tr>
                    </table>
                  </div>

                  <!-- Action Button -->
                  <div style="text-align: center;">
                    <a href="https://auraxstudio.com.tr/admin" style="background: linear-gradient(135deg, #8b5cf6, #6366f1); color: #ffffff; padding: 14px 32px; border-radius: 12px; font-weight: 700; text-decoration: none; display: inline-block; box-shadow: 0 10px 20px rgba(139,92,246,0.3);">Yönetim Paneline Git</a>
                  </div>
                </td>
              </tr>
              <tr>
                <td style="padding: 20px 40px; background-color: rgba(0, 0, 0, 0.3); border-top: 1px solid rgba(255, 255, 255, 0.05); text-align: center;">
                  <p style="font-size: 12px; color: #475569; margin: 0;">
                    © 2026 AuraX Studio. Otomatik Sipariş Bildirim Sistemi.
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  const text = `Yeni Sipariş Bildirimi\n\nMüşteri: ${customerName}\nİletişim: ${customerContact}\nNot: ${customerNotes}\nToplam Tutar: ${order.total || 0} ₺\n\nPaneli ziyaret edin: https://auraxstudio.com.tr/admin`;

  return { html, text };
};
