export const getOTPEmailTemplate = (code: string) => {
  const html = `
    <!DOCTYPE html>
    <html lang="tr">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Doğrulama Kodu</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #09090b; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #ffffff;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #09090b;">
        <tr>
          <td align="center" style="padding: 40px 20px;">
            <table role="presentation" width="100%" max-width="500" cellspacing="0" cellpadding="0" border="0" style="background-color: #13131f; border-radius: 24px; border: 1px solid rgba(139, 92, 246, 0.2); overflow: hidden; max-width: 500px;">
              <tr>
                <td style="padding: 40px; text-align: center;">
                  <div style="margin-bottom: 24px;">
                    <img src="https://auraxstudio.com.tr/Aurax_20261109_044639_0000.svg" alt="AuraX Logo" width="60" style="display: inline-block;">
                  </div>
                  <h1 style="font-size: 24px; font-weight: 800; margin: 0 0 16px 0; letter-spacing: -0.025em; color: #ffffff;">Doğrulama Kodu</h1>
                  <p style="font-size: 15px; line-height: 24px; color: #94a3b8; margin: 0 0 32px 0;">
                    Yönetim paneline giriş yapmak için aşağıdaki 6 haneli güvenlik kodunu kullanın. Bu kod 5 dakika boyunca geçerlidir.
                  </p>
                  
                  <div style="background-color: rgba(139, 92, 246, 0.1); border: 2px dashed rgba(139, 92, 246, 0.5); border-radius: 16px; padding: 24px; margin-bottom: 32px;">
                    <span style="font-family: 'Courier New', Courier, monospace; font-size: 36px; font-weight: 800; letter-spacing: 0.2em; color: #8b5cf6; display: block; text-align: center;">${code}</span>
                  </div>
                  
                  <p style="font-size: 13px; line-height: 20px; color: #64748b; margin: 0;">
                    Eğer bu girişi siz yapmadıysanız, lütfen bu e-postayı dikkate almayın ve hesabınızın güvenliğini gözden geçirin.
                  </p>
                </td>
              </tr>
              <tr>
                <td style="padding: 20px 40px; background-color: rgba(255, 255, 255, 0.02); border-top: 1px solid rgba(255, 255, 255, 0.05); text-align: center;">
                  <p style="font-size: 12px; color: #475569; margin: 0;">
                    © 2026 AuraX Studio. Tüm hakları saklıdır.
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

  const text = `AuraX Studio Yönetim Paneli Doğrulama Kodunuz: ${code}\n\nBu kod 5 dakika boyunca geçerlidir. Eğer bu girişi siz yapmadıysanız lütfen dikkate almayın.`;

  return { html, text };
};

export const getOrderNotificationTemplate = (order: any) => {
  const items = typeof order.items === 'string' ? JSON.parse(order.items || '[]') : (order.items || []);
  const customer = typeof order.customer_info === 'string' ? JSON.parse(order.customer_info || '{}') : (order.customer_info || {});
  
  const customerName = customer.fullName || customer.name || 'Bilinmeyen Müşteri';
  const customerContact = customer.contact || customer.email || customer.phone || '-';
  const customerNotes = customer.notes || '-';

  const itemsHtml = items.map((item: any) => `
    <div style="padding: 12px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.05);">
      <div style="display: flex; justify-content: space-between;">
        <span style="color: #ffffff; font-weight: 600;">${item.title || item.name || 'Ürün'}</span>
        <span style="color: #8b5cf6; font-weight: 700;">${item.price || 0} ₺</span>
      </div>
    </div>
  `).join('');

  const html = `
    <!DOCTYPE html>
    <html lang="tr">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Yeni Sipariş Bildirimi</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #09090b; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #ffffff;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #09090b;">
        <tr>
          <td align="center" style="padding: 40px 20px;">
            <table role="presentation" width="100%" max-width="600" cellspacing="0" cellpadding="0" border="0" style="background-color: #13131f; border-radius: 24px; border: 1px solid rgba(139, 92, 246, 0.2); overflow: hidden; max-width: 600px;">
              <tr>
                <td style="padding: 40px;">
                  <div style="text-align: center; margin-bottom: 32px;">
                    <img src="https://auraxstudio.com.tr/Aurax_20261109_044639_0000.svg" alt="AuraX Logo" width="60" style="display: inline-block;">
                    <h1 style="font-size: 24px; font-weight: 800; margin: 16px 0 0 0; letter-spacing: -0.025em; color: #ffffff;">Yeni Sipariş Geldi!</h1>
                  </div>

                  <div style="background-color: rgba(255, 255, 255, 0.03); border-radius: 16px; padding: 24px; margin-bottom: 24px;">
                    <h2 style="font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #8b5cf6; margin: 0 0 16px 0;">Müşteri Bilgileri</h2>
                    <p style="margin: 0 0 8px 0; font-size: 15px;"><span style="color: #64748b;">Ad Soyad:</span> <span style="color: #ffffff; font-weight: 600;">${customerName}</span></p>
                    <p style="margin: 0 0 8px 0; font-size: 15px;"><span style="color: #64748b;">İletişim:</span> <span style="color: #ffffff; font-weight: 600;">${customerContact}</span></p>
                    <p style="margin: 0; font-size: 15px;"><span style="color: #64748b;">Not:</span> <span style="color: #ffffff;">${customerNotes}</span></p>
                  </div>

                  <div style="background-color: rgba(255, 255, 255, 0.03); border-radius: 16px; padding: 24px; margin-bottom: 32px;">
                    <h2 style="font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #8b5cf6; margin: 0 0 16px 0;">Sipariş Detayları</h2>
                    ${itemsHtml}
                    <div style="margin-top: 16px; text-align: right;">
                      <span style="color: #64748b; font-size: 14px;">Toplam Tutar:</span>
                      <span style="color: #ffffff; font-size: 20px; font-weight: 800; margin-left: 8px;">${order.total || 0} ₺</span>
                    </div>
                  </div>

                  <div style="text-align: center;">
                    <a href="https://auraxstudio.com.tr/admin" style="background-color: #8b5cf6; color: #ffffff; padding: 14px 32px; border-radius: 12px; font-weight: 700; text-decoration: none; display: inline-block; transition: background-color 0.2s;">Paneli Görüntüle</a>
                  </div>
                </td>
              </tr>
              <tr>
                <td style="padding: 20px 40px; background-color: rgba(255, 255, 255, 0.02); border-top: 1px solid rgba(255, 255, 255, 0.05); text-align: center;">
                  <p style="font-size: 12px; color: #475569; margin: 0;">
                    Bu bildirim otomatik olarak gönderilmiştir.
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

  const text = `Yeni Sipariş Bildirimi\n\nMüşteri: ${customerName}\nİletişim: ${customerContact}\nToplam: ${order.total || 0} ₺\n\nPaneli ziyaret ederek detayları görebilirsiniz: https://auraxstudio.com.tr/admin`;

  return { html, text };
};
