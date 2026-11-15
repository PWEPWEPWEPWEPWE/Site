import { getRequestContext } from '@cloudflare/next-on-pages';

interface EmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  from?: string;
}

export async function sendEmail({
  to,
  subject,
  html,
  from = 'AuraX Studio <noreply@auraxstudio.com.tr>',
}: EmailOptions) {
  try {
    const env = (getRequestContext() as any)?.env || process.env;
    const apiKey = env.RESEND_API_KEY;

    if (!apiKey) {
      console.warn("RESEND_API_KEY is not configured. Email notification skipped.");
      return { success: false, error: "RESEND_API_KEY not found" };
    }

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: Array.isArray(to) ? to : [to],
        subject,
        html,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      console.error("Resend API error response:", data);
      return { success: false, error: data };
    }

    return { success: true, data };
  } catch (err: any) {
    console.error("Resend email dispatch error:", err);
    return { success: false, error: err.message };
  }
}
