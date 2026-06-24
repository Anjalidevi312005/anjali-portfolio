// Email notifications for new contact-form messages.
//
// Uses Resend's HTTP API (port 443) which works on Render's free tier —
// unlike Gmail SMTP, whose ports Render blocks. Optional: if RESEND_API_KEY
// isn't set, the app still runs and just skips sending.
//
// Env:
//   RESEND_API_KEY  – from resend.com (required to enable)
//   NOTIFY_TO       – where alerts go (defaults to your email below)
//   RESEND_FROM     – verified sender; defaults to Resend's shared onboarding address

const { RESEND_API_KEY, NOTIFY_TO, RESEND_FROM } = process.env;

const TO = NOTIFY_TO || 'anjalidevi312005@gmail.com';
// 'onboarding@resend.dev' works without verifying a domain, but can only
// deliver to the Resend account owner's email — perfect for a personal alert.
const FROM = RESEND_FROM || 'Portfolio <onboarding@resend.dev>';

if (RESEND_API_KEY) {
  console.log('✓ Email notifications enabled (Resend)');
} else {
  console.log('ℹ Email notifications disabled (set RESEND_API_KEY to enable)');
}

export const emailEnabled = () => Boolean(RESEND_API_KEY);

// Sends a notification to the owner when a visitor submits the contact form.
export async function sendContactNotification({ name, email, subject, message }) {
  if (!RESEND_API_KEY) return;

  const safeSubject = subject?.trim() || '(no subject)';

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: FROM,
      to: TO,
      reply_to: email, // hitting "Reply" emails the visitor directly
      subject: `📬 New portfolio message from ${name}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:560px;margin:auto;border:1px solid #eee;border-radius:12px;overflow:hidden">
          <div style="background:#4f46e5;color:#fff;padding:18px 24px;font-size:18px;font-weight:700">
            📬 New Portfolio Message
          </div>
          <div style="padding:24px;color:#222;line-height:1.6">
            <p style="margin:0 0 12px"><strong>Name:</strong> ${name}</p>
            <p style="margin:0 0 12px"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p style="margin:0 0 12px"><strong>Subject:</strong> ${safeSubject}</p>
            <p style="margin:16px 0 6px"><strong>Message:</strong></p>
            <div style="background:#f6f6f9;border-radius:8px;padding:14px;white-space:pre-wrap">${message}</div>
            <p style="margin:20px 0 0;font-size:13px;color:#888">Reply to this email to respond directly to ${name}.</p>
          </div>
        </div>`
    })
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    throw new Error(`Resend ${res.status}: ${detail}`);
  }
}
